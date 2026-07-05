import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  const form = await request.json();

  const res = await fetch(`${process.env.BOOKING_BROOM_URL}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      site_slug: site.bookingSlug,
      api_key: process.env.BOOKING_BROOM_API_KEY,
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

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.error ?? "Booking failed" }, { status: res.status });
  }

  return NextResponse.json(data, { status: 201 });
}
