import { NextResponse } from "next/server";
import { captureFailedBookingForward } from "@/lib/booking-outbox";

export async function POST(request: Request) {
  const bookingBroomUrl = (process.env.BOOKING_BROOM_URL || "https://app.bookingbroom.com").replace(/\/$/, "");
  const apiKey = process.env.BOOKING_BROOM_API_KEY;

  let form: Record<string, unknown>;
  try {
    form = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!form.customer_name || typeof form.customer_name !== "string") {
    return NextResponse.json(
      { error: "customer_name is required" },
      { status: 400 }
    );
  }

  const idempotencyKey =
    typeof form.idempotency_key === "string" && form.idempotency_key.trim()
      ? form.idempotency_key.trim()
      : `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const wirePayload: Record<string, unknown> = {
    customer_name: form.customer_name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    service_type: form.service_type,
    preferred_date: form.preferred_date,
    preferred_time: form.preferred_time,
    notes: form.notes,
    intent:
      form.intent === "quote" || form.intent === "book" ? form.intent : undefined,
    property: form.property,
    quote: form.quote,
    idempotency_key: idempotencyKey,
    session_key:
      typeof form.session_key === "string" && form.session_key.trim()
        ? form.session_key.trim()
        : undefined,
  };

  async function softFallback(lastError: string) {
    const captured = await captureFailedBookingForward({
      payload: wirePayload,
      idempotencyKey,
      lastError,
    });
    if (captured.captured) {
      return NextResponse.json(
        { ok: true, degraded: true, fallback: captured.via },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { error: captured.error || lastError },
      { status: 502 },
    );
  }

  if (!bookingBroomUrl || !apiKey) {
    return softFallback("Booking service is not configured");
  }

  let res: Response;
  try {
    res = await fetch(`${bookingBroomUrl}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        site_slug: "winter-haven",
        api_key: apiKey,
        ...wirePayload,
      }),
    });
  } catch {
    return softFallback("Unable to reach booking service");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return softFallback(
      typeof data.error === "string" ? data.error : "Booking failed",
    );
  }

  return NextResponse.json(data, { status: 201 });
}
