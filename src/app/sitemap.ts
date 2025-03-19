import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sumanprotfolio.vercel.app/";
  const pages = [
    "#",
    "#about",
    "#skillsection",
    "#service",
    "#portfolio",
    "#contact",
  ];

  return pages.map((page) => ({
    url: `${baseUrl}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: page === "" ? 1.0 : 0.8,
  }));
}
