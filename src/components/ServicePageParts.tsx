import Link from "next/link";
import { site } from "@/lib/site";

export function ServiceCTA({ title = "Ready to book?" }: { title?: string }) {
  return (
    <section className="cta-band mt-16">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="mt-1 text-sm text-white/85">Instant quote · No upfront payment</p>
          </div>
          <Link href="/#booking" className="shrink-0 rounded-lg bg-[#f59e0b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d97706]">
            Get a fast quote
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function FAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
      <dl className="mt-6 space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="card-accent p-5">
            <dt className="font-semibold text-slate-900">{f.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
