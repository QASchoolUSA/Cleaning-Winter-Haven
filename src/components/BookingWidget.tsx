"use client";
import { useMemo, useState } from "react";
import { computeQuote, type ServiceType } from "@/lib/pricing";
import { formatPhoneInput, phoneDigits } from "@/lib/phone";
import { site } from "@/lib/site";

type SizeOption = { key: string; label: string };

const SIZE_OPTIONS: Record<ServiceType, SizeOption[]> = {
  residential: [
    { key: "studio", label: "Studio" },
    { key: "1bed", label: "1 Bedroom" },
    { key: "2bed", label: "2 Bedroom" },
    { key: "3bed", label: "3 Bedroom" },
    { key: "4plus", label: "4+ Bedroom" },
  ],
  commercial: [
    { key: "small", label: "Small (≤1000 sqft)" },
    { key: "medium", label: "Medium (1000–3000 sqft)" },
    { key: "large", label: "Large (3000+ sqft)" },
  ],
  "post-construction": [
    { key: "under1k", label: "Under 1000 sqft" },
    { key: "1k-2k", label: "1000–2000 sqft" },
    { key: "over2k", label: "2000+ sqft" },
  ],
};

const SERVICE_OPTIONS: { value: ServiceType; label: string; desc: string }[] = [
  { value: "residential", label: "Residential", desc: "Homes & apartments" },
  { value: "commercial", label: "Commercial", desc: "Offices & retail" },
  { value: "post-construction", label: "Post‑Construction", desc: "Dust & debris cleanup" },
];

const ADDON_LABELS: Record<string, string> = {
  fridge: "Inside fridge",
  oven: "Inside oven",
  windows: "Interior windows",
  cabinets: "Inside cabinets",
  baseboards: "Baseboards",
};

type LevelType = "standard" | "deep" | "move" | "post";
const STEPS = ["Service", "Options", "Schedule", "Contact", "Review"] as const;
type ContactErrors = Partial<Record<"name" | "email" | "phone" | "address", string>>;

function validateContact(name: string, email: string, phone: string, address: string): ContactErrors {
  const errors: ContactErrors = {};
  if (!name.trim()) errors.name = "Please enter your full name.";
  if (!email.trim()) {
    errors.email = "Email is required so we can send your quote and confirmation.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!phone.trim()) {
    errors.phone = "Phone is required so we can confirm your appointment.";
  } else if (phoneDigits(phone).replace(/^1/, "").length < 10) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (!address.trim()) errors.address = "Service address is required so our team knows where to go.";
  return errors;
}

