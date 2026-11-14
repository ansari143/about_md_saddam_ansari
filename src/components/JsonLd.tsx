import { education, expertise, githubUrl, profile, siteDescription, siteUrl } from "@/data/site";

export function JsonLd({ hasPhoto }: { hasPhoto: boolean }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.displayName,
    jobTitle: profile.title,
    description: siteDescription,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    ...(hasPhoto ? { image: `${siteUrl}${profile.photoPath}` } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa",
      addressRegion: "FL",
      addressCountry: "US",
    },
    nationality: { "@type": "Country", name: "Canada" },
    worksFor: { "@type": "Organization", name: "Tata Consultancy Services" },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: education.degree,
    },
    knowsAbout: expertise.flatMap((g) => g.skills).slice(0, 40),
    sameAs: [profile.linkedin, ...(githubUrl ? [githubUrl] : [])],
  };

  return (
    <script
      type="application/ld+json"
      // Content is static and built from our own data file.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
