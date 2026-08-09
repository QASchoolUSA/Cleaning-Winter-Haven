import { describe, expect, it } from "vitest";
import {
  DEFAULT_PRICING_CONFIG,
  computeQuote,
  isUsablePricingConfig,
  residentialPrices,
  selectedAddOnLines,
  type PricingConfig,
} from "@/lib/pricing";

const standardTwoBed = {
  serviceType: "residential" as const,
  bedrooms: 2,
  bathrooms: 1,
  sqftBand: "1000-1500" as const,
  level: "standard" as const,
  addOns: {},
};

describe("computeQuote with a remote config", () => {
  it("uses the supplied bedroom base rather than the shipped one", () => {
    const dearer: PricingConfig = {
      ...DEFAULT_PRICING_CONFIG,
      bedroomBase: DEFAULT_PRICING_CONFIG.bedroomBase.map((row) =>
        row.bedrooms === 2 ? { ...row, price: 189 } : row
      ),
    };

    expect(computeQuote(standardTwoBed).price).toBe(140);
    expect(computeQuote(standardTwoBed, dearer).price).toBe(190);
  });

  it("uses the supplied level multiplier", () => {
    const gentlerDeep: PricingConfig = {
      ...DEFAULT_PRICING_CONFIG,
      levelMultipliers: DEFAULT_PRICING_CONFIG.levelMultipliers.map((level) =>
        level.key === "deep" ? { ...level, multiplier: 1.2 } : level
      ),
    };

    const input = { ...standardTwoBed, level: "deep" as const };
    expect(computeQuote(input).price).toBe(195);
    expect(computeQuote(input, gentlerDeep).price).toBe(165);
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

    const input = { ...standardTwoBed, addOns: { fridge: true } };
    expect(computeQuote(input, dearerFridge).price).toBe(185);
    expect(selectedAddOnLines(input.addOns, dearerFridge)).toEqual([
      { label: "Refrigerator interior", price: 45 },
    ]);
  });

  it("derives the marketing price table from the config", () => {
    const dearer: PricingConfig = {
      ...DEFAULT_PRICING_CONFIG,
      bedroomBase: DEFAULT_PRICING_CONFIG.bedroomBase.map((row) =>
        row.bedrooms === 0 ? { ...row, price: 109 } : row
      ),
    };

    expect(residentialPrices().studio).toBe(99);
    expect(residentialPrices(dearer).studio).toBe(109);
  });
});

describe("isUsablePricingConfig", () => {
  it("accepts the shipped config", () => {
    expect(isUsablePricingConfig(DEFAULT_PRICING_CONFIG)).toBe(true);
  });

  it("rejects a config built for another site's engine", () => {
    expect(
      isUsablePricingConfig({ ...DEFAULT_PRICING_CONFIG, kind: "sqft-rate-min" })
    ).toBe(false);
  });

  it("rejects a config missing a size band the picker renders", () => {
    expect(
      isUsablePricingConfig({
        ...DEFAULT_PRICING_CONFIG,
        sqftBands: DEFAULT_PRICING_CONFIG.sqftBands.slice(0, 2),
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
