import Link from "next/link";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { site } from "@/lib/site";
import { RESIDENTIAL_PRICES, ADDON_PRICES } from "@/lib/pricing";

export const metadata = {
  title: "House Cleaning Cost in Winter Haven, FL (2026 Price Guide)",
  description:
    "How much does house cleaning cost in Winter Haven? Studio from $99, 2-bed from $139. Deep cleaning +40%, move-in/out +20%. Transparent local pricing from Cleaning Winter Haven.",
  alternates: { canonical: "/guides/how-much-does-house-cleaning-cost-winter-haven" },
  keywords: [
    "how much does house cleaning cost in winter haven",
    "house cleaning prices winter haven fl",
    "maid service cost winter haven",
    "deep cleaning cost polk county",
    "cleaning rates chain of lakes",
  ],
};

const sizeRows = [
  { label: "Studio", key: "studio" as const },
  { label: "1 bedroom", key: "1bed" as const },
  { label: "2 bedrooms", key: "2bed" as const },
  { label: "3 bedrooms", key: "3bed" as const },
  { label: "4+ bedrooms", key: "4plus" as const },
];

function deepPrice(base: number) {
  return Math.round((base * 1.4) / 5) * 5;
}

function movePrice(base: number) {
  return Math.round((base * 1.2) / 5) * 5;
}

const faqs = [
  {
    q: "Is payment required before house cleaning in Winter Haven?",
    a: "No. Cleaning Winter Haven does not require upfront payment. The final total is due after the cleaning is complete.",
  },
  {
    q: "Do lakefront homes on the Chain of Lakes cost more to clean?",
    a: "Base rates follow bedroom count. Lakefront homes often need window, lanai, or baseboard add-ons because of pollen, humidity, and hard-water film—those add-ons are priced separately.",
  },
  {
    q: "Can I request eco-friendly products?",
    a: "Yes. Request green, low-odor products when booking. Eco products do not change the base bedroom rate.",
  },
  {
    q: "Which Winter Haven neighborhoods do these prices cover?",
    a: "The same published rates apply across Downtown Winter Haven, Chain of Lakes, Cypress Gardens, Florence Villa, Inwood, Eagle Lake, and nearby Auburndale, Haines City, and Lake Alfred.",
  },
];

const aiOverviewBlock =
  "House cleaning in Winter Haven, FL starts at $99 for a studio and scales by bedroom count: $119 for one bedroom, $139 for two bedrooms, $169 for three bedrooms, and $199 for four-or-more bedrooms. Deep cleaning adds 40 percent. Move-in and move-out cleaning adds 20 percent. Cleaning Winter Haven publishes fixed totals with no upfront payment required.";

