import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import SectionImage from "@/components/SectionImage";
import ResidentialCleaningContent from "@/components/content/ResidentialCleaningContent";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { RESIDENTIAL_PRICES } from "@/lib/pricing";
import { site } from "@/lib/site";

const PAGE_IMAGE = "/images/services/service-residential.jpg";

export const metadata = {
  title: "Residential Cleaning in Winter Haven",
  description: "Recurring residential cleaning in Winter Haven, FL. Weekly, bi-weekly, and monthly home maintenance by local professionals. Transparent pricing from $99.",
  alternates: { canonical: "/residential-cleaning" },
  keywords: ["residential cleaning winter haven", "maid service winter haven", "recurring house cleaning", "apartment cleaning winter haven fl", "home cleaning chain of lakes"],
  openGraph: {
    images: [{ url: PAGE_IMAGE, width: 1536, height: 1024, alt: "Spotless kitchen after residential cleaning" }],
  },
};

const whatsIncluded: { icon: IconName; text: string }[] = [
  { icon: "sparkles", text: "Standard & deep cleaning options" },
  { icon: "home", text: "Kitchens, bathrooms, living areas & bedrooms" },
  { icon: "check", text: "Dusting, surfaces, floors vacuumed & mopped" },
  { icon: "check", text: "Flexible weekly, bi-weekly, or monthly plans" },
  { icon: "leaf", text: "Eco-friendly products available on request" },
];

const steps = [
  { n: "1", title: "Get your quote", desc: "Tell us your home size and preferred frequency for an instant estimate." },
  { n: "2", title: "Meet your team", desc: "We learn your priorities, access details, and any special requests." },
  { n: "3", title: "Enjoy a consistently clean home", desc: "Same trusted cleaners return on your schedule — adjust anytime." },
];

const faqs = [
  { q: "How often should I schedule residential cleaning?", a: "Most Winter Haven homeowners choose bi-weekly service. Weekly works well for busy families and rentals; monthly suits seasonal residents." },
  { q: "Do you bring supplies?", a: "Yes. We arrive with professional supplies and equipment. Eco-friendly products are available on request." },
  { q: "Can I skip or reschedule a visit?", a: "Absolutely. Contact us at least 24 hours ahead to reschedule without penalty." },
  { q: "Which neighborhoods do you cover?", a: "All of Winter Haven including Downtown, Chain of Lakes, Cypress Gardens, Florence Villa, Inwood, and Eagle Lake." },
];

export default function ResidentialCleaningPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
      <ServiceJsonLd
        name="Residential Cleaning Services"
        description="Professional recurring residential cleaning in Winter Haven, FL."
        url={`${site.url}/residential-cleaning`}
        image={`${site.url}${PAGE_IMAGE}`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Residential Cleaning", path: "/residential-cleaning" }]} />

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <header>
            <p className="section-eyebrow">Winter Haven, FL</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Residential Cleaning Services</h1>
            <p className="mt-4 text-lg text-slate-600">
              Recurring home maintenance for Winter Haven families — flexible scheduling, transparent pricing, and the same trusted team every visit.
            </p>
            <Link href="/#booking" className="btn-primary mt-6 inline-flex">Get a fast quote</Link>
          </header>

          <SectionImage
            src={PAGE_IMAGE}
            alt="Spotless modern kitchen with gleaming counters after residential cleaning"
            caption="Recurring residential cleans keep Winter Haven kitchens guest-ready between visits."
            priority
            className="mt-10"
          />

          <div className="mt-10 rounded-xl bg-[#0f766e]/5 p-6">
            <h2 className="font-semibold text-slate-900">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {whatsIncluded.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-slate-700">
                  <Icon name={item.icon} className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">How it works</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="card-accent p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f766e] text-sm font-bold text-white">{s.n}</span>
                  <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <ResidentialCleaningContent />
          </div>

          <FAQSection faqs={faqs} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-accent p-6">
            <h2 className="font-semibold text-slate-900">Starting prices</h2>
            <p className="mt-1 text-xs text-slate-500">Standard clean · Winter Haven rates</p>
            <ul className="mt-4 space-y-2">
              {Object.entries(RESIDENTIAL_PRICES).map(([key, price]) => (
                <li key={key} className="flex justify-between text-sm">
                  <span className="text-slate-600">{key === "4plus" ? "4+ Bedroom" : key.replace("bed", " Bedroom").replace("studio", "Studio")}</span>
                  <span className="font-bold text-[#0f766e]">${price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">Deep clean +40% · Move-in/out +20%</p>
            <Link href="/pricing" className="mt-4 block text-sm font-semibold text-[#0f766e] hover:underline">Full pricing details →</Link>
            <Link href="/#booking" className="btn-primary mt-6 w-full text-center">Book now</Link>
          </div>
        </aside>
      </div>

      <ServiceCTA title="Book recurring residential cleaning" />
    </main>
  );
}
