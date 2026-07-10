import Accordion from "./Accordion";
import Link from "next/link";

const faqs = [
  {
    q: "How much does house cleaning cost in Winter Haven?",
    a: (
      <>
        Standard residential cleaning starts at $99 for a studio and scales by bedroom count ($119–$199). Deep cleans add 40%, and move-in/out services add 20%. See our{" "}
        <Link href="/guides/how-much-does-house-cleaning-cost-winter-haven" className="font-medium text-[#0f766e] hover:underline">
          full Winter Haven price guide
        </Link>{" "}
        or use the online quote tool for an instant estimate.
      </>
    ),
    schemaText:
      "Standard residential cleaning starts at $99 for a studio and scales by bedroom count ($119–$199). Deep cleans add 40%, and move-in/out services add 20%. See our full Winter Haven price guide or use the online quote tool for an instant estimate.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Not necessarily. Many Winter Haven clients provide entry instructions for recurring service. For first-time visits, we recommend being available to walk through priorities and access points.",
  },
  {
    q: "What areas of Winter Haven do you serve?",
    a: "We cover all of Winter Haven including Downtown, the Chain of Lakes, Cypress Gardens area, Florence Villa, Inwood, and Eagle Lake — plus nearby Auburndale, Haines City, and Lake Alfred.",
  },
  {
    q: "Is payment required upfront?",
    a: "No. Book with zero upfront payment. Your final total is due after the cleaning is complete and you are satisfied with the results.",
  },
  {
    q: "Can I request eco-friendly cleaning products?",
    a: "Yes. Let us know when booking and we will use green, low-odor products suitable for children, pets, and allergy-sensitive households.",
  },
];

export default function HomeFAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: "schemaText" in f && f.schemaText ? f.schemaText : (f.a as string),
      },
    })),
  };

  return (
    <section id="faq" className="bg-slate-50 py-20 sm:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="section-eyebrow">Questions</p>
          <h2 className="section-title mt-2">Frequently Asked Questions</h2>
        </div>
        <div className="mt-10 rounded-xl border border-slate-200 bg-white px-6">
          {faqs.map((f) => (
            <Accordion key={f.q} title={f.q}>{f.a}</Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
