import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import BookingWidget from "@/components/BookingWidget";
import { DEMO_BOOKING_PAYLOAD } from "@/lib/booking";

function clickContinue() {
  fireEvent.click(screen.getByTestId("booking-continue"));
}

describe("BookingWidget demo booking flow", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("walks through steps with demo text and submits a successful booking", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "ui-demo-id", message: "Booking created" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      })
    );
    globalThis.fetch = fetchMock as typeof fetch;

    render(<BookingWidget />);

    expect(screen.getByRole("heading", { name: /book your cleaning/i })).toBeInTheDocument();
    expect(screen.getByText("$140")).toBeInTheDocument();

    clickContinue();
    fireEvent.click(screen.getByRole("button", { name: /inside fridge/i }));
    expect(screen.getByText("$165")).toBeInTheDocument();
    clickContinue();

    fireEvent.change(screen.getByLabelText(/preferred date/i), { target: { value: "2026-07-20" } });
    fireEvent.change(screen.getByLabelText(/preferred time/i), { target: { value: "10:00" } });
    clickContinue();

    fireEvent.change(screen.getByPlaceholderText("Jane Smith"), {
      target: { value: DEMO_BOOKING_PAYLOAD.customer_name },
    });
    fireEvent.change(screen.getByPlaceholderText("you@email.com"), {
      target: { value: DEMO_BOOKING_PAYLOAD.email },
    });
    // Phone input formats as the user types; feed raw digits like the browser test.
    fireEvent.change(screen.getByPlaceholderText("(863) 555-0123"), {
      target: { value: "8635550199" },
    });
    fireEvent.change(screen.getByPlaceholderText("123 Lake Howard Dr, Winter Haven, FL"), {
      target: { value: DEMO_BOOKING_PAYLOAD.address },
    });

    expect(screen.getByPlaceholderText("Jane Smith")).toHaveValue(DEMO_BOOKING_PAYLOAD.customer_name);
    expect(screen.getByPlaceholderText("you@email.com")).toHaveValue(DEMO_BOOKING_PAYLOAD.email);
    expect(screen.getByPlaceholderText("(863) 555-0123")).toHaveValue("(863) 555-0199");
    expect(screen.getByPlaceholderText("123 Lake Howard Dr, Winter Haven, FL")).toHaveValue(
      DEMO_BOOKING_PAYLOAD.address
    );

    clickContinue();

    expect(screen.queryByText(/please enter your full name/i)).not.toBeInTheDocument();
    expect(screen.getByText(/estimated total/i)).toBeInTheDocument();
    expect(screen.getByText(DEMO_BOOKING_PAYLOAD.customer_name)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByTestId("booking-submit"));
    });

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /booking request sent/i })).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("/api/book");
    const body = JSON.parse(String(init?.body));
    expect(body.customer_name).toBe(DEMO_BOOKING_PAYLOAD.customer_name);
    expect(body.email).toBe(DEMO_BOOKING_PAYLOAD.email);
    expect(body.phone).toBe("(863) 555-0199");
    expect(body.address).toBe(DEMO_BOOKING_PAYLOAD.address);
    expect(body.service_type).toContain("Residential");
    expect(body.preferred_date).toBe("2026-07-20");
    expect(body.notes).toMatch(/Inside fridge/);
  });

  it("blocks continue on contact step when required fields are empty", () => {
    render(<BookingWidget />);

    clickContinue();
    clickContinue();
    clickContinue();
    clickContinue();

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone is required/i)).toBeInTheDocument();
    expect(screen.getByText(/service address is required/i)).toBeInTheDocument();
  });
});
