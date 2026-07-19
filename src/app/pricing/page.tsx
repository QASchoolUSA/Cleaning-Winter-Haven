import Link from "next/link";
import PricingTable from "@/components/PricingTable";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { site } from "@/lib/site";

export const metadata = {
  title: "Cleaning Prices in Winter Haven",
  description: "Transparent cleaning prices in Winter Haven, FL. Residential from $99, commercial from $149, post-construction from $299. No hidden fees.",
  alternates: { canonical: "/pricing" },
  keywords: ["cleaning prices winter haven", "house cleaning cost fl", "maid service rates polk county", "how much does cleaning cost"],
  openGraph: {
    title: "Cleaning Prices in Winter Haven, FL",
    description: "Transparent starting rates for residential, commercial, and post-construction cleaning in Winter Haven.",
  },
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cleaning Services Pricing",
  description: "Transparent pricing for residential, commercial, and post-construction cleaning in Winter Haven, FL.",
  provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
  areaServed: { "@type": "City", name: "Winter Haven" },
  url: `${site.url}/pricing`,
};

const pricingFaqs = [
  { q: "What changes the price of a Winter Haven house cleaning?", a: "Home size, bathrooms, current condition, service type, frequency, access, and optional tasks all affect the estimate. A lightly used condo and a first-time deep clean should not be priced as the same job." },
  { q: "Are the prices on this page guaranteed?", a: "They are starting rates, not a universal flat price. Use the quote tool and describe the property accurately so the confirmed scope and estimate match the work requested." },
  { q: "Is recurring cleaning less work than a one-time deep clean?", a: "Usually. Once a home has a clean baseline, weekly or biweekly visits focus on maintenance instead of repeatedly addressing months of buildup." },
  { q: "Which tasks may need an add-on or separate quote?", a: "Appliance interiors, interior windows, heavy buildup, post-construction dust, and unusually large properties may require extra time. Hazardous materials, active mold remediation, and major debris removal require specialist services." },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />

      <header className="max-w-3xl">
        <p className="section-eyebrow">No surprises</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Transparent Cleaning Prices</h1>
        <p className="mt-4 text-lg text-slate-600">
          Know your estimate before you book. All prices below are starting rates for standard cleaning in Winter Haven — use our{" "}
          <Link href="/#booking" className="font-semibold text-[#0f766e] hover:underline">online quote tool</Link> for your exact total.
        </p>
      </header>

      <div className="mt-12">
        <PricingTable />
      </div>

      <div className="mt-12 card p-6">
        <h2 className="text-lg font-semibold text-slate-900">How pricing works</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Your final quote combines a base price (by home or business size), a cleaning level multiplier, and any optional add-ons.
          Estimates are rounded to the nearest $5 and shown as a range (±10%). Payment is due after your cleaning is complete — no upfront charge to book.
        </p>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">What should a cleaning quote include?</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            A useful quote identifies the service level, approximate home size, bathrooms, frequency, and tasks that fall outside the standard checklist. It should also account for stairs, pets, parking or gate access, and whether the home will be occupied during the visit. Clear inputs make it easier to compare scope instead of choosing on price alone.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            For move-in, move-out, or post-construction work, share photos and confirm that water and electricity will be available. Empty rooms are faster to clean thoroughly, while boxes, contractor activity, or remaining furniture can change the time required.
          </p>
        </div>
        <div className="card-accent p-6">
          <h2 className="text-xl font-bold text-slate-900">Ways to keep the estimate accurate</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Choose deep cleaning when visible buildup needs more than routine maintenance.</li>
            <li>Count all bathrooms, including half baths, and use realistic square footage.</li>
            <li>List appliance interiors or other detail work before the team arrives.</li>
            <li>Provide gate, parking, pet, and entry instructions with the booking.</li>
            <li>Ask what is excluded when comparing two companies with different prices.</li>
          </ul>
        </div>
      </section>

      <FAQSection faqs={pricingFaqs} />

      <ServiceCTA title="Get your personalized quote" />
    </main>
  );
}
