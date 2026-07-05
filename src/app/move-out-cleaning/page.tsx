import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import MoveOutCleaningContent from "@/components/content/MoveOutCleaningContent";
import { BreadcrumbJsonLd, FAQSection, ServiceCTA } from "@/components/ServicePageParts";
import { site } from "@/lib/site";

export const metadata = {
  title: "Move Out Cleaning in Winter Haven",
  description: "Move-out cleaning in Winter Haven, FL. Vacancy-ready cleaning to help secure your security deposit. Landlord checklist coverage.",
  alternates: { canonical: "/move-out-cleaning" },
  keywords: ["move out cleaning winter haven", "end of lease cleaning fl", "vacate cleaning polk county", "security deposit cleaning"],
};

const checklist: { icon: IconName; text: string }[] = [
  { icon: "check", text: "Oven & refrigerator interiors (add-on available)" },
  { icon: "check", text: "Bathroom grout, fixtures & mirror polishing" },
  { icon: "check", text: "Kitchen stovetop, hood & backsplash degreasing" },
  { icon: "check", text: "Inside cabinets, closets & drawers" },
  { icon: "check", text: "Baseboards, door frames & light fixtures" },
  { icon: "check", text: "All floors vacuumed, mopped & stain-treated" },
];

const faqs = [
  { q: "Will this help me get my deposit back?", a: "Our move-out cleans address the items landlords most commonly flag during final walkthroughs. Provide your checklist and we prioritize those areas." },
  { q: "When should I schedule move-out cleaning?", a: "After furniture is removed but before the final inspection. We offer flexible scheduling including evenings and Saturdays." },
  { q: "Do you work with property management companies?", a: "Yes. We clean rentals across Winter Haven for individual landlords and property managers throughout Polk County." },
  { q: "Is move-out cleaning more expensive?", a: "Move-out level adds 20% to the base residential price. Interior appliance cleaning is available as add-ons." },
];

export default function MoveOutCleaningPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8">
      <ServiceJsonLd name="Move Out Cleaning Services" description="Vacancy-ready move-out cleaning in Winter Haven, FL." url={`${site.url}/move-out-cleaning`} />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Move Out Cleaning", path: "/move-out-cleaning" }]} />

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <header>
            <p className="section-eyebrow">Winter Haven, FL</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Move Out Cleaning</h1>
            <p className="mt-4 text-lg text-slate-600">
              Vacancy-ready cleaning designed to protect your security deposit and impress landlords during final walkthroughs.
            </p>
            <Link href="/#booking" className="btn-primary mt-6 inline-flex">Get a fast quote</Link>
          </header>

          <div className="mt-10">
            <MoveOutCleaningContent />
          </div>
        </div>

        <div>
          <div className="card-accent sticky top-24 p-6">
            <div className="flex items-center gap-3">
              <Icon name="shield" className="h-8 w-8 text-[#0f766e]" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">Landlord checklist coverage</h2>
                <p className="text-sm text-slate-600">We address what inspectors look for</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-sm text-slate-700">
                  <Icon name={item.icon} className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]" />
                  {item.text}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-[#f59e0b]/10 p-4">
              <p className="text-sm font-semibold text-slate-900">Pro tip</p>
              <p className="mt-1 text-sm text-slate-600">Forward your landlord&apos;s move-out checklist when booking — we&apos;ll prioritize every item.</p>
            </div>
            <Link href="/#booking" className="btn-primary mt-6 w-full text-center">Book move-out clean</Link>
          </div>
        </div>
      </div>

      <FAQSection faqs={faqs} />
      <ServiceCTA title="Protect your deposit — book today" />
    </main>
  );
}
