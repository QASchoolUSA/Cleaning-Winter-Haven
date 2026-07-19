import Link from "next/link";
import Icon from "@/components/Icon";
import SectionImage from "@/components/SectionImage";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { site, SERVICE_LINKS } from "@/lib/site";

const PAGE_IMAGE = "/images/services/service-lakefront.jpg";

export const metadata = {
  title: "Service Areas — Winter Haven & Polk County",
  description: "Cleaning Winter Haven serves Downtown, Chain of Lakes, Cypress Gardens, Eagle Lake, Florence Villa, Inwood, and nearby Polk County communities.",
  alternates: { canonical: "/service-areas" },
  keywords: ["cleaning service areas winter haven", "house cleaning chain of lakes", "maid service polk county fl", "cleaning eagle lake"],
  openGraph: {
    title: "Service Areas — Winter Haven & Polk County",
    description: "Local cleaning routes across Downtown, Chain of Lakes, Cypress Gardens, Eagle Lake, Florence Villa, and Inwood.",
    images: [{ url: PAGE_IMAGE, width: 1536, height: 1024, alt: "Chain of Lakes lakefront home lanai" }],
  },
};

const areaLinks: Record<string, string> = {
  "Chain of Lakes": "/house-cleaning",
  "Cypress Gardens Area": "/residential-cleaning",
  Downtown: "/commercial-cleaning",
  "Florence Villa": "/move-out-cleaning",
  "Eagle Lake": "/residential-cleaning",
  Inwood: "/house-cleaning",
};

const areaFaqs = [
  { q: "Which communities near Winter Haven do you serve?", a: "The regular service area includes Winter Haven, Florence Villa, Eagle Lake, Inwood, Cypress Gardens, Haines City, Auburndale, and Lake Alfred. Exact availability depends on the address and route schedule." },
  { q: "Do you clean lakefront homes and vacation rentals?", a: "Yes. Share access, parking, turnover windows, linen responsibilities, and any outdoor-adjacent areas that need attention when requesting a quote." },
  { q: "Can you enter gated communities around Winter Haven?", a: "Yes, when the customer provides gate-list, call-box, parking, and vendor-access instructions before the appointment." },
  { q: "Does every service area offer the same cleaning options?", a: "Core residential and move-related services are broadly available, while commercial, post-construction, and time-sensitive turnover work depends on crew capacity and the exact property." },
];

export default function ServiceAreasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Service Areas",
    description: "Neighborhoods and communities served by Cleaning Winter Haven.",
    url: `${site.url}/service-areas`,
    about: { "@type": "LocalBusiness", name: site.name },
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Service Areas", path: "/service-areas" }]} />

      <header className="max-w-3xl">
        <p className="section-eyebrow">Where we work</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Winter Haven Service Areas</h1>
        <p className="mt-4 text-lg text-slate-600">
          Local cleaning teams serving Winter Haven neighborhoods and surrounding Polk County communities — with fast response times and neighborhood-specific expertise.
        </p>
      </header>

      <SectionImage
        src={PAGE_IMAGE}
        alt="Chain of Lakes lakefront home lanai with sparkling glass doors overlooking calm water"
        caption="From lakefront lanais to downtown storefronts — local crews who know Winter Haven neighborhoods."
        priority
        className="mt-10"
        aspect="hero"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.neighborhoods.map((area) => (
          <div key={area.name} className="card-accent p-6">
            <Icon name="map" className="h-6 w-6 text-[#0f766e]" />
            <h2 className="mt-3 text-lg font-semibold text-slate-900">{area.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{area.desc}</p>
            {areaLinks[area.name] && (
              <Link href={areaLinks[area.name]} className="mt-4 inline-block text-sm font-semibold text-[#0f766e] hover:underline">
                View recommended service →
              </Link>
            )}
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900">Also serving nearby</h2>
        <p className="mt-3 text-slate-600">
          {site.areaServed.join(" · ")}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Services available in every area</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LINKS.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="card-hover flex items-center gap-3 p-4 text-sm font-medium text-slate-700 hover:text-[#0f766e]">
                <Icon name={s.icon} className="h-5 w-5 text-[#0f766e]" />
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Local details that shape a cleaning plan</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Winter Haven housing ranges from downtown apartments and established neighborhoods to newer subdivisions and lakefront properties. Homes near the Chain of Lakes may see more patio and sliding-door traffic, while busy family households near Cypress Gardens often prioritize kitchens, bathrooms, floors, and guest-ready living areas.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Summer rain, pollen, and year-round air-conditioning also influence routine care. Entry floors, window tracks, ceiling fans, return vents, and humidity-prone bathrooms can be added to a rotating checklist without turning every visit into a full deep clean.
          </p>
        </div>
        <aside className="card p-6">
          <h3 className="text-lg font-bold text-slate-900">Before booking outside central Winter Haven</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-600">
            <li>Provide the full address or ZIP code for route confirmation.</li>
            <li>Note gated entry, condo elevators, stairs, or limited parking.</li>
            <li>Identify pets and any surface-specific product requirements.</li>
            <li>For rentals, include the true checkout-to-check-in window.</li>
          </ul>
        </aside>
      </section>

      <FAQSection faqs={areaFaqs} />

      <ServiceCTA title="Book cleaning in your neighborhood" />
    </main>
  );
}
