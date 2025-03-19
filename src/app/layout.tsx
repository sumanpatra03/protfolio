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
  title: "Suman's Portfolio",
  description:
    "Explore Suman Patra's portfolio showcasing front-end development projects, React apps, and UI/UX designs. Specializing in Next.js, TypeScript, Bootstrap, and Tailwind CSS.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "UI/UX Design",
    "Web Development",
    "Tailwind CSS",
    "Bootstrap",
    "Portfolio",
  ].join(", "),
  openGraph: {
    title: "Suman Patra | Frontend Developer & React Expert",
    description:
      "Discover modern web designs, creative UI/UX projects, and impactful web apps by Suman Patra.",
    url: "https://sumanprotfolio.vercel.app/",
    siteName: "Suman's Portfolio",
    images: [
      {
        url: "/suman1.png",
        width: 1200,
        height: 630,
        alt: "Suman Patra's Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sumanpatra03",
    title: "Suman's Portfolio | Frontend Developer",
    description:
      "Explore front-end development projects, React apps, and UI/UX designs by Suman Patra.",
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
