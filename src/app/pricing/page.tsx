import Link from "next/link";
import PricingTable from "@/components/PricingTable";
import { BreadcrumbJsonLd, ServiceCTA } from "@/components/ServicePageParts";
import { site } from "@/lib/site";

export const metadata = {
  title: "Cleaning Prices in Winter Haven",
  description: "Transparent cleaning prices in Winter Haven, FL. Residential from $99, commercial from $149, post-construction from $299. No hidden fees.",
  alternates: { canonical: "/pricing" },
  keywords: ["cleaning prices winter haven", "house cleaning cost fl", "maid service rates polk county", "how much does cleaning cost"],
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

      <ServiceCTA title="Get your personalized quote" />
    </main>
  );
}
