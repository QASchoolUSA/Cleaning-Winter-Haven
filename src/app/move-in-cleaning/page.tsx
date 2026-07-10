import Link from "next/link";
import Icon from "@/components/Icon";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import SectionImage from "@/components/SectionImage";
import MoveInCleaningContent from "@/components/content/MoveInCleaningContent";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { site } from "@/lib/site";

const PAGE_IMAGE = "/images/services/service-move-in-ready.jpg";

export const metadata = {
  title: "Move In Cleaning in Winter Haven",
  description: "Move-in cleaning in Winter Haven, FL. Sanitize your new home before unpacking. Professional deep clean for cabinets, bathrooms, kitchens, and floors.",
  alternates: { canonical: "/move-in-cleaning" },
  keywords: ["move in cleaning winter haven", "new home cleaning fl", "sanitize home before moving", "move in deep clean polk county"],
  openGraph: {
    images: [{ url: PAGE_IMAGE, width: 1536, height: 1024, alt: "Sanitized bedroom ready for move-in day" }],
  },
};

const timeline = [
  { phase: "Before move-in day", title: "Schedule the clean", desc: "Book for the window after closing and before your movers arrive. Empty homes allow the most thorough sanitization.", icon: "clock" as const },
  { phase: "Move-in day", title: "Walk into a fresh home", desc: "Every cabinet wiped, bathroom sanitized, kitchen degreased, and floors ready for furniture placement.", icon: "key" as const },
  { phase: "First week", title: "Optional touch-up", desc: "Many Winter Haven clients add a light follow-up after unpacking to catch dust from moving boxes.", icon: "sparkles" as const },
];

const faqs = [
  { q: "Should the home be empty for move-in cleaning?", a: "Ideally yes. Empty homes let us clean inside cabinets, closets, and all floor areas without obstruction." },
  { q: "How is move-in cleaning priced?", a: "Move-in/out level adds 20% to the base residential price for your home size. Get an instant quote online." },
  { q: "Do you remove construction dust from new builds?", a: "Yes. We handle drywall dust, adhesive residue, and contractor debris common in new Winter Haven construction." },
  { q: "Can you clean before a home inspection?", a: "We focus on move-in readiness rather than inspection prep, but a deep clean often helps presentation for buyers too." },
];

export default function MoveInCleaningPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
      <ServiceJsonLd
        name="Move In Cleaning Services"
        description="Professional move-in cleaning and sanitization in Winter Haven, FL."
        url={`${site.url}/move-in-cleaning`}
        image={`${site.url}${PAGE_IMAGE}`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Move In Cleaning", path: "/move-in-cleaning" }]} />

      <header className="max-w-3xl">
        <p className="section-eyebrow">Winter Haven, FL</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Move In Cleaning</h1>
        <p className="mt-4 text-lg text-slate-600">
          Start your new chapter in a sanitized, move-in ready home — every surface cleaned before your boxes arrive.
        </p>
        <Link href="/#booking" className="btn-primary mt-6 inline-flex">Get a fast quote</Link>
      </header>

      <SectionImage
        src={PAGE_IMAGE}
        alt="Freshly sanitized empty bedroom with sparkling windows ready for move-in"
        caption="Start unpacking in a sanitized home — every surface cleaned before your boxes arrive."
        priority
        className="mt-10"
      />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Your move-in timeline</h2>
        <div className="relative mt-8 space-y-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-2rem)] before:w-0.5 before:bg-[#0f766e]/20 sm:before:left-6">
          {timeline.map((item) => (
            <div key={item.phase} className="relative flex gap-6 pl-12 sm:pl-16">
              <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#0f766e] text-white sm:left-2 sm:h-10 sm:w-10">
                <Icon name={item.icon} className="h-4 w-4" />
              </div>
              <div className="card-accent flex-1 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">{item.phase}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <MoveInCleaningContent />
      </div>

      <FAQSection faqs={faqs} />
      <ServiceCTA title="Book your move-in clean" />
    </main>
  );
}
