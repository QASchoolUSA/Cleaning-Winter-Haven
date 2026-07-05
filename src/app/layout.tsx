import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

const heading = Plus_Jakarta_Sans({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Source_Sans_3({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "Cleaning Winter Haven | Professional House & Commercial Cleaning in FL",
    template: `%s | ${site.name}`,
  },
  description:
    "Top-rated cleaning services in Winter Haven, FL. Residential house cleaning, commercial office cleaning, move-in/out cleans, and post-construction cleanup. Transparent pricing and instant online quotes.",
  keywords: [
    "cleaning winter haven",
    "house cleaning winter haven fl",
    "residential cleaning winter haven",
    "commercial cleaning winter haven",
    "maid service winter haven",
    "move out cleaning winter haven",
    "post construction cleaning winter haven",
    "cleaning services polk county",
    "chain of lakes cleaning",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Cleaning Winter Haven | Professional Cleaning Services",
    description: "Expert residential and commercial cleaning in Winter Haven, FL. Book your trusted local cleaners today.",
    images: [{ url: "/icons/android-chrome-512x512.png", width: 512, height: 512, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning Winter Haven | Professional Cleaning Services",
    description: "Expert residential and commercial cleaning in Winter Haven, FL.",
    images: ["/icons/android-chrome-512x512.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
