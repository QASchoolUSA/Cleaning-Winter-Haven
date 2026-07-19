import Link from "next/link";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import SectionImage from "@/components/SectionImage";
import PostConstructionCleaningContent from "@/components/content/PostConstructionCleaningContent";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { POST_PRICES } from "@/lib/pricing";
import { site } from "@/lib/site";

const PAGE_IMAGE = "/images/services/service-post-construction.jpg";

export const metadata = {
  title: "Post-Construction Cleaning in Winter Haven",
  description: "Post-construction and renovation cleanup in Winter Haven, FL. Dust removal, detailing, and handover-ready finishing cleans from $299.",
  alternates: { canonical: "/post-construction-cleaning" },
  keywords: ["post construction cleaning winter haven", "renovation cleanup fl", "construction dust removal polk county", "builder final clean"],
  openGraph: {
    title: "Post-Construction Cleaning in Winter Haven, FL",
    description: "Phased renovation cleanup in Winter Haven — rough, detail, and final handover cleans from $299.",
    images: [{ url: PAGE_IMAGE, width: 1536, height: 1024, alt: "Dust-free renovated kitchen after post-construction cleaning" }],
  },
};

const phases = [
  { phase: "Phase 1", name: "Rough clean", desc: "Debris removal, floor sweeping, and surface dust knockdown after trades finish.", price: "Included" },
  { phase: "Phase 2", name: "Detail clean", desc: "Fine dust removal from cabinets, fixtures, HVAC vents, and all installed finishes.", price: "Included" },
  { phase: "Phase 3", name: "Final handover", desc: "White-glove pass for move-in or listing photography. Windows, floors, and fixtures perfected.", price: "Included" },
];

const faqs = [
  { q: "When should post-construction cleaning happen?", a: "Schedule rough clean after trades finish, detail clean after finishes are installed, and final handover before occupancy or listing." },
  { q: "Do you work with builders and contractors?", a: "Yes. We coordinate directly with GCs and project managers on multi-phase Winter Haven renovations." },
  { q: "How much does post-construction cleaning cost?", a: "From $299 for spaces under 1000 sqft, $449 for 1000–2000 sqft, and $649 for 2000+ sqft." },
  { q: "Can you handle drywall dust in HVAC systems?", a: "We clean vent covers and surrounding areas. HVAC duct cleaning requires a specialized contractor." },
];

export default function PostConstructionCleaningPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Three-phase post-construction cleaning in Winter Haven",
    description: "How Cleaning Winter Haven sequences rough, detail, and final handover cleans after renovation or new construction.",
    step: phases.map((p, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `${p.phase}: ${p.name}`,
      text: p.desc,
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
      <ServiceJsonLd
        name="Post-Construction Cleaning Services"
        description="Renovation and construction cleanup in Winter Haven, FL."
        url={`${site.url}/post-construction-cleaning`}
        image={`${site.url}${PAGE_IMAGE}`}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Post-Construction Cleaning", path: "/post-construction-cleaning" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <header className="max-w-3xl">
        <p className="section-eyebrow">Winter Haven, FL</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Post-Construction Cleaning</h1>
        <p className="mt-4 text-lg text-slate-600">
          From renovation dust to move-in ready — phased construction cleanup for builders, contractors, and homeowners across Polk County.
        </p>
        <Link href="/#booking" className="btn-primary mt-6 inline-flex">Get a fast quote</Link>
      </header>

      <SectionImage
        src={PAGE_IMAGE}
        alt="Newly renovated kitchen completely dust-free after post-construction cleaning"
        caption="White-glove handover cleans remove fine dust so renovations are move-in or listing ready."
        priority
        className="mt-10"
      />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Three-phase cleaning process</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {phases.map((p) => (
            <li key={p.phase} className="card-accent flex flex-col p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">{p.phase}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{p.desc}</p>
              <p className="mt-4 text-sm font-semibold text-[#0f766e]">{p.price}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {Object.entries(POST_PRICES).map(([key, price]) => (
          <div key={key} className="card p-4 text-center">
            <p className="text-xs text-slate-500">{key === "under1k" ? "Under 1000 sqft" : key === "1k-2k" ? "1000–2000 sqft" : "2000+ sqft"}</p>
            <p className="mt-1 text-2xl font-bold text-[#0f766e]">From ${price}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <PostConstructionCleaningContent />
      </div>

      <FAQSection faqs={faqs} />
      <ServiceCTA title="Schedule post-construction cleaning" />
    </main>
  );
}
