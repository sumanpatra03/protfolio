import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suman Patra | Professional Frontend Engineer & React Developer",
  description:
    "Portfolio of Suman Patra, a professional Frontend Engineer specializing in Next.js, React.js, TypeScript, and Tailwind CSS. Crafting interactive and high-performance user interfaces.",
  keywords: [
    "Suman Patra",
    "Suman Patra Portfolio",
    "Frontend Engineer",
    "React Developer",
    "Next.js Specialist",
    "TypeScript Developer",
    "UI/UX Web Developer",
    "Creative Web Interfaces",
    "Portfolio Showcase",
  ].join(", "),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Suman Patra | Professional Frontend Engineer & React Specialist",
    description:
      "Discover modern web experiences, advanced React interfaces, and pixel-perfect applications crafted by Suman Patra.",
    url: "https://sumanprotfolio.vercel.app/",
    siteName: "Suman Patra Portfolio",
    images: [
      {
        url: "/suman1.png",
        width: 1200,
        height: 630,
        alt: "Suman Patra | Frontend Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sumanpatra03",
    title: "Suman Patra | Frontend Engineer Portfolio",
    description:
      "Explore high-performance React web applications and interactive frontend features built by Suman Patra.",
    images: ["/suman1.png"],
  },
  alternates: {
    canonical: "https://sumanprotfolio.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Suman Patra",
              "jobTitle": "Frontend Developer",
              "url": "https://sumanprotfolio.vercel.app/",
              "description": "Frontend Developer specializing in JavaScript, React.js, Next.js, and modern web technologies.",
              "image": "/suman1.png",
              "sameAs": [
                "https://github.com/sumanpatra03",
                "https://www.linkedin.com/in/sumanpa1/",
              ],
            }),
          }}
        />

        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://sumanprotfolio.vercel.app/#",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About Me",
                  "item": "https://sumanprotfolio.vercel.app/#about",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Skills",
                  "item": "https://sumanprotfolio.vercel.app/#skillsection",
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Portfolio",
                  "item": "https://sumanprotfolio.vercel.app/#portfolio",
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Services",
                  "item": "https://sumanprotfolio.vercel.app/#service",
                },
                {
                  "@type": "ListItem",
                  "position": 6,
                  "name": "Contact-Us",
                  "item": "https://sumanprotfolio.vercel.app/#contact-us",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