export default function BookingWidget() {
  const [serviceType, setServiceType] = useState<ServiceType>("residential");
  const [sizeKey, setSizeKey] = useState<string>("2bed");
  const [level, setLevel] = useState<LevelType>("standard");
  const [addOns, setAddOns] = useState({ fridge: false, oven: false, windows: false, cabinets: false, baseboards: false });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState(0);
  const [booked, setBooked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});

  const effectiveLevel: LevelType = useMemo(() => {
    if (serviceType === "post-construction") return "post";
    if (level === "post") return "standard";
    return level;
  }, [serviceType, level]);

  const quote = useMemo(
    () => computeQuote({ serviceType, sizeKey, level: effectiveLevel, addOns }),
    [serviceType, sizeKey, effectiveLevel, addOns]
  );

  const sizeOptions = SIZE_OPTIONS[serviceType];
  const sizeLabel = sizeOptions.find((o) => o.key === sizeKey)?.label ?? sizeKey;
  const serviceLabel = SERVICE_OPTIONS.find((o) => o.value === serviceType)?.label ?? serviceType;
  const levelLabel = effectiveLevel === "move" ? "Move‑in/out" : effectiveLevel.charAt(0).toUpperCase() + effectiveLevel.slice(1);
  const selectedAddOns = Object.entries(addOns).filter(([, v]) => v).map(([k]) => ADDON_LABELS[k] ?? k);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Cleaning Booking: ${serviceType} • ${sizeKey} • ${date || "TBD"}`);
    const body = encodeURIComponent(
      `BOOKING REQUEST (Pay upon completion)\n\n` +
        `Service: ${serviceType}\nSize: ${sizeKey}\nLevel: ${effectiveLevel}\n` +
        `Add-ons: ${selectedAddOns.join(", ") || "None"}\n\n` +
        `Preferred Date/Time: ${date || "TBD"} ${time || ""}\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\n` +
        `Estimated Price: $${quote.price} (range $${quote.range.low}–$${quote.range.high})\n` +
        `Payment: Due after cleaning is complete\n\nNotes:`
    );
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [serviceType, sizeKey, effectiveLevel, selectedAddOns, date, time, name, email, phone, address, quote]);

  function next() {
    if (step === 3) {
      const errors = validateContact(name, email, phone, address);
      if (Object.keys(errors).length > 0) {
        setContactErrors(errors);
        return;
      }
      setContactErrors({});
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleBook() {
    const errors = validateContact(name, email, phone, address);
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      setStep(3);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          email,
          phone,
          address,
          service_type: `${serviceLabel} — ${levelLabel} (${sizeLabel})`,
          preferred_date: date || undefined,
          preferred_time: time || undefined,
          notes: [
            `Size: ${sizeLabel}`,
            `Level: ${levelLabel}`,
            `Add-ons: ${selectedAddOns.join(", ") || "None"}`,
            `Estimated price: $${quote.price} (range $${quote.range.low}–$${quote.range.high})`,
            "Payment: Due after cleaning is complete",
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Booking failed");
      }

      setBooked(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Booking failed. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  if (booked) {
    return (
      <div className="card mx-auto w-full max-w-lg overflow-hidden p-0">
        <div className="bg-gradient-to-br from-[#0f766e] to-[#115e59] px-6 py-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Booking request sent!</h2>
          <p className="mt-2 text-sm text-white/90">We&apos;ll confirm your appointment shortly. Check your email for confirmation.</p>
        </div>
        <div className="space-y-4 p-6">
          <div className="rounded-lg bg-[#0f766e]/10 p-4">
            <p className="text-sm font-medium text-slate-900">Pay when we&apos;re done</p>
            <p className="mt-1 text-sm text-slate-600">
              No upfront payment required. Your estimated total of <strong>${quote.price}</strong> is due after your cleaning is complete.
            </p>
          </div>
          <p className="text-sm text-slate-600">
            Questions? Call us at{" "}
            <a href={`tel:${site.phoneTel}`} className="font-semibold text-[#0f766e] hover:underline">{site.phone}</a>.
          </p>
          <button type="button" className="btn-ghost w-full" onClick={() => { setBooked(false); setStep(0); setSubmitError(null); }}>
            Book another cleaning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card mx-auto w-full max-w-lg overflow-hidden p-0 shadow-lg shadow-[#0f766e]/5">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#0f766e]/10 to-white px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Book your cleaning</h2>
            <p className="mt-0.5 text-xs text-slate-500">Instant quote · No payment now</p>
          </div>
          <div className="shrink-0 rounded-lg bg-white px-3 py-2 text-right shadow-sm ring-1 ring-slate-100">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Estimate</p>
            <p className="text-lg font-bold text-[#0f766e]">${quote.price}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-5">
        <div className="flex items-center justify-between gap-1">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${i <= step ? "bg-[#0f766e] text-white" : "bg-slate-100 text-slate-400"}`}>
                  {i < step ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  ) : i + 1}
                </div>
                <span className={`hidden text-[10px] font-medium sm:block ${i <= step ? "text-[#0f766e]" : "text-slate-400"}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`mx-1 mb-4 h-0.5 flex-1 rounded-full sm:mb-5 ${i < step ? "bg-[#0f766e]" : "bg-slate-100"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-2 pt-4">
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">What type of cleaning?</p>
              <div className="grid gap-2">
                {SERVICE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setServiceType(opt.value)}
                    className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${serviceType === opt.value ? "border-[#0f766e] bg-[#0f766e]/5 ring-1 ring-[#0f766e]/30" : "border-slate-200 hover:border-[#14b8a6]/50 hover:bg-slate-50"}`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </div>
                    <div className={`h-4 w-4 shrink-0 rounded-full border-2 ${serviceType === opt.value ? "border-[#0f766e] bg-[#0f766e]" : "border-slate-300"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">Property size</p>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => setSizeKey(o.key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${sizeKey === o.key ? "bg-[#0f766e] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-[#0f766e]/10"}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Cleaning level</label>
              <select className="select-field" value={effectiveLevel} onChange={(e) => setLevel(e.target.value as LevelType)} disabled={serviceType === "post-construction"}>
                <option value="standard">Standard</option>
                <option value="deep">Deep clean</option>
                <option value="move">Move‑in / move‑out</option>
              </select>
            </div>
            <div>
              <p className="mb-3 text-sm font-medium text-slate-700">Optional add‑ons</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(addOns).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAddOns({ ...addOns, [key]: !val })}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${val ? "bg-[#0f766e] text-white" : "bg-slate-100 text-slate-600 hover:bg-[#0f766e]/10"}`}
                  >
                    {ADDON_LABELS[key] ?? key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Preferred date</span>
              <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Preferred time</span>
              <input type="time" className="input-field" value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
            <p className="sm:col-span-2 text-xs text-slate-500">We&apos;ll confirm availability and send a reminder before your appointment.</p>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="sm:col-span-2 text-xs text-slate-500">Fields marked with <span className="text-[#0f766e]">*</span> are required.</p>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-700">Full name <span className="text-[#0f766e]">*</span></span>
              <input type="text" className={`input-field ${contactErrors.name ? "ring-2 ring-red-400" : ""}`} value={name} onChange={(e) => { setName(e.target.value); setContactErrors((p) => ({ ...p, name: undefined })); }} placeholder="Jane Smith" required autoComplete="name" />
              {contactErrors.name && <p className="mt-1 text-xs text-red-600">{contactErrors.name}</p>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email <span className="text-[#0f766e]">*</span></span>
              <input type="email" className={`input-field ${contactErrors.email ? "ring-2 ring-red-400" : ""}`} value={email} onChange={(e) => { setEmail(e.target.value); setContactErrors((p) => ({ ...p, email: undefined })); }} placeholder="you@email.com" required autoComplete="email" />
              {contactErrors.email && <p className="mt-1 text-xs text-red-600">{contactErrors.email}</p>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Phone <span className="text-[#0f766e]">*</span></span>
              <input
                type="tel"
                className={`input-field ${contactErrors.phone ? "ring-2 ring-red-400" : ""}`}
                value={phone}
                onChange={(e) => {
                  setPhone(formatPhoneInput(e.target.value));
                  setContactErrors((p) => ({ ...p, phone: undefined }));
                }}
                placeholder="(863) 555-0123"
                required
                autoComplete="tel"
              />
              {contactErrors.phone && <p className="mt-1 text-xs text-red-600">{contactErrors.phone}</p>}
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-slate-700">Service address <span className="text-[#0f766e]">*</span></span>
              <input type="text" className={`input-field ${contactErrors.address ? "ring-2 ring-red-400" : ""}`} value={address} onChange={(e) => { setAddress(e.target.value); setContactErrors((p) => ({ ...p, address: undefined })); }} placeholder="123 Lake Howard Dr, Winter Haven, FL" required autoComplete="street-address" />
              {contactErrors.address && <p className="mt-1 text-xs text-red-600">{contactErrors.address}</p>}
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-4 text-sm">
              <dl className="space-y-2.5">
                <div className="flex justify-between gap-4"><dt className="text-slate-500">Service</dt><dd className="font-medium text-slate-900">{serviceLabel}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500">Size</dt><dd className="font-medium text-slate-900">{sizeLabel}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500">Level</dt><dd className="font-medium text-slate-900">{levelLabel}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500">Add‑ons</dt><dd className="font-medium text-slate-900">{selectedAddOns.join(", ") || "None"}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500">When</dt><dd className="font-medium text-slate-900">{date || "Flexible"} {time && `at ${time}`}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500">Contact</dt><dd className="text-right font-medium text-slate-900">{name}<br /><span className="text-xs font-normal text-slate-500">{email}<br />{phone}</span></dd></div>
                <div className="flex justify-between gap-4"><dt className="text-slate-500">Address</dt><dd className="text-right font-medium text-slate-900">{address}</dd></div>
              </dl>
            </div>
            <div className="rounded-lg bg-[#0f766e]/10 p-4">
              <p className="text-sm font-semibold text-slate-900">Estimated total: ${quote.price}</p>
              <p className="mt-0.5 text-xs text-slate-600">Range ${quote.range.low}–${quote.range.high} · Pay after completion</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
        <button type="button" className="btn-ghost" onClick={prev} disabled={step === 0}>Back</button>
        {submitError && <p className="absolute left-6 right-6 bottom-20 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{submitError}</p>}
        {step < STEPS.length - 1 ? (
          <button type="button" className="btn-primary px-5 py-2.5" onClick={next}>Continue</button>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <button type="button" className="btn-ghost px-4 py-2.5 text-xs sm:text-sm" disabled={submitting} onClick={() => { const errors = validateContact(name, email, phone, address); if (Object.keys(errors).length > 0) { setContactErrors(errors); setStep(3); return; } window.location.href = mailto; }}>Email quote</button>
            <button type="button" className="btn-primary px-4 py-2.5 text-xs sm:text-sm disabled:opacity-60" onClick={handleBook} disabled={submitting}>{submitting ? "Sending…" : "Book cleaning"}</button>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3">
        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          No payment required to book · Pay when your clean is complete
        </p>
      </div>
    </div>
  );
}
