import Image from "next/image";
import Link from "next/link";
import { SERVICE_LINKS } from "@/lib/site";

const descriptions: Record<string, string> = {
  "residential-cleaning": "Weekly, bi-weekly, or monthly home maintenance tailored to your schedule.",
  "house-cleaning": "One-time standard or deep cleans for busy households and seasonal refreshes.",
  "move-out-cleaning": "Vacancy-ready cleaning to help protect your security deposit.",
  "move-in-cleaning": "Sanitized, move-in ready spaces before you unpack a single box.",
  "commercial-cleaning": "Professional janitorial service for offices, retail, and shared workspaces.",
  "post-construction-cleaning": "Fine dust removal and detailing after renovations or new builds.",
};

const serviceImages: Record<string, { src: string; alt: string }> = {
  "residential-cleaning": {
    src: "/images/services/service-residential.jpg",
    alt: "Spotless Winter Haven kitchen after residential cleaning",
  },
  "house-cleaning": {
    src: "/images/services/service-house-cleaning.jpg",
    alt: "Bright living room after professional house cleaning",
  },
  "move-out-cleaning": {
    src: "/images/services/service-move-out-vacancy.jpg",
    alt: "Empty apartment ready for landlord walkthrough",
  },
  "move-in-cleaning": {
    src: "/images/services/service-move-in-ready.jpg",
    alt: "Freshly sanitized bedroom ready for move-in day",
  },
  "commercial-cleaning": {
    src: "/images/services/service-commercial-office.jpg",
    alt: "Polished Winter Haven office after commercial cleaning",
  },
  "post-construction-cleaning": {
    src: "/images/services/service-post-construction.jpg",
    alt: "Dust-free renovated kitchen after post-construction cleaning",
  },
};

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-eyebrow">What we offer</p>
            <h2 className="section-title mt-2">Cleaning Services in Winter Haven</h2>
            <p className="section-subtitle">Six specialized services for homes and businesses across the Chain of Lakes.</p>
          </div>
          <Link href="#booking" className="btn-primary hidden shrink-0 sm:inline-flex">Get a quote</Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LINKS.map((s) => {
            const key = s.href.replace("/", "");
            const image = serviceImages[key];
            return (
              <Link key={key} href={s.href} className="card-accent card-hover group flex flex-col overflow-hidden p-0">
                {image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-[#0f766e]">{s.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{descriptions[key] ?? ""}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0f766e]">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-0.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
