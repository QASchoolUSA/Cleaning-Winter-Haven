import { site } from "@/lib/site";

export default function ServiceJsonLd({
  name,
  description,
  url,
  type = "Service",
}: {
  name: string;
  description: string;
  url: string;
  type?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      image: `${site.url}/logo.svg`,
      telephone: site.phoneTel,
      address: {
        "@type": "PostalAddress",
        streetAddress: "",
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
    areaServed: site.areaServed.map((city) => ({ "@type": "City", name: city })),
    url,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
