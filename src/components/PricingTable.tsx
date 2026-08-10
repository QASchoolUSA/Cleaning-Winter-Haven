import Link from "next/link";
import {
  DEFAULT_PRICING_CONFIG,
  addOnPrices,
  commercialPrices,
  levelAdjustments,
  postPrices,
  residentialPrices,
  type PricingConfig,
} from "@/lib/pricing";

type PricingTableProps = {
  compact?: boolean;
  config?: PricingConfig;
};

export default function PricingTable({
  compact = false,
  config = DEFAULT_PRICING_CONFIG,
}: PricingTableProps) {
  const residential = residentialPrices(config);
  const commercial = commercialPrices(config);
  const post = postPrices(config);
  const addOns = addOnPrices(config);
  const levels = levelAdjustments(config);
  const deepUplift =
    levels.find((l) => l.label.toLowerCase().includes("deep"))?.uplift ?? 0;
  const moveUplift =
    levels.find((l) => l.label.toLowerCase().includes("move"))?.uplift ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Residential (standard clean)</h3>
        <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-5"}`}>
          {Object.entries(residential).map(([key, price]) => (
            <div key={key} className="card-accent p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{key === "4plus" ? "4+ BR" : key.replace("bed", " BR").replace("studio", "Studio")}</p>
              <p className="mt-1 text-2xl font-bold text-[#00a8bc]">${price}</p>
            </div>
          ))}
        </div>
      </div>

      {!compact && (
        <>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Commercial (standard clean)</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { key: "small", label: "Small (≤1000 sqft)" },
                { key: "medium", label: "Medium (1000–3000 sqft)" },
                { key: "large", label: "Large (3000+ sqft)" },
              ].map(({ key, label }) => (
                <div key={key} className="card-accent p-4 text-center">
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-1 text-2xl font-bold text-[#00a8bc]">${commercial[key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Post-construction</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { key: "under1k", label: "Under 1000 sqft" },
                { key: "1k-2k", label: "1000–2000 sqft" },
                { key: "over2k", label: "2000+ sqft" },
              ].map(({ key, label }) => (
                <div key={key} className="card-accent p-4 text-center">
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-1 text-2xl font-bold text-[#00a8bc]">${post[key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900">Cleaning level adjustments</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {levels.map((level) => (
                  <li key={level.label}>
                    <strong>{level.label}:</strong> +{level.uplift}% on base price
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900">Optional add-ons</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {config.addOns.map((addOn) => (
                  <li key={addOn.key} className="flex justify-between">
                    <span>{addOn.label}</span>
                    <span className="font-semibold text-[#00a8bc]">+${addOns[addOn.key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {compact && (
        <p className="text-center text-sm text-slate-600">
          Deep clean (+{deepUplift}%), move-in/out (+{moveUplift}%), and add-ons available.{" "}
          <Link href="/pricing" className="font-semibold text-[#00a8bc] hover:underline">See full pricing →</Link>
        </p>
      )}
    </div>
  );
}
