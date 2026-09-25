export type ServiceTypeId =
  | "house"
  | "apartment"
  | "move"
  | "airbnb"
  | "post-construction"
  | "maintenance"
  | "deep";

/** @deprecated Use ServiceTypeId — kept for gradual call-site migration. */
export type ServiceType = ServiceTypeId;

export type FrequencyId = "one-time" | "weekly" | "bi-weekly" | "monthly";

export type AddonId =
  | "kitchen-deep"
  | "oven"
  | "fridge"
  | "windows-interior"
  | "windows-exterior"
  | "laundry"
  | "cabinets"
  | "garage"
  | "balcony"
  | "pets";

/** @deprecated Prefer AddonId. */
export type AddOnKey = AddonId;

export interface PricingInput {
  serviceType: ServiceTypeId;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  frequency: FrequencyId;
  addons: AddonId[];
}

export interface PriceBreakdown {
  base: number;
  bedrooms: number;
  bathrooms: number;
  addons: number;
  subtotal: number;
  frequencyMultiplier: number;
  frequencyDiscount: number;
  total: number;
}

/**
 * Every number this site charges. Booking Broom is the source of truth; the
 * values in `DEFAULT_PRICING_CONFIG` are what shipped and are used whenever the
 * dashboard cannot be reached, so a quote is never blocked on it.
 */
export type PricingConfig = {
  kind: "sqft-rate-min";
  /** Per-sq-ft rate and the floor the base can never fall below. */
  serviceRates: { key: string; perSqft: number; minBase: number }[];
  bedroomRate: number;
  bathroomRate: number;
  frequencyMultipliers: { key: string; label: string; multiplier: number }[];
  addOns: { key: string; label: string; price: number }[];
  /** Square footage bands; `value` is the midpoint an estimate is built from. */
  sqftPresets: { label: string; value: number }[];
  minSqft: number;
  maxSqft: number;
};

/** Winter Haven — Nikita discount (−25%) rates. */
export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  kind: "sqft-rate-min",
  serviceRates: [
    { key: "house", perSqft: 0.11, minBase: 97 },
    { key: "apartment", perSqft: 0.11, minBase: 74 },
    { key: "move", perSqft: 0.17, minBase: 142 },
    { key: "airbnb", perSqft: 0.09, minBase: 112 },
    { key: "post-construction", perSqft: 0.29, minBase: 187 },
    { key: "maintenance", perSqft: 0.11, minBase: 82 },
    { key: "deep", perSqft: 0.15, minBase: 149 },
  ],
  bedroomRate: 14,
  bathroomRate: 21,
  frequencyMultipliers: [
    { key: "one-time", label: "One-time", multiplier: 1 },
    { key: "weekly", label: "Weekly", multiplier: 0.85 },
    { key: "bi-weekly", label: "Bi-weekly", multiplier: 0.9 },
    { key: "monthly", label: "Monthly", multiplier: 0.95 },
  ],
  addOns: [
    { key: "kitchen-deep", label: "Kitchen deep clean", price: 45 },
    { key: "oven", label: "Oven cleaning", price: 35 },
    { key: "fridge", label: "Fridge cleaning", price: 35 },
    { key: "windows-interior", label: "Windows (interior)", price: 40 },
    { key: "windows-exterior", label: "Windows (exterior)", price: 55 },
    { key: "laundry", label: "Laundry fold & put away", price: 25 },
    { key: "cabinets", label: "Inside cabinets", price: 40 },
    { key: "garage", label: "Garage sweep & wipe", price: 50 },
    { key: "balcony", label: "Patio / balcony", price: 30 },
    { key: "pets", label: "Pet-friendly detail", price: 20 },
  ],
  sqftPresets: [
    { label: "Under 800 sq ft", value: 600 },
    { label: "800\u20131,200 sq ft", value: 1000 },
    { label: "1,200\u20132,000 sq ft", value: 1600 },
    { label: "2,000\u20132,600 sq ft", value: 2200 },
    { label: "2,600+ sq ft", value: 3000 },
  ],
  minSqft: 400,
  maxSqft: 6000,
};

const SERVICE_TYPE_IDS: ServiceTypeId[] = [
  "house",
  "apartment",
  "move",
  "airbnb",
  "post-construction",
  "maintenance",
  "deep",
];

