export type ServiceType = "residential" | "commercial" | "post-construction";

export type SqftBand =
  | "under-1000"
  | "1000-1500"
  | "1500-2500"
  | "2500-4000"
  | "4000-plus";

export type LevelKey = "standard" | "deep" | "move" | "post";

export type AddOnKey = "fridge" | "oven" | "windows" | "cabinets" | "baseboards";

export type QuoteInput = {
  serviceType: ServiceType;
  /** 0 means studio. */
  bedrooms: number;
  /** Restrooms for commercial jobs. */
  bathrooms: number;
  /** Null when the customer does not know the size. */
  sqftBand: SqftBand | null;
  level: LevelKey;
  addOns: Partial<Record<AddOnKey, boolean>>;
};

/**
 * Every number this site charges. Booking Broom is the source of truth; the
 * values below are what shipped and are used whenever the dashboard cannot be
 * reached, so a quote is never blocked on it.
 */
export type PricingConfig = {
  kind: "bedroom-band";
  /** Price of a standard clean for a one-bathroom home of average size. */
  bedroomBase: { bedrooms: number; price: number }[];
  /** Each bathroom past the first. */
  bathRate: number;
  /** The 1,000–1,500 band is the anchor at 1.0. */
  sqftBands: { key: SqftBand; label: string; multiplier: number }[];
  defaultSqftBand: SqftBand;
  commercialByBand: { key: SqftBand; value: number }[];
  postByBand: { key: SqftBand; value: number }[];
  levelMultipliers: { key: LevelKey; label: string; multiplier: number }[];
  addOns: { key: AddOnKey; label: string; price: number }[];
  maxBedrooms: number;
  maxBathrooms: number;
  roundToNearest: number;
  /** Quoted range either side of the price, e.g. 0.1 for ±10%. */
  rangeSpread: number;
};

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  kind: "bedroom-band",
  bedroomBase: [
    { bedrooms: 0, price: 99 },
    { bedrooms: 1, price: 119 },
    { bedrooms: 2, price: 139 },
    { bedrooms: 3, price: 169 },
    { bedrooms: 4, price: 199 },
    { bedrooms: 5, price: 229 },
  ],
  bathRate: 20,
  sqftBands: [
    { key: "under-1000", label: "Under 1,000 sq ft", multiplier: 0.9 },
    { key: "1000-1500", label: "1,000–1,500 sq ft", multiplier: 1 },
    { key: "1500-2500", label: "1,500–2,500 sq ft", multiplier: 1.1 },
    { key: "2500-4000", label: "2,500–4,000 sq ft", multiplier: 1.25 },
    { key: "4000-plus", label: "4,000+ sq ft", multiplier: 1.4 },
  ],
  defaultSqftBand: "1000-1500",
  commercialByBand: [
    { key: "under-1000", value: 149 },
    { key: "1000-1500", value: 199 },
    { key: "1500-2500", value: 249 },
    { key: "2500-4000", value: 329 },
    { key: "4000-plus", value: 399 },
  ],
  postByBand: [
    { key: "under-1000", value: 299 },
    { key: "1000-1500", value: 379 },
    { key: "1500-2500", value: 449 },
    { key: "2500-4000", value: 549 },
    { key: "4000-plus", value: 649 },
  ],
  levelMultipliers: [
    { key: "standard", label: "Standard", multiplier: 1 },
    { key: "deep", label: "Deep clean", multiplier: 1.4 },
    { key: "move", label: "Move-in / move-out", multiplier: 1.2 },
    { key: "post", label: "Post-construction detailing", multiplier: 1.3 },
  ],
  addOns: [
    { key: "fridge", label: "Inside fridge", price: 25 },
    { key: "oven", label: "Inside oven", price: 25 },
    { key: "windows", label: "Interior windows", price: 40 },
    { key: "cabinets", label: "Inside cabinets", price: 30 },
    { key: "baseboards", label: "Baseboards", price: 35 },
  ],
  maxBedrooms: 5,
  maxBathrooms: 4,
  roundToNearest: 5,
  rangeSpread: 0.1,
};

export const ADDON_KEYS: AddOnKey[] = [
  "fridge",
  "oven",
  "windows",
  "cabinets",
  "baseboards",
];

const SQFT_BAND_KEYS: SqftBand[] = [
  "under-1000",
  "1000-1500",
  "1500-2500",
  "2500-4000",
  "4000-plus",
];

/**
 * Guards against a remote config that parses as JSON but is missing the bands or
 * add-ons the UI iterates over, which would otherwise render an empty picker.
 */
export function isUsablePricingConfig(value: unknown): value is PricingConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<PricingConfig>;
  if (config.kind !== "bedroom-band") return false;
  if (typeof config.bathRate !== "number") return false;
  if (typeof config.roundToNearest !== "number") return false;
  if (typeof config.rangeSpread !== "number") return false;

  const hasEveryBand = (rows: { key: SqftBand }[] | undefined) =>
    Array.isArray(rows) && SQFT_BAND_KEYS.every((key) => rows.some((r) => r.key === key));

  if (!hasEveryBand(config.sqftBands)) return false;
  if (!hasEveryBand(config.commercialByBand)) return false;
  if (!hasEveryBand(config.postByBand)) return false;

  if (
    !Array.isArray(config.addOns) ||
    !ADDON_KEYS.every((key) => config.addOns!.some((a) => a.key === key))
  ) {
    return false;
  }

  return (
    Array.isArray(config.bedroomBase) &&
    config.bedroomBase.length > 0 &&
    Array.isArray(config.levelMultipliers) &&
    config.levelMultipliers.length > 0
  );
}

