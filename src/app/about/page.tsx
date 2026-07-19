import type { Metadata } from "next";
import Link from "next/link";
import { site, SERVICE_LINKS } from "@/lib/site";
import { BreadcrumbJsonLd, ServiceCTA } from "@/components/ServicePageParts";

export const metadata: Metadata = {
  title: "About Cleaning Winter Haven",
  description: `How ${site.name} works: local Chain of Lakes cleaning, licensed and insured crews, clear scopes, and a mobile service-area model. ${site.serviceAreaPolicy}`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Cleaning Winter Haven",
    description: "Local Chain of Lakes cleaning teams, clear checklists, and transparent booking for Winter Haven homes and offices.",
  },
};

const differentiators = [
  {
    title: "Chain of Lakes local routes",
    text: "We plan around Winter Haven neighborhoods—Downtown, Cypress Gardens, Florence Villa, Eagle Lake, Inwood, and nearby Polk County communities—not a distant dispatch board.",
  },
  {
    title: "Licensed & insured teams",
    text: "Footer and service pages already state it because it matters: we operate as a licensed, insured cleaning business with a satisfaction guarantee.",
  },
  {
    title: "Service-specific checklists",
    text: "Residential maintenance, move cleans, commercial janitorial, and post-construction each follow different standards so dust from a remodel is never treated like a weekly tidy-up.",
  },
  {
    title: "Transparent booking",
    text: "Instant quotes with no upfront payment required to get on the calendar. You know the scope before we arrive.",
  },
];

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    ...(site.phoneTel ? { telephone: site.phoneTel } : {}),
    description: site.serviceAreaPolicy,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      <header className="max-w-3xl">
        <p className="section-eyebrow">Winter Haven · About us</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Professional cleaning for Winter Haven and the Chain of Lakes
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {site.name} is a mobile cleaning company serving homes and small businesses across Winter
          Haven and nearby Polk County. We focus on reliable schedules, clear scopes, and crews who
          treat your property like a worksite—not a gig app assignment.
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-5 text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-900">Company overview</h2>
        <p>
          Winter Haven properties range from lakefront rentals to busy family homes near LEGOLAND and
          downtown storefronts along Central Avenue. Those spaces need different cleaning cadences:
          weekly maintenance for lived-in kitchens, turnover cleans between guests, and heavier
          post-construction detailing after remodels. We built our service menu around those real
          local needs instead of one vague “cleaning” package.
        </p>
        <p>
          You can reach us at{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-[#0f766e] hover:underline">
            {site.email}
          </a>
          {site.phone && site.phoneTel ? (
            <>
              {" "}
              or{" "}
              <a href={`tel:${site.phoneTel}`} className="font-medium text-[#0f766e] hover:underline">
                {site.phone}
              </a>
            </>
          ) : null}
          . Hours: {site.hours}.
        </p>
      </section>

      <section className="mt-14 max-w-3xl space-y-5 text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-900">How booking works</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong className="text-slate-900">Get a quote.</strong> Share the service type, size, and
            timing. We confirm inclusions before you lock a date.
          </li>
          <li>
            <strong className="text-slate-900">Align on access.</strong> Entry instructions, pets, and
            priority rooms go on the job notes so the crew is prepared.
          </li>
          <li>
            <strong className="text-slate-900">We complete the checklist.</strong> Supplies are
            included; the team works room by room to the agreed scope.
          </li>
          <li>
            <strong className="text-slate-900">You pay after service.</strong> No upfront payment wall
            just to get on the calendar—see our booking CTA for the current quote flow.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-slate-900">What makes us different</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="card-accent p-6">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl space-y-4 text-slate-700 leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-900">Service-area policy</h2>
        <p>{site.serviceAreaPolicy}</p>
        <p>
          Primary coverage includes {site.areaServed.join(", ")}. For neighborhood detail, see our{" "}
          <Link href="/service-areas" className="font-medium text-[#0f766e] hover:underline">
            service areas
          </Link>{" "}
          page. If your address is just outside the usual route, ask when you request a quote—we will
          tell you honestly whether we can schedule you.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-slate-900">Services we offer</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LINKS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="card-hover flex items-center gap-3 p-4 text-sm font-medium text-slate-700 hover:text-[#0f766e]"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ServiceCTA title="Book Cleaning Winter Haven" />
    </main>
  );
}
