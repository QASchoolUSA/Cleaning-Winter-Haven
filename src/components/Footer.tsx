import Link from "next/link";
import Image from "next/image";
import { site, SERVICE_LINKS } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo.svg" alt={site.name} width={200} height={44} />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Professional residential, commercial, and post-construction cleaning throughout Winter Haven and the Chain of Lakes region.
            </p>
            <p className="mt-4 text-xs font-medium text-slate-500">Licensed & Insured · Satisfaction Guaranteed</p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href={`mailto:${site.email}`} className="font-medium text-[#0f766e] hover:underline">{site.email}</a></li>
              <li><a href={`tel:${site.phoneTel}`} className="font-medium text-[#0f766e] hover:underline">{site.phone}</a></li>
              <li>Hours: {site.hours}</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-slate-600 transition hover:text-[#0f766e]">{link.label}</Link></li>
              ))}
              <li><Link href="/pricing" className="text-slate-600 transition hover:text-[#0f766e]">Transparent Pricing</Link></li>
              <li><Link href="/guides/how-much-does-house-cleaning-cost-winter-haven" className="text-slate-600 transition hover:text-[#0f766e]">House Cleaning Cost Guide</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Service Areas</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {site.areaServed.slice(0, 5).join(", ")}, and nearby Polk County communities.
            </p>
            <Link href="/service-areas" className="mt-3 inline-block text-sm font-semibold text-[#0f766e] hover:underline">View all areas →</Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <Link href="#booking" className="text-xs font-semibold text-[#0f766e] hover:underline">Book a cleaning →</Link>
        </div>
      </div>
    </footer>
  );
}