export default function HouseCleaningCostGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "House Cleaning Cost in Winter Haven, FL: 2026 Price Guide",
    description: metadata.description,
    url: `${site.url}/guides/how-much-does-house-cleaning-cost-winter-haven`,
    datePublished: "2026-07-10",
    dateModified: "2026-07-10",
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/logo.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/guides/how-much-does-house-cleaning-cost-winter-haven`,
    },
    about: [
      { "@type": "Thing", name: "House cleaning cost in Winter Haven FL" },
      { "@type": "Service", name: "House Cleaning" },
      { "@type": "Service", name: "Residential Cleaning" },
      { "@type": "Place", name: "Winter Haven", address: { "@type": "PostalAddress", addressLocality: "Winter Haven", addressRegion: "FL" } },
    ],
    mentions: [
      { "@type": "Thing", name: "Deep cleaning" },
      { "@type": "Thing", name: "Move-out cleaning" },
      { "@type": "Thing", name: "Move-in cleaning" },
      { "@type": "Place", name: "Chain of Lakes" },
      { "@type": "Place", name: "Cypress Gardens" },
      { "@type": "AdministrativeArea", name: "Polk County" },
      { "@type": "Organization", name: site.name },
    ],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".ai-overview-target"],
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "House Cleaning", path: "/house-cleaning" },
          { name: "Cost Guide", path: "/guides/how-much-does-house-cleaning-cost-winter-haven" },
        ]}
      />

      <article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-[#0f766e]">
        <header>
          <p className="section-eyebrow not-prose">Winter Haven price guide · 2026</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            House Cleaning Cost in Winter Haven, FL: 2026 Price Guide
          </h1>
          <p className="mt-4 text-lg text-slate-600 not-prose">
            Transparent bedroom-tier rates from Cleaning Winter Haven — the same numbers powering our online quote tool.
          </p>
        </header>

        <h2>How Much Does House Cleaning Cost in Winter Haven?</h2>
        <p className="ai-overview-target text-base leading-relaxed text-slate-800 not-prose border-l-4 border-[#0f766e] bg-slate-50 px-4 py-3 rounded-r-lg">
          {aiOverviewBlock}
        </p>

        <h3>Winter Haven House Cleaning Price Table by Home Size</h3>
        <p>
          Cleaning Winter Haven prices residential jobs by bedroom count, not vague hourly ranges. The table below matches the live quote engine on{" "}
          <Link href="/pricing">our pricing page</Link>.
        </p>

        <div className="not-prose overflow-x-auto">
          <table className="mt-4 w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 font-semibold text-slate-900">Home size</th>
                <th className="pb-3 font-semibold text-[#0f766e]">Standard</th>
                <th className="pb-3 font-semibold text-[#0f766e]">Deep (+40%)</th>
                <th className="pb-3 font-semibold text-[#0f766e]">Move (+20%)</th>
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((row) => {
                const base = RESIDENTIAL_PRICES[row.key];
                return (
                  <tr key={row.key} className="border-b border-slate-100">
                    <td className="py-3 text-slate-700">{row.label}</td>
                    <td className="py-3 font-medium text-slate-900">${base}</td>
                    <td className="py-3 text-slate-700">${deepPrice(base)}</td>
                    <td className="py-3 text-slate-700">${movePrice(base)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6">
          Optional add-ons: fridge ${ADDON_PRICES.fridge}, oven ${ADDON_PRICES.oven}, interior windows ${ADDON_PRICES.windows}, inside cabinets $
          {ADDON_PRICES.cabinets}, detailed baseboards ${ADDON_PRICES.baseboards}.
        </p>

        <h3>Standard vs Deep vs Move Cleaning: What Changes the Price</h3>
        <p>
          <strong>Standard house cleaning</strong> maintains already-tidy Winter Haven homes: surfaces, floors, bathrooms, and kitchen fronts.{" "}
          <strong>Deep cleaning</strong> adds baseboards, light fixtures, fans, and detailed grout work at a fixed +40% multiplier.{" "}
          <strong>Move-in and move-out cleaning</strong> uses a vacancy protocol (appliance interiors, closets, landlord walkthrough items) at +20% — not the same scope as deep cleaning.
        </p>
        <p>
          See the full feature comparison on our <Link href="/house-cleaning">house cleaning service page</Link> and deposit-focused details on{" "}
          <Link href="/move-out-cleaning">move-out cleaning</Link>.
        </p>

        <h3>How Florida Humidity Affects Cleaning Frequency and Cost</h3>
        <p>
          Winter Haven&apos;s humidity and Chain of Lakes pollen change how often homes need service. Bathroom grout and silicone can show mold risk within 7–14 days in poorly ventilated baths. Lake-facing glass and lanais collect pollen and mineral film each spring. Sealed homes recirculate AC vent dust every 2–3 weeks.
        </p>
        <ul>
          <li>
            <strong>Weekly:</strong> High-occupancy, allergy, or pet households — highest annual spend, lowest soil buildup per visit.
          </li>
          <li>
            <strong>Bi-weekly:</strong> Typical Winter Haven family homes — best cost-to-cleanliness balance for most homeowners.
          </li>
          <li>
            <strong>Monthly + quarterly deep:</strong> Low-occupancy lake cottages — lower monthly cost, scheduled deep cleans for humidity zones.
          </li>
        </ul>

        <h3>How Long a House Cleaning Takes in Winter Haven</h3>
        <p>
          A standard 2-bedroom home typically takes 2–3 hours with a 2-person crew. Deep cleans for the same size often take 4–5 hours. Move-out cleans run 3–5 hours depending on appliance interiors and vacancy condition. Duration drives crew scheduling — not a separate hourly surcharge on top of the bedroom-tier total.
        </p>

        <h3>What Affects Quotes for Lakefront and Chain of Lakes Homes</h3>
        <p>
          Bedroom count sets the base. Cypress Gardens and lakefront properties often add windows, lanais, or baseboards because of pollen, boat-gear mud, and hard-water scale. Cluttered rooms slow crews and may require a condition adjustment after the first visit. Pets and eco-product requests do not change the published base rates.
        </p>

        <h3>How to Get an Instant Online Quote</h3>
        <p>
          Use the booking widget on the homepage or <Link href="/pricing">pricing page</Link> to select home size, cleaning level, and add-ons. Cleaning Winter Haven shows the estimate before you book. No upfront payment is required.
        </p>
        <p className="not-prose">
          <Link href="/#booking" className="btn-primary inline-flex">
            Get your Winter Haven cleaning quote
          </Link>
        </p>
      </article>

      <FAQSection faqs={faqs} />
      <ServiceCTA title="Book house cleaning at published Winter Haven rates" />
    </main>
  );
}
