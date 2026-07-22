import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { normalizeBookingPayload, validateBookingPayload } from "@/lib/booking";
import { site } from "@/lib/site";

function readEnv(name: string): string | undefined {
  const fromProcess = process.env[name];
  if (fromProcess) return fromProcess;

  try {
    const { env } = getCloudflareContext();
    const fromWorker = env[name as keyof typeof env];
    if (typeof fromWorker === "string") return fromWorker;
  } catch {
    // Not running inside the Cloudflare worker (e.g. next dev).
  }

  return undefined;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid booking payload" }, { status: 400 });
  }

  const form = normalizeBookingPayload(body as Record<string, string>);
  const fieldErrors = validateBookingPayload(form);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields and try again.", fieldErrors },
      { status: 400 }
    );
  }

  const bookingUrl = readEnv("BOOKING_BROOM_URL");
  const apiKey = readEnv("BOOKING_BROOM_API_KEY");
  if (!bookingUrl || !apiKey) {
    return NextResponse.json(
      { error: "Booking is temporarily unavailable. Please call us or try again later." },
      { status: 503 }
    );
  }

  let res: Response;
  try {
    res = await fetch(`${bookingUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site_slug: site.bookingSlug,
        api_key: apiKey,
        customer_name: form.customer_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        service_type: form.service_type,
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        notes: form.notes,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the booking service. Please try again or call us." },
      { status: 502 }
    );
  }

  let data: { error?: string; id?: string; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    return NextResponse.json({ error: data.error ?? "Booking failed" }, { status: res.status });
  }

  return NextResponse.json(data, { status: 201 });
}
