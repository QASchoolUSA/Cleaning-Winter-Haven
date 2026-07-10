import Link from "next/link";
import Icon from "@/components/Icon";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import HouseCleaningContent from "@/components/content/HouseCleaningContent";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { site } from "@/lib/site";

export const metadata = {
  title: "House Cleaning in Winter Haven",
  description: "Professional house cleaning in Winter Haven, FL. Standard and deep cleaning for homes across the Chain of Lakes. Instant online quotes from $99.",
  alternates: { canonical: "/house-cleaning" },
  keywords: ["house cleaning winter haven", "deep cleaning winter haven fl", "maid service near me", "one time house cleaning polk county"],
};

const comparison = [
  { feature: "Surface dusting & wiping", standard: true, deep: true },
  { feature: "Floor vacuum & mop", standard: true, deep: true },
  { feature: "Bathroom sanitization", standard: true, deep: true },
  { feature: "Kitchen degreasing", standard: true, deep: true },
  { feature: "Baseboards & trim", standard: false, deep: true },
  { feature: "Light fixtures & fans", standard: false, deep: true },
  { feature: "Inside appliances (add-on)", standard: "add-on", deep: "add-on" },
  { feature: "Interior windows (add-on)", standard: "add-on", deep: "add-on" },
];

const benefits = [
  { title: "Healthier indoor air", desc: "Deep cleans remove dust buildup that Florida humidity traps in carpets and vents." },
  { title: "Guest-ready in hours", desc: "Perfect before lake house weekends or downtown dinner parties." },
  { title: "Save your weekends", desc: "Reclaim time on the Chain of Lakes instead of scrubbing bathrooms." },
];

const faqs = [
  { q: "How much does house cleaning cost in Winter Haven?", a: "Studios start at $99; 2-bedroom homes start at $139. Deep cleaning adds 40% and move cleaning adds 20%. See the full Winter Haven house cleaning cost guide for the complete price table." },
  { q: "How long does a house cleaning take?", a: "A standard 2-bedroom home typically takes 2–3 hours. Deep cleans may take 4–5 hours depending on size and condition." },
  { q: "What's the difference between standard and deep?", a: "Standard maintains tidy homes. Deep cleaning adds baseboards, fixtures, detailed grout work, and neglected areas." },
  { q: "Do you clean lake houses and vacation rentals?", a: "Yes. We regularly service properties along Lake Howard, Lake Cannon, and throughout the Chain of Lakes." },
  { q: "Can I book a same-week appointment?", a: "Often yes — check our online quote tool for the earliest available slot in Winter Haven." },
];

export default function HouseCleaningPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
      <ServiceJsonLd name="House Cleaning Services" description="Standard and deep house cleaning in Winter Haven, FL." url={`${site.url}/house-cleaning`} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "House Cleaning", path: "/house-cleaning" }]} />

      <header className="max-w-3xl">
        <p className="section-eyebrow">Winter Haven, FL</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">House Cleaning Services</h1>
        <p className="mt-4 text-lg text-slate-600">
          One-time standard or deep cleans for every room — from downtown bungalows to lakefront estates on the Chain of Lakes.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/#booking" className="btn-primary inline-flex">Get a fast quote</Link>
          <Link href="/guides/how-much-does-house-cleaning-cost-winter-haven" className="inline-flex items-center text-sm font-semibold text-[#0f766e] hover:underline">
            View 2026 cost guide →
          </Link>
        </div>
      </header>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="card-accent p-6">
            <Icon name="sparkles" className="h-6 w-6 text-[#0f766e]" />
            <h2 className="mt-3 font-semibold text-slate-900">{b.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-x-auto">
        <h2 className="text-2xl font-bold text-slate-900">Standard vs. deep cleaning</h2>
        <table className="mt-6 w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="pb-3 font-semibold text-slate-900">Feature</th>
              <th className="pb-3 font-semibold text-[#0f766e]">Standard</th>
              <th className="pb-3 font-semibold text-[#0f766e]">Deep (+40%)</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-b border-slate-100">
                <td className="py-3 text-slate-700">{row.feature}</td>
                <td className="py-3">{row.standard === true ? "✓" : row.standard === "add-on" ? "Add-on" : "—"}</td>
                <td className="py-3">{row.deep === true ? "✓" : row.deep === "add-on" ? "Add-on" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12">
        <HouseCleaningContent />
      </div>

      <FAQSection faqs={faqs} />
      <ServiceCTA title="Schedule your house cleaning" />
    </main>
  );
}
