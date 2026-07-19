import { site } from "@/lib/site";

/**
 * Organization + WebSite + ProfessionalService entity graph.
 * Omits phone/sameAs/streetAddress until verified values exist.
 */
export default function JsonLd() {
  const orgId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const serviceId = `${site.url}/#professionalservice`;

  const postalAddress = {
    "@type": "PostalAddress" as const,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        legalName: site.name,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/logo.svg`,
          width: 200,
          height: 44,
        },
        image: `${site.url}/images/services/service-house-cleaning.jpg`,
        email: site.email,
        ...(site.phoneTel ? { telephone: site.phoneTel } : {}),
        address: postalAddress,
        ...(site.sameAs.length > 0 ? { sameAs: [...site.sameAs] } : {}),
        description: site.serviceAreaPolicy,
        knowsAbout: [
          "House cleaning",
          "Residential cleaning",
          "Apartment cleaning",
          "Move-out cleaning",
          "Move-in cleaning",
          "Turnover cleaning",
          "Airbnb cleaning",
          "Commercial cleaning",
          "Office cleaning",
          "Restaurant cleaning",
          "Post-construction cleaning",
          "Winter Haven FL",
          "Chain of Lakes",
          "Polk County cleaning services",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        alternateName: ["cleaningwinterhaven.com", "Cleaning Winter Haven FL"],
        url: site.url,
        publisher: { "@id": orgId },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: site.name,
        description:
          "Professional house cleaning, apartment cleaning, move-out and move-in cleaning, Airbnb turnover, commercial office and restaurant cleaning, and post-construction cleaning in Winter Haven, FL and the Chain of Lakes.",
        url: site.url,
        image: `${site.url}/images/services/service-house-cleaning.jpg`,
        logo: `${site.url}/logo.svg`,
        ...(site.phoneTel ? { telephone: site.phoneTel } : {}),
        email: site.email,
        priceRange: "$$",
        currenciesAccepted: "USD",
        paymentAccepted: "Cash, Credit Card, Debit Card",
        parentOrganization: { "@id": orgId },
        address: postalAddress,
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        areaServed: site.areaServed.map((name) => ({
          "@type": "City",
          name,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Polk County",
          },
        })),
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: site.hoursSchema.opens,
          closes: site.hoursSchema.closes,
        },
        ...(site.sameAs.length > 0 ? { sameAs: [...site.sameAs] } : {}),
        about: [
          { "@type": "Thing", name: "Cleaning Services in Winter Haven, FL" },
          { "@type": "Service", name: "House Cleaning", serviceType: "Residential house cleaning" },
          { "@type": "Service", name: "Residential Cleaning", serviceType: "Recurring home cleaning" },
          { "@type": "Service", name: "Move-Out Cleaning", serviceType: "Vacancy and deposit-protect cleaning" },
          { "@type": "Service", name: "Airbnb Cleaning", serviceType: "Short-term rental turnover cleaning" },
          { "@type": "Service", name: "Commercial Cleaning", serviceType: "Office and business janitorial" },
          { "@type": "Service", name: "Post-Construction Cleaning", serviceType: "Construction dust and debris cleanup" },
        ],
        mentions: [
          { "@type": "Place", name: "Winter Haven", address: { "@type": "PostalAddress", addressLocality: "Winter Haven", addressRegion: "FL", addressCountry: "US" } },
          { "@type": "Place", name: "Chain of Lakes" },
          { "@type": "Place", name: "Cypress Gardens" },
          { "@type": "Place", name: "Florence Villa" },
          { "@type": "Place", name: "Eagle Lake" },
          { "@type": "Place", name: "Inwood" },
          { "@type": "Place", name: "Auburndale" },
          { "@type": "Place", name: "Haines City" },
          { "@type": "Place", name: "Lake Alfred" },
          { "@type": "AdministrativeArea", name: "Polk County" },
          { "@type": "Thing", name: "Apartment Cleaning" },
          { "@type": "Thing", name: "Turnover Cleaning" },
          { "@type": "Thing", name: "Office Cleaning" },
          { "@type": "Thing", name: "Restaurant Cleaning" },
          { "@type": "Thing", name: "Cafe Cleaning" },
          { "@type": "Audience", audienceType: "Homeowners" },
          { "@type": "Audience", audienceType: "Apartment Owners" },
          { "@type": "Audience", audienceType: "Property Managers" },
          { "@type": "Audience", audienceType: "Office Owners" },
          { "@type": "Audience", audienceType: "Restaurant and Cafe Operators" },
          { "@type": "Audience", audienceType: "Airbnb Hosts" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cleaning Winter Haven Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "House Cleaning", url: `${site.url}/house-cleaning` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Cleaning", url: `${site.url}/residential-cleaning` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-Out Cleaning", url: `${site.url}/move-out-cleaning` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In Cleaning", url: `${site.url}/move-in-cleaning` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Cleaning", url: `${site.url}/commercial-cleaning` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Post-Construction Cleaning", url: `${site.url}/post-construction-cleaning` } },
          ],
        },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
