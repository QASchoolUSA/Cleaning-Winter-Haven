import Icon, { type IconName } from "@/components/Icon";

const benefits: { icon: IconName; title: string; desc: string }[] = [
  { icon: "shield", title: "Licensed & Insured", desc: "Background-checked cleaners, and your property is covered while we work." },
  { icon: "dollar", title: "Upfront Pricing", desc: "See the estimate before you book—no surprise fees when we arrive." },
  { icon: "leaf", title: "Eco-Friendly Options", desc: "Ask for greener products if you have kids, pets, or scent sensitivities." },
  { icon: "clock", title: "Flexible Scheduling", desc: "Morning, afternoon, and weekend visits across Winter Haven and nearby lakes." },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative overflow-hidden bg-[var(--brand-wash)] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,118,110,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Why choose us</p>
          <h2 className="section-title mt-2">Why Winter Haven neighbors book us</h2>
          <p className="section-subtitle">Local routes, clear quotes, and a crew that shows up ready for lake humidity and busy households.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="card card-hover p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#00a8bc]/10 text-[#00a8bc]">
                <Icon name={b.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
