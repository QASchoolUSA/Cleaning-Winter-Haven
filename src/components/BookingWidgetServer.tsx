import BookingWidget from "@/components/BookingWidget";
import { getPricingConfig } from "@/lib/pricing-config";

/**
 * Renders the booking widget with live prices already resolved, so the quote in
 * the server-rendered HTML is the real one and never changes under the customer.
 * Pages should import this rather than `BookingWidget` directly.
 */
export default async function BookingWidgetServer() {
  const config = await getPricingConfig();
  return <BookingWidget config={config} />;
}
