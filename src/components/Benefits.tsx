import Icon, { type IconName } from "@/components/Icon";

const benefits: { icon: IconName; title: string; desc: string }[] = [
  { icon: "shield", title: "Licensed & Insured", desc: "Every cleaner is background-checked and your property is fully protected." },
  { icon: "dollar", title: "Upfront Pricing", desc: "See your estimate before you book — no surprise fees on arrival." },
  { icon: "leaf", title: "Eco-Friendly Options", desc: "Request green cleaning products for homes with kids, pets, or sensitivities." },
  { icon: "clock", title: "Flexible Scheduling", desc: "Morning, afternoon, and weekend appointments across Winter Haven." },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative overflow-hidden bg-[#0f766e]/5 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,118,110,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Why choose us</p>
          <h2 className="section-title mt-2">The Winter Haven Difference</h2>
          <p className="section-subtitle">Local expertise, transparent quotes, and a team that treats your space like their own.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="card card-hover p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0f766e]/10 text-[#0f766e]">
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
