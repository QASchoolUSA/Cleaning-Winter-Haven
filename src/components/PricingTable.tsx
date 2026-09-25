import Link from "next/link";
import {
  DEFAULT_PRICING_CONFIG,
  SERVICE_LABELS,
  addOnPrices,
  frequencyDiscountLabels,
  minimumBase,
  type PricingConfig,
  type ServiceTypeId,
} from "@/lib/pricing";

type PricingTableProps = {
  compact?: boolean;
  config?: PricingConfig;
};

const TABLE_ORDER: ServiceTypeId[] = [
  "house",
  "apartment",
  "maintenance",
  "deep",
  "move",
  "airbnb",
  "post-construction",
];

export default function PricingTable({
  compact = false,
  config = DEFAULT_PRICING_CONFIG,
}: PricingTableProps) {
  const floors = minimumBase(config);
  const addOns = addOnPrices(config);
  const freqDiscounts = frequencyDiscountLabels(config);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Starting rates by service</h3>
        <p className="mt-1 text-sm text-slate-600">
          Floors before bedrooms, bathrooms, and square footage. Live quotes use size × rate with a
          minimum base.
        </p>
        <div
          className={`mt-4 grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}
        >
          {TABLE_ORDER.map((key) => (
            <div key={key} className="card-accent p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {SERVICE_LABELS[key]}
              </p>
              <p className="mt-1 text-2xl font-bold text-[#00a8bc]">from ${floors[key]}</p>
            </div>
          ))}
        </div>
      </div>

      {!compact && (
        <>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900">Bedrooms, baths &amp; frequency</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>
                  <strong>Bedrooms:</strong> +${config.bedroomRate} each
                </li>
                <li>
                  <strong>Bathrooms:</strong> +${config.bathroomRate} each
                </li>
                {config.frequencyMultipliers
                  .filter((f) => f.multiplier < 1)
                  .map((freq) => (
                    <li key={freq.key}>
                      <strong>{freq.label}:</strong>{" "}
                      {freqDiscounts[freq.key as keyof typeof freqDiscounts]}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900">Optional add-ons</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {config.addOns.map((addOn) => (
                  <li key={addOn.key} className="flex justify-between gap-3">
                    <span>{addOn.label}</span>
                    <span className="font-semibold text-[#00a8bc]">
                      +${addOns[addOn.key as keyof typeof addOns]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {compact && (
        <p className="text-center text-sm text-slate-600">
          Recurring plans save up to 15%.{" "}
          <Link href="/pricing" className="font-semibold text-[#00a8bc] hover:underline">
            See full pricing →
          </Link>
        </p>
      )}
    </div>
  );
}
