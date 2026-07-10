import { phoneDigits } from "./phone";

export type BookingPayload = {
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string;
  preferred_date?: string;
  preferred_time?: string;
  notes?: string;
};

export type BookingFieldErrors = Partial<
  Record<"customer_name" | "email" | "phone" | "address" | "service_type", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate booking contact + service fields used by the widget and API. */
export function validateBookingPayload(input: Partial<BookingPayload>): BookingFieldErrors {
  const errors: BookingFieldErrors = {};
  const name = input.customer_name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const address = input.address?.trim() ?? "";
  const serviceType = input.service_type?.trim() ?? "";

  if (!name) errors.customer_name = "Please enter your full name.";
  if (!email) {
    errors.email = "Email is required so we can send your quote and confirmation.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!phone) {
    errors.phone = "Phone is required so we can confirm your appointment.";
  } else if (phoneDigits(phone).replace(/^1/, "").length < 10) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (!address) errors.address = "Service address is required so our team knows where to go.";
  if (!serviceType) errors.service_type = "Please select a service type.";

  return errors;
}

export function normalizeBookingPayload(input: Partial<BookingPayload>): BookingPayload {
  return {
    customer_name: input.customer_name?.trim() ?? "",
    email: input.email?.trim() ?? "",
    phone: input.phone?.trim() ?? "",
    address: input.address?.trim() ?? "",
    service_type: input.service_type?.trim() ?? "",
    preferred_date: input.preferred_date?.trim() || undefined,
    preferred_time: input.preferred_time?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
  };
}

/** Demo payload used by automated booking smoke tests. */
export const DEMO_BOOKING_PAYLOAD: BookingPayload = {
  customer_name: "Demo Tester Automation",
  email: "demo.booking.test@example.com",
  phone: "(863) 555-0199",
  address: "123 Lake Howard Dr, Winter Haven, FL 33880",
  service_type: "Residential — Standard (2 Bedroom)",
  preferred_date: "2026-07-20",
  preferred_time: "10:00",
  notes: [
    "Size: 2 Bedroom",
    "Level: Standard",
    "Add-ons: Inside fridge",
    "Estimated price: $165 (range $149–$182)",
    "Payment: Due after cleaning is complete",
    "DEMO/TEST booking — please ignore",
  ].join("\n"),
};