export function sqftBands(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return config.sqftBands;
}

export function defaultSqftBand(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return config.defaultSqftBand;
}

export function maxBedrooms(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return config.maxBedrooms;
}

export function maxBathrooms(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return config.maxBathrooms;
}

export function addOnLabels(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<AddOnKey, string> {
  return Object.fromEntries(
    config.addOns.map((a) => [a.key, a.label])
  ) as Record<AddOnKey, string>;
}

export function addOnPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<AddOnKey, number> {
  return Object.fromEntries(
    config.addOns.map((a) => [a.key, a.price])
  ) as Record<AddOnKey, number>;
}

export function levelAdjustments(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return config.levelMultipliers
    .filter((level) => level.key !== "standard")
    .map((level) => ({
      key: level.key,
      label: level.label,
      /** Percentage above a standard clean, e.g. 40 for a 1.4 multiplier. */
      uplift: Math.round((level.multiplier - 1) * 100),
    }));
}

export function sqftBandLabel(
  band: SqftBand | null,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string | null {
  return config.sqftBands.find((b) => b.key === band)?.label ?? null;
}

function sqftMultiplier(band: SqftBand | null, config: PricingConfig): number {
  return config.sqftBands.find((b) => b.key === band)?.multiplier ?? 1;
}

export function bedroomLabel(
  bedrooms: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string {
  if (bedrooms === 0) return "Studio";
  if (bedrooms >= config.maxBedrooms) return `${config.maxBedrooms}+ Bedroom`;
  return `${bedrooms} Bedroom`;
}

export function bathroomLabel(
  bathrooms: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string {
  return bathrooms >= config.maxBathrooms
    ? `${config.maxBathrooms}+ Bath`
    : `${bathrooms} Bath`;
}

/** "2 Bedroom · 2 Bath · 1,000–1,500 sq ft" */
export function propertySummary(
  input: {
    serviceType: ServiceType;
    bedrooms: number;
    bathrooms: number;
    sqftBand: SqftBand | null;
  },
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string {
  const parts =
    input.serviceType === "residential"
      ? [
          bedroomLabel(input.bedrooms, config),
          bathroomLabel(input.bathrooms, config),
        ]
      : [`${input.bathrooms} restroom${input.bathrooms === 1 ? "" : "s"}`];

  const band = sqftBandLabel(input.sqftBand, config);
  if (band) parts.push(band);
  return parts.join(" · ");
}

export function computeQuote(
  input: QuoteInput,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
) {
  const extraBaths = Math.max(0, input.bathrooms - 1) * config.bathRate;
  const band = input.sqftBand;
  const fallbackBand: SqftBand = "1500-2500";

  let base = 0;
  if (input.serviceType === "residential") {
    const bedrooms = Math.min(Math.max(input.bedrooms, 0), config.maxBedrooms);
    const bedBase =
      config.bedroomBase.find((b) => b.bedrooms === bedrooms)?.price ?? 119;
    base = (bedBase + extraBaths) * sqftMultiplier(band, config);
  }
  if (input.serviceType === "commercial") {
    const row = config.commercialByBand.find(
      (b) => b.key === (band ?? fallbackBand)
    );
    base = (row?.value ?? 0) + extraBaths;
  }
  if (input.serviceType === "post-construction") {
    base =
      config.postByBand.find((b) => b.key === (band ?? fallbackBand))?.value ?? 0;
  }

  const multiplier =
    config.levelMultipliers.find((l) => l.key === input.level)?.multiplier ?? 1;

  const prices = addOnPrices(config);
  const addOnsTotal = Object.entries(input.addOns).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + (prices[key as AddOnKey] ?? 0);
  }, 0);

  const step = config.roundToNearest > 0 ? config.roundToNearest : 1;
  const price = Math.round((base * multiplier + addOnsTotal) / step) * step;
  const low = Math.round(price * (1 - config.rangeSpread));
  const high = Math.round(price * (1 + config.rangeSpread));

  return { base, multiplier, addOnsTotal, price, range: { low, high } };
}

/** Add-ons formatted for the Booking Broom `quote.add_ons` field. */
export function selectedAddOnLines(
  addOns: QuoteInput["addOns"],
  config: PricingConfig = DEFAULT_PRICING_CONFIG
) {
  return config.addOns
    .filter((addOn) => addOns[addOn.key])
    .map((addOn) => ({ label: addOn.label, price: addOn.price }));
}

/** Marketing-page tables keep their original keys so published copy stays stable. */
export function residentialPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<string, number> {
  const base = (bedrooms: number) =>
    config.bedroomBase.find((b) => b.bedrooms === bedrooms)?.price ?? 0;
  return {
    studio: base(0),
    "1bed": base(1),
    "2bed": base(2),
    "3bed": base(3),
    "4plus": base(4),
  };
}

export function commercialPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<string, number> {
  const byBand = (key: SqftBand) =>
    config.commercialByBand.find((b) => b.key === key)?.value ?? 0;
  return {
    small: byBand("under-1000"),
    medium: byBand("1500-2500"),
    large: byBand("4000-plus"),
  };
}

export function postPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<string, number> {
  const byBand = (key: SqftBand) =>
    config.postByBand.find((b) => b.key === key)?.value ?? 0;
  return {
    under1k: byBand("under-1000"),
    "1k-2k": byBand("1500-2500"),
    over2k: byBand("4000-plus"),
  };
}