export const ADDON_KEYS: AddonId[] = [
  "kitchen-deep",
  "oven",
  "fridge",
  "windows-interior",
  "windows-exterior",
  "laundry",
  "cabinets",
  "garage",
  "balcony",
  "pets",
];

const ADDON_IDS = ADDON_KEYS;

const FREQUENCY_IDS: FrequencyId[] = [
  "one-time",
  "weekly",
  "bi-weekly",
  "monthly",
];

export const SERVICE_LABELS: Record<ServiceTypeId, string> = {
  house: "House Cleaning",
  apartment: "Apartment Cleaning",
  move: "Move-in / Move-out",
  airbnb: "Airbnb Cleaning",
  "post-construction": "Post-Construction",
  maintenance: "Maintenance Cleaning",
  deep: "Deep Cleaning",
};

/**
 * Guards against a remote config that parses as JSON but is missing a service,
 * frequency or add-on the UI iterates over, which would otherwise quote $0 or
 * render an empty picker.
 */
export function isUsablePricingConfig(value: unknown): value is PricingConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<PricingConfig>;
  if (config.kind !== "sqft-rate-min") return false;
  if (typeof config.bedroomRate !== "number") return false;
  if (typeof config.bathroomRate !== "number") return false;
  if (typeof config.minSqft !== "number") return false;
  if (typeof config.maxSqft !== "number") return false;
  if (!Array.isArray(config.sqftPresets) || config.sqftPresets.length === 0) {
    return false;
  }
  if (!Array.isArray(config.serviceRates)) return false;
  if (!Array.isArray(config.frequencyMultipliers)) return false;
  if (!Array.isArray(config.addOns)) return false;

  return (
    SERVICE_TYPE_IDS.every((id) =>
      config.serviceRates!.some((rate) => rate.key === id)
    ) &&
    FREQUENCY_IDS.every((id) =>
      config.frequencyMultipliers!.some((freq) => freq.key === id)
    ) &&
    ADDON_IDS.every((id) => config.addOns!.some((addOn) => addOn.key === id))
  );
}

