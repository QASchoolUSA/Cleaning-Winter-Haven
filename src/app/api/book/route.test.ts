import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/book/route";
import { DEMO_BOOKING_PAYLOAD } from "@/lib/booking";

function jsonRequest(body: unknown) {
  return new Request("http://localhost/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/book", () => {
  const originalFetch = globalThis.fetch;
  const env = process.env as Record<string, string | undefined>;

  beforeEach(() => {
    env.BOOKING_BROOM_URL = "https://bookings.example.test";
    env.BOOKING_BROOM_API_KEY = "test-api-key";
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
    delete env.BOOKING_BROOM_URL;
    delete env.BOOKING_BROOM_API_KEY;
  });

  it("rejects incomplete demo payloads with field errors", async () => {
    const res = await POST(jsonRequest({ customer_name: "Demo" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.fieldErrors.email).toBeTruthy();
    expect(data.fieldErrors.phone).toBeTruthy();
    expect(data.fieldErrors.address).toBeTruthy();
  });

  it("returns 503 when booking credentials are missing", async () => {
    delete env.BOOKING_BROOM_API_KEY;
    const res = await POST(jsonRequest(DEMO_BOOKING_PAYLOAD));
    expect(res.status).toBe(503);
  });

  it("forwards a valid demo booking to Booking Broom and returns 201", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "demo-booking-id", message: "Booking created" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      })
    );
    globalThis.fetch = fetchMock as typeof fetch;

    const res = await POST(jsonRequest(DEMO_BOOKING_PAYLOAD));
    expect(res.status).toBe(201);
    await expect(res.json()).resolves.toEqual({
      id: "demo-booking-id",
      message: "Booking created",
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://bookings.example.test/api/bookings");
    expect(init?.method).toBe("POST");
    const sent = JSON.parse(String(init?.body));
    expect(sent.site_slug).toBe("winter-haven");
    expect(sent.api_key).toBe("test-api-key");
    expect(sent.customer_name).toBe(DEMO_BOOKING_PAYLOAD.customer_name);
    expect(sent.email).toBe(DEMO_BOOKING_PAYLOAD.email);
    expect(sent.phone).toBe(DEMO_BOOKING_PAYLOAD.phone);
    expect(sent.address).toBe(DEMO_BOOKING_PAYLOAD.address);
    expect(sent.service_type).toBe(DEMO_BOOKING_PAYLOAD.service_type);
    expect(sent.notes).toContain("DEMO/TEST");
  });

  it("surfaces upstream booking failures", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    ) as typeof fetch;

    const res = await POST(jsonRequest(DEMO_BOOKING_PAYLOAD));
    expect(res.status).toBe(401);
    await expect(res.json()).resolves.toEqual({ error: "Invalid API key" });
  });
});
