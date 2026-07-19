import { site } from "@/lib/site";

export default function ServiceJsonLd({
  name,
  description,
  url,
  type = "Service",
  image = `${site.url}/images/services/service-house-cleaning.jpg`,
}: {
  name: string;
  description: string;
  url: string;
  type?: string;
  image?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    image,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      image,
      ...(site.phoneTel ? { telephone: site.phoneTel } : {}),
      email: site.email,
      address: {
        "@type": "PostalAddress",
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
