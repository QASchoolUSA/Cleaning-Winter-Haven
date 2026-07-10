import Image from "next/image";
import Link from "next/link";
import BookingWidget from "./BookingWidget";

const TRUST_ITEMS = [
  "Licensed & Insured",
  "Transparent Pricing",
  "Local Winter Haven Team",
];

const HERO_IMAGE = "/images/services/service-house-cleaning.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Freshly cleaned Winter Haven living room with lake light through large windows"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center image-reveal"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="max-w-xl fade-up lg:col-span-2 lg:pt-4">
            <p className="section-eyebrow">Winter Haven, FL · Chain of Lakes</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3rem] lg:leading-[1.1]">
              Winter Haven&apos;s Trusted Cleaning Professionals
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              From lakefront homes to downtown offices, <strong className="font-semibold text-slate-800">Cleaning Winter Haven</strong> delivers spotless results with upfront pricing and flexible scheduling across Polk County.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0f766e]/10 text-[#0f766e]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#booking" className="btn-primary">Get instant quote</Link>
              <Link href="/pricing" className="btn-secondary">View pricing</Link>
            </div>
          </div>

          <div id="booking" className="lg:col-span-3 lg:sticky lg:top-24">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
