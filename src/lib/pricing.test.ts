import { describe, expect, it } from "vitest";
import {
  DEFAULT_PRICING_CONFIG,
  calculatePrice,
  computeQuote,
  isUsablePricingConfig,
  minimumBase,
  residentialPrices,
  selectedAddOnLines,
  type PricingConfig,
} from "@/lib/pricing";

const standardTwoBed = {
  serviceType: "house" as const,
  bedrooms: 2,
  bathrooms: 1,
  sqft: 1000,
  frequency: "one-time" as const,
  addons: [] as const,
};

describe("calculatePrice / computeQuote with a remote config", () => {
  it("uses the supplied per-sqft rate and min base", () => {
    const dearer: PricingConfig = {
      ...DEFAULT_PRICING_CONFIG,
      serviceRates: DEFAULT_PRICING_CONFIG.serviceRates.map((row) =>
        row.key === "house" ? { ...row, perSqft: 0.2, minBase: 150 } : row
      ),
    };

    // max(97, round(1000*0.11)) + 2*14 + 1*21 = 110+28+21 = 159
    expect(computeQuote(standardTwoBed).price).toBe(159);
    // max(150, round(1000*0.2)) + 28 + 21 = 200+28+21 = 249
    expect(computeQuote(standardTwoBed, dearer).price).toBe(249);
  });

  it("applies frequency multipliers", () => {
    const weekly = computeQuote({ ...standardTwoBed, frequency: "weekly" });
    expect(weekly.price).toBe(Math.round(159 * 0.85));
  });

  it("uses the supplied add-on price and label", () => {
    const dearerFridge: PricingConfig = {
      ...DEFAULT_PRICING_CONFIG,
      addOns: DEFAULT_PRICING_CONFIG.addOns.map((addOn) =>
        addOn.key === "fridge"
          ? { ...addOn, price: 45, label: "Refrigerator interior" }
          : addOn
      ),
    };

    const input = { ...standardTwoBed, addons: ["fridge" as const] };
    expect(computeQuote(input, dearerFridge).price).toBe(204);
    expect(selectedAddOnLines(input.addons, dearerFridge)).toEqual([
      { label: "Refrigerator interior", price: 45 },
    ]);
  });

  it("derives marketing floors from the config", () => {
    expect(residentialPrices().studio).toBe(97);
    expect(minimumBase().house).toBe(97);
    expect(minimumBase().deep).toBe(149);
  });

  it("matches calculatePrice totals", () => {
    const input = {
      serviceType: "house" as const,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1000,
      frequency: "one-time" as const,
      addons: ["fridge" as const],
    };
    expect(calculatePrice(input).total).toBe(computeQuote(input).price);
    // 110 + 28 + 42 + 35 = 215
    expect(computeQuote(input).price).toBe(215);
  });
});

describe("isUsablePricingConfig", () => {
  it("accepts the shipped config", () => {
    expect(isUsablePricingConfig(DEFAULT_PRICING_CONFIG)).toBe(true);
  });

  it("rejects a config built for another site's engine", () => {
    expect(
      isUsablePricingConfig({ ...DEFAULT_PRICING_CONFIG, kind: "bedroom-band" })
    ).toBe(false);
  });

  it("rejects a config missing a service the picker renders", () => {
    expect(
      isUsablePricingConfig({
        ...DEFAULT_PRICING_CONFIG,
        serviceRates: DEFAULT_PRICING_CONFIG.serviceRates.filter(
          (r) => r.key !== "deep"
        ),
      })
    ).toBe(false);
  });

  it("rejects a config missing an add-on the picker renders", () => {
    expect(
      isUsablePricingConfig({
        ...DEFAULT_PRICING_CONFIG,
        addOns: DEFAULT_PRICING_CONFIG.addOns.filter((a) => a.key !== "oven"),
      })
    ).toBe(false);
  });

  it("rejects junk", () => {
    expect(isUsablePricingConfig(null)).toBe(false);
    expect(isUsablePricingConfig({})).toBe(false);
    expect(isUsablePricingConfig("nope")).toBe(false);
  });
});
