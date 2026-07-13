export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Suman Patra",
  description:
    "Learn more about Suman Patra, a Frontend Developer specializing in Next.js, React, and modern web technologies.",
};

export const skillsSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalCredential",
  name: "Web Development Skills",
  competencyRequired: [
    "C++ for DSA",
    "JavaScript for Development",
    "TypeScript for Web",
    "JavaScript (OOPs) Concepts",
  ],
  credentialCategory: "Software Development",
  provider: {
    "@type": "Person",
    name: "Suman Patra",
  },
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development & Design Services",
  provider: {
    "@type": "Person",
    name: "Suman Patra",
  },
  serviceType: "Frontend Development, UI/UX Design, SEO Optimization",
  areaServed: "Global",
  offers: {
    "@type": "Offer",
    price: "Custom Pricing",
    priceCurrency: "USD",
  },
};

export const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Suman Patra",
  description:
    "Get in touch with Suman Patra for collaboration, project inquiries, or front-end development services.",
};
