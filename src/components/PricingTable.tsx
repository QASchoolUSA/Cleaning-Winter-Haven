import Link from "next/link";
import { RESIDENTIAL_PRICES, COMMERCIAL_PRICES, POST_PRICES, ADDON_PRICES } from "@/lib/pricing";

type PricingTableProps = {
  compact?: boolean;
};

export default function PricingTable({ compact = false }: PricingTableProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Residential (standard clean)</h3>
        <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-5"}`}>
          {Object.entries(RESIDENTIAL_PRICES).map(([key, price]) => (
            <div key={key} className="card-accent p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{key === "4plus" ? "4+ BR" : key.replace("bed", " BR").replace("studio", "Studio")}</p>
              <p className="mt-1 text-2xl font-bold text-[#0f766e]">${price}</p>
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
                  <p className="mt-1 text-2xl font-bold text-[#0f766e]">${COMMERCIAL_PRICES[key]}</p>
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
                  <p className="mt-1 text-2xl font-bold text-[#0f766e]">${POST_PRICES[key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900">Cleaning level adjustments</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><strong>Deep clean:</strong> +40% on base price</li>
                <li><strong>Move-in / move-out:</strong> +20% on base price</li>
                <li><strong>Post-construction detailing:</strong> +30% on base price</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900">Optional add-ons</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {[
                  { label: "Inside fridge", price: ADDON_PRICES.fridge },
                  { label: "Inside oven", price: ADDON_PRICES.oven },
                  { label: "Interior windows", price: ADDON_PRICES.windows },
                  { label: "Inside cabinets", price: ADDON_PRICES.cabinets },
                  { label: "Baseboards", price: ADDON_PRICES.baseboards },
                ].map((item) => (
                  <li key={item.label} className="flex justify-between">
                    <span>{item.label}</span>
                    <span className="font-semibold text-[#0f766e]">+${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {compact && (
        <p className="text-center text-sm text-slate-600">
          Deep clean (+40%), move-in/out (+20%), and add-ons available.{" "}
          <Link href="/pricing" className="font-semibold text-[#0f766e] hover:underline">See full pricing →</Link>
        </p>
      )}
    </div>
  );
}
