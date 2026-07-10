import { describe, expect, it } from "vitest";
import {
  DEMO_BOOKING_PAYLOAD,
  normalizeBookingPayload,
  validateBookingPayload,
} from "@/lib/booking";
import { computeQuote } from "@/lib/pricing";

describe("validateBookingPayload", () => {
  it("accepts the demo booking payload", () => {
    expect(validateBookingPayload(DEMO_BOOKING_PAYLOAD)).toEqual({});
  });

  it("requires name, email, phone, address, and service type", () => {
    const errors = validateBookingPayload({});
    expect(errors.customer_name).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.phone).toBeTruthy();
    expect(errors.address).toBeTruthy();
    expect(errors.service_type).toBeTruthy();
  });

  it("rejects invalid email and short phone numbers", () => {
    const errors = validateBookingPayload({
      customer_name: "Demo Tester",
      email: "not-an-email",
      phone: "555",
      address: "123 Lake Howard Dr",
      service_type: "Residential — Standard (2 Bedroom)",
    });
    expect(errors.email).toMatch(/valid email/i);
    expect(errors.phone).toMatch(/10-digit/i);
  });
});

describe("normalizeBookingPayload", () => {
  it("trims fields and drops empty optional values", () => {
    const normalized = normalizeBookingPayload({
      customer_name: "  Demo Tester  ",
      email: " demo@example.com ",
      phone: " (863) 555-0199 ",
      address: " 123 Main St ",
      service_type: " Residential ",
      preferred_date: "  ",
      preferred_time: "10:00",
      notes: "",
    });
    expect(normalized.customer_name).toBe("Demo Tester");
    expect(normalized.preferred_date).toBeUndefined();
    expect(normalized.preferred_time).toBe("10:00");
    expect(normalized.notes).toBeUndefined();
  });
});

describe("demo booking quote", () => {
  it("matches the residential 2-bed standard + fridge estimate used in UI tests", () => {
    const base = computeQuote({
      serviceType: "residential",
      sizeKey: "2bed",
      level: "standard",
      addOns: {},
    });
    expect(base.price).toBe(140);

    const quote = computeQuote({
      serviceType: "residential",
      sizeKey: "2bed",
      level: "standard",
      addOns: { fridge: true },
    });
    expect(quote.price).toBe(165);
    expect(quote.range.low).toBe(149);
    expect(quote.range.high).toBe(182);
  });
});
