export type ServiceType = "residential" | "commercial" | "post-construction";

export type SqftBand =
  | "under-1000"
  | "1000-1500"
  | "1500-2500"
  | "2500-4000"
  | "4000-plus";

export type QuoteInput = {
  serviceType: ServiceType;
  /** 0 means studio. */
  bedrooms: number;
  /** Restrooms for commercial jobs. */
  bathrooms: number;
  /** Null when the customer does not know the size. */
  sqftBand: SqftBand | null;
  level: "standard" | "deep" | "move" | "post";
  addOns: { fridge?: boolean; oven?: boolean; windows?: boolean; cabinets?: boolean; baseboards?: boolean };
};

export const MAX_BEDROOMS = 5;
export const MAX_BATHROOMS = 4;

/** Price of a standard clean for a one-bathroom home of average size. */
export const bedroomBase: Record<number, number> = {
  0: 99,
  1: 119,
  2: 139,
  3: 169,
  4: 199,
  5: 229,
};

/** Each bathroom past the first. */
export const BATH_RATE = 20;

export const SQFT_BANDS: {
  key: SqftBand;
  label: string;
  /** Multiplier on the residential base; the 1,000-1,500 band is the anchor. */
  multiplier: number;
}[] = [
  { key: "under-1000", label: "Under 1,000 sq ft", multiplier: 0.9 },
  { key: "1000-1500", label: "1,000–1,500 sq ft", multiplier: 1 },
  { key: "1500-2500", label: "1,500–2,500 sq ft", multiplier: 1.1 },
  { key: "2500-4000", label: "2,500–4,000 sq ft", multiplier: 1.25 },
  { key: "4000-plus", label: "4,000+ sq ft", multiplier: 1.4 },
];

export const DEFAULT_SQFT_BAND: SqftBand = "1000-1500";

const commercialByBand: Record<SqftBand, number> = {
  "under-1000": 149,
  "1000-1500": 199,
  "1500-2500": 249,
  "2500-4000": 329,
  "4000-plus": 399,
};

const postByBand: Record<SqftBand, number> = {
  "under-1000": 299,
  "1000-1500": 379,
  "1500-2500": 449,
  "2500-4000": 549,
  "4000-plus": 649,
};

export type AddOnKey = keyof QuoteInput["addOns"];
const addOnPrices: Record<AddOnKey, number> = {
  fridge: 25,
  oven: 25,
  windows: 40,
  cabinets: 30,
  baseboards: 35,
};

export const ADDON_LABELS: Record<AddOnKey, string> = {
  fridge: "Inside fridge",
  oven: "Inside oven",
  windows: "Interior windows",
  cabinets: "Inside cabinets",
  baseboards: "Baseboards",
};

export function sqftBandLabel(band: SqftBand | null): string | null {
  return SQFT_BANDS.find((b) => b.key === band)?.label ?? null;
}

function sqftMultiplier(band: SqftBand | null): number {
  return SQFT_BANDS.find((b) => b.key === band)?.multiplier ?? 1;
}

export function bedroomLabel(bedrooms: number): string {
  if (bedrooms === 0) return "Studio";
  if (bedrooms >= MAX_BEDROOMS) return `${MAX_BEDROOMS}+ Bedroom`;
  return `${bedrooms} Bedroom`;
}

export function bathroomLabel(bathrooms: number): string {
  return bathrooms >= MAX_BATHROOMS ? `${MAX_BATHROOMS}+ Bath` : `${bathrooms} Bath`;
}

/** "2 Bedroom · 2 Bath · 1,000–1,500 sq ft" */
export function propertySummary(input: {
  serviceType: ServiceType;
  bedrooms: number;
  bathrooms: number;
  sqftBand: SqftBand | null;
}): string {
  const parts =
    input.serviceType === "residential"
      ? [bedroomLabel(input.bedrooms), bathroomLabel(input.bathrooms)]
      : [`${input.bathrooms} restroom${input.bathrooms === 1 ? "" : "s"}`];

  const band = sqftBandLabel(input.sqftBand);
  if (band) parts.push(band);
  return parts.join(" · ");
}

export function computeQuote(input: QuoteInput) {
  const extraBaths = Math.max(0, input.bathrooms - 1) * BATH_RATE;
  const band = input.sqftBand;

  let base = 0;
  if (input.serviceType === "residential") {
    const bedrooms = Math.min(Math.max(input.bedrooms, 0), MAX_BEDROOMS);
    base = ((bedroomBase[bedrooms] ?? 119) + extraBaths) * sqftMultiplier(band);
  }
  if (input.serviceType === "commercial") {
    base = commercialByBand[band ?? "1500-2500"] + extraBaths;
  }
  if (input.serviceType === "post-construction") {
    base = postByBand[band ?? "1500-2500"];
  }

  let multiplier = 1;
  if (input.level === "deep") multiplier += 0.4;
  if (input.level === "move") multiplier += 0.2;
  if (input.level === "post") multiplier += 0.3;

  const addOnsTotal = Object.entries(input.addOns).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + addOnPrices[key as AddOnKey];
  }, 0);

  const price = Math.round((base * multiplier + addOnsTotal) / 5) * 5;
  const low = Math.round(price * 0.9);
  const high = Math.round(price * 1.1);

  return { base, multiplier, addOnsTotal, price, range: { low, high } };
}

/** Add-ons formatted for the Booking Broom `quote.add_ons` field. */
export function selectedAddOnLines(addOns: QuoteInput["addOns"]) {
  return (Object.keys(addOnPrices) as AddOnKey[])
    .filter((key) => addOns[key])
    .map((key) => ({ label: ADDON_LABELS[key], price: addOnPrices[key] }));
}

/** Marketing-page tables keep their original keys so published copy stays stable. */
export const RESIDENTIAL_PRICES: Record<string, number> = {
  studio: bedroomBase[0],
  "1bed": bedroomBase[1],
  "2bed": bedroomBase[2],
  "3bed": bedroomBase[3],
  "4plus": bedroomBase[4],
};
export const COMMERCIAL_PRICES: Record<string, number> = {
  small: commercialByBand["under-1000"],
  medium: commercialByBand["1500-2500"],
  large: commercialByBand["4000-plus"],
};
export const POST_PRICES: Record<string, number> = {
  under1k: postByBand["under-1000"],
  "1k-2k": postByBand["1500-2500"],
  over2k: postByBand["4000-plus"],
};
export const ADDON_PRICES = addOnPrices;
