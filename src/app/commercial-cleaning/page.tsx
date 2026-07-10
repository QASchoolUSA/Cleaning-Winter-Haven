import Link from "next/link";
import Icon from "@/components/Icon";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import SectionImage from "@/components/SectionImage";
import CommercialCleaningContent from "@/components/content/CommercialCleaningContent";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { COMMERCIAL_PRICES } from "@/lib/pricing";
import { site } from "@/lib/site";

const PAGE_IMAGE = "/images/services/service-commercial-office.jpg";

export const metadata = {
  title: "Commercial Cleaning in Winter Haven",
  description: "Commercial and office cleaning in Winter Haven, FL. Professional janitorial service for offices, retail, and medical spaces. From $149.",
  alternates: { canonical: "/commercial-cleaning" },
  keywords: ["commercial cleaning winter haven", "office cleaning polk county", "janitorial service winter haven fl", "retail cleaning"],
  openGraph: {
    images: [{ url: PAGE_IMAGE, width: 1536, height: 1024, alt: "Polished office after commercial cleaning" }],
  },
};

const industries = [
  { icon: "building" as const, title: "Professional Offices", desc: "Desks, conference rooms, break areas, and restrooms on daily or weekly schedules." },
  { icon: "sparkles" as const, title: "Retail & Showrooms", desc: "Customer-facing spaces and back-of-house areas maintained to brand standards." },
  { icon: "shield" as const, title: "Medical & Wellness", desc: "Waiting rooms and treatment areas with high-touch surface sanitization." },
];

const faqs = [
  { q: "Do you clean after business hours?", a: "Yes. Most commercial clients in Winter Haven prefer evening or early morning service to avoid disrupting operations." },
  { q: "Can you provide proof of insurance?", a: "Absolutely. We provide certificates of insurance for property managers and commercial landlords upon request." },
  { q: "How is commercial pricing calculated?", a: "Based on square footage: small (≤1000 sqft) from $149, medium (1000–3000) from $249, large (3000+) from $399." },
  { q: "Will we get the same cleaning team?", a: "Yes. We assign consistent crews who learn your layout, access codes, and facility requirements." },
];

export default function CommercialCleaningPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
      <ServiceJsonLd
        name="Commercial Cleaning Services"
        description="Office and commercial janitorial cleaning in Winter Haven, FL."
        url={`${site.url}/commercial-cleaning`}
        image={`${site.url}${PAGE_IMAGE}`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Commercial Cleaning", path: "/commercial-cleaning" }]} />

      <header className="max-w-3xl">
        <p className="section-eyebrow">Winter Haven, FL</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Commercial Cleaning</h1>
        <p className="mt-4 text-lg text-slate-600">
          Professional janitorial service for Winter Haven businesses — consistent teams, transparent pricing, and after-hours availability.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/#booking" className="btn-primary">Request a quote</Link>
          <a href={`tel:${site.phoneTel}`} className="btn-secondary">Call {site.phone}</a>
        </div>
      </header>

      <SectionImage
        src={PAGE_IMAGE}
        alt="Modern Winter Haven office with polished desks and glass conference room after commercial cleaning"
        caption="Client-ready offices and shared workspaces maintained on daily or weekly schedules."
        priority
        className="mt-10"
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {industries.map((ind) => (
          <div key={ind.title} className="card-accent p-6">
            <Icon name={ind.icon} className="h-7 w-7 text-[#0f766e]" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{ind.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{ind.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CommercialCleaningContent />
        </div>
        <div className="card-accent h-fit p-6">
          <h2 className="font-semibold text-slate-900">Commercial rates</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex justify-between text-sm"><span>Small (≤1000 sqft)</span><span className="font-bold text-[#0f766e]">From ${COMMERCIAL_PRICES.small}</span></li>
            <li className="flex justify-between text-sm"><span>Medium (1000–3000)</span><span className="font-bold text-[#0f766e]">From ${COMMERCIAL_PRICES.medium}</span></li>
            <li className="flex justify-between text-sm"><span>Large (3000+)</span><span className="font-bold text-[#0f766e]">From ${COMMERCIAL_PRICES.large}</span></li>
          </ul>
          <Link href="/pricing" className="mt-4 block text-sm font-semibold text-[#0f766e] hover:underline">View full pricing →</Link>
        </div>
      </div>

      <FAQSection faqs={faqs} />
      <ServiceCTA title="Get a commercial cleaning quote" />
    </main>
  );
}