export function frequencyMultipliers(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<FrequencyId, number> {
  return Object.fromEntries(
    config.frequencyMultipliers.map((freq) => [freq.key, freq.multiplier])
  ) as Record<FrequencyId, number>;
}

export function frequencyLabels(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<FrequencyId, string> {
  return Object.fromEntries(
    config.frequencyMultipliers.map((freq) => [freq.key, freq.label])
  ) as Record<FrequencyId, string>;
}

/** "15% off" for a 0.85 multiplier; null when there is nothing to advertise. */
export function frequencyDiscountLabels(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<FrequencyId, string | null> {
  return Object.fromEntries(
    config.frequencyMultipliers.map((freq) => {
      const off = Math.round((1 - freq.multiplier) * 100);
      return [freq.key, off > 0 ? `${off}% off` : null];
    })
  ) as Record<FrequencyId, string | null>;
}

export function addOnPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<AddonId, number> {
  return Object.fromEntries(
    config.addOns.map((addOn) => [addOn.key, addOn.price])
  ) as Record<AddonId, number>;
}

export function addOnLabels(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<AddonId, string> {
  return Object.fromEntries(
    config.addOns.map((addOn) => [addOn.key, addOn.label])
  ) as Record<AddonId, string>;
}

/** The published "from $X" floor for each service. */
export function minimumBase(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<ServiceTypeId, number> {
  return Object.fromEntries(
    config.serviceRates.map((rate) => [rate.key, rate.minBase])
  ) as Record<ServiceTypeId, number>;
}

export function sqftPresets(config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return config.sqftPresets;
}

export function sqftPresetLabel(
  value: number,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string {
  const closest = config.sqftPresets.reduce((best, preset) =>
    Math.abs(preset.value - value) < Math.abs(best.value - value) ? preset : best
  );
  return closest.label;
}

export function calculatePrice(
  input: PricingInput,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): PriceBreakdown {
  const sqft = Math.max(config.minSqft, Math.min(config.maxSqft, input.sqft));
  const bedrooms = Math.max(0, Math.min(8, input.bedrooms));
  const bathrooms = Math.max(1, Math.min(8, input.bathrooms));

  const rate = config.serviceRates.find((r) => r.key === input.serviceType);
  const rawBase = sqft * (rate?.perSqft ?? 0);
  const base = Math.max(rate?.minBase ?? 0, Math.round(rawBase));
  const bedroomCost = bedrooms * config.bedroomRate;
  const bathroomCost = bathrooms * config.bathroomRate;
  const prices = addOnPrices(config);
  const addonCost = input.addons.reduce(
    (sum, id) => sum + (prices[id] ?? 0),
    0
  );

  const subtotal = base + bedroomCost + bathroomCost + addonCost;
  const frequencyMultiplier =
    config.frequencyMultipliers.find((f) => f.key === input.frequency)
      ?.multiplier ?? 1;
  const total = Math.round(subtotal * frequencyMultiplier);
  const frequencyDiscount = Math.round(subtotal - total);

  return {
    base,
    bedrooms: bedroomCost,
    bathrooms: bathroomCost,
    addons: addonCost,
    subtotal,
    frequencyMultiplier,
    frequencyDiscount,
    total,
  };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function bedroomLabel(bedrooms: number): string {
  if (bedrooms === 0) return "Studio";
  if (bedrooms >= 5) return "5+ Bedroom";
  return `${bedrooms} Bedroom`;
}

export function bathroomLabel(bathrooms: number): string {
  return bathrooms >= 5 ? "5+ Bath" : `${bathrooms} Bath`;
}

/** "2 Bedroom · 2 Bath · 1,200–2,000 sq ft" */
export function propertySummary(
  input: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
  },
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string {
  return [
    bedroomLabel(input.bedrooms),
    bathroomLabel(input.bathrooms),
    sqftPresetLabel(input.sqft, config),
  ].join(" · ");
}

/**
 * Widget-facing quote helper. Returns the Davenport total plus a degenerate
 * range so review copy that still mentions low/high keeps compiling.
 */
export function computeQuote(
  input: PricingInput,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
) {
  const breakdown = calculatePrice(input, config);
  return {
    ...breakdown,
    price: breakdown.total,
    range: { low: breakdown.total, high: breakdown.total },
  };
}

/** Add-ons formatted for the Booking Broom `quote.add_ons` field. */
export function selectedAddOnLines(
  addons: AddonId[],
  config: PricingConfig = DEFAULT_PRICING_CONFIG
) {
  const prices = addOnPrices(config);
  const labels = addOnLabels(config);
  return addons.map((key) => ({
    label: labels[key] ?? key,
    price: prices[key] ?? 0,
  }));
}

/**
 * Approximate bedroom "from" table for marketing pages — house floor plus
 * bedroom rate (bathrooms and square footage still change the live quote).
 */
export function residentialPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<string, number> {
  const base = minimumBase(config).house;
  const br = config.bedroomRate;
  return {
    studio: base,
    "1bed": base + br,
    "2bed": base + 2 * br,
    "3bed": base + 3 * br,
    "4plus": base + 4 * br,
  };
}

/** Illustrative commercial starting points from apartment rate × sample size. */
export function commercialPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<string, number> {
  const quote = (sqft: number) =>
    calculatePrice(
      {
        serviceType: "apartment",
        sqft,
        bedrooms: 0,
        bathrooms: 1,
        frequency: "one-time",
        addons: [],
      },
      config
    ).total;
  return {
    small: quote(800),
    medium: quote(2000),
    large: quote(4000),
  };
}

/** Post-construction starting points at sample sizes. */
export function postPrices(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): Record<string, number> {
  const quote = (sqft: number) =>
    calculatePrice(
      {
        serviceType: "post-construction",
        sqft,
        bedrooms: 0,
        bathrooms: 1,
        frequency: "one-time",
        addons: [],
      },
      config
    ).total;
  return {
    under1k: quote(800),
    "1k-2k": quote(1500),
    over2k: quote(2500),
  };
}

/**
 * Rough % uplift of deep/move floors vs house floor — for legacy marketing copy
 * that still speaks in “+X%” language.
 */
export function levelAdjustments(
  config: PricingConfig = DEFAULT_PRICING_CONFIG
) {
  const floors = minimumBase(config);
  const house = floors.house || 1;
  return (["deep", "move"] as const).map((key) => ({
    key,
    label: key === "deep" ? "Deep clean" : "Move-in / move-out",
    uplift: Math.round((floors[key] / house - 1) * 100),
  }));
}

/** @deprecated Prefer config.bathroomRate. */
export function maxBathrooms(_config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return 5;
}

/** @deprecated Prefer fixed bedroom pills 0–5. */
export function maxBedrooms(_config: PricingConfig = DEFAULT_PRICING_CONFIG) {
  return 5;
}
