import { NextApiRequest, NextApiResponse } from "next";

const Sitemap = (req: NextApiRequest, res: NextApiResponse) => {
  const baseUrl = "https://sumanprotfolio.vercel.app";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${baseUrl}/about</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${baseUrl}/portfolio</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${baseUrl}/contact</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.7</priority>
    </url>
  </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
};

export default Sitemap;
