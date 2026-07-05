import Link from "next/link";
import Icon from "@/components/Icon";
import { BreadcrumbJsonLd, ServiceCTA } from "@/components/ServicePageParts";
import { site, SERVICE_LINKS } from "@/lib/site";

export const metadata = {
  title: "Service Areas — Winter Haven & Polk County",
  description: "Cleaning Winter Haven serves Downtown, Chain of Lakes, Cypress Gardens, Eagle Lake, Florence Villa, Inwood, and nearby Polk County communities.",
  alternates: { canonical: "/service-areas" },
  keywords: ["cleaning service areas winter haven", "house cleaning chain of lakes", "maid service polk county fl", "cleaning eagle lake"],
};

const areaLinks: Record<string, string> = {
  "Chain of Lakes": "/house-cleaning",
  "Cypress Gardens Area": "/residential-cleaning",
  Downtown: "/commercial-cleaning",
  "Florence Villa": "/move-out-cleaning",
  "Eagle Lake": "/residential-cleaning",
  Inwood: "/house-cleaning",
};

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

      <ServiceCTA title="Book cleaning in your neighborhood" />
    </main>
  );
}
