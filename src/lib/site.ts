import { formatPhoneDisplay, formatPhoneTel } from "./phone";

const rawPhone = process.env.NEXT_PUBLIC_PHONE ?? "(863) 000-0000";

export const site = {
  name: "Cleaning Winter Haven",
  shortName: "Cleaning Winter Haven",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleaningwinterhaven.com",
  phone: formatPhoneDisplay(rawPhone),
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@cleaningwinterhaven.com",
  get phoneTel() {
    return formatPhoneTel(rawPhone);
  },
  address: {
    locality: "Winter Haven",
    region: "FL",
    postalCode: "33880",
    country: "US",
  },
  geo: { latitude: 28.0222, longitude: -81.7329 },
  hours: "Mon–Sat 8:00 AM – 6:00 PM",
  hoursSchema: { opens: "08:00", closes: "18:00" },
  bookingSlug: "winter-haven",
  areaServed: [
    "Winter Haven",
    "Florence Villa",
    "Eagle Lake",
    "Inwood",
    "Cypress Gardens",
    "Haines City",
    "Auburndale",
    "Lake Alfred",
  ],
  neighborhoods: [
    { name: "Downtown Winter Haven", desc: "Historic district homes, condos, and storefronts along Central Avenue and the Chain of Lakes." },
    { name: "Chain of Lakes", desc: "Lakefront properties and vacation rentals that need reliable turnover and deep cleaning." },
    { name: "Cypress Gardens Area", desc: "Family neighborhoods near LEGOLAND with busy households and seasonal guests." },
    { name: "Florence Villa", desc: "Residential streets and rental properties throughout south Winter Haven." },
    { name: "Eagle Lake", desc: "Quiet lake community just west of Winter Haven with homes and small businesses." },
    { name: "Inwood", desc: "Established neighborhoods with recurring residential cleaning demand." },
  ],
} as const;

export const SERVICE_LINKS = [
  { href: "/residential-cleaning", label: "Residential Cleaning", icon: "home" as const },
  { href: "/house-cleaning", label: "House Cleaning", icon: "sparkles" as const },
  { href: "/move-out-cleaning", label: "Move Out Cleaning", icon: "package" as const },
  { href: "/move-in-cleaning", label: "Move In Cleaning", icon: "key" as const },
  { href: "/commercial-cleaning", label: "Commercial Cleaning", icon: "building" as const },
  { href: "/post-construction-cleaning", label: "Post-Construction", icon: "hammer" as const },
];
