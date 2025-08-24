import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  const baseUrl = "https://www.velanoshop.store";

  // Fetch products
  const productsSnap = await getDocs(collection(db, "products"));
  const productUrls = productsSnap.docs.map((doc) => {
    const data = doc.data();
    const updatedAt =
      data.updatedAt?.toDate().toISOString() ||
      data.createdAt?.toDate().toISOString() ||
      new Date().toISOString();

    return `
      <url>
        <loc>${baseUrl}/products/${doc.id}</loc>
        <lastmod>${updatedAt}</lastmod>
        <priority>0.8</priority>
      </url>
    `;
  });

  // Fetch categories
  const categoriesSnap = await getDocs(collection(db, "categories"));
  const categoryUrls = categoriesSnap.docs.map((doc) => {
    const data = doc.data();
    return `
      <url>
        <loc>${baseUrl}/categories/${data.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.7</priority>
      </url>
    `;
  });

  // Static pages
  const staticUrls = [
    { loc: `${baseUrl}/about`, priority: 0.6 },
    { loc: `${baseUrl}/contact`, priority: 0.6 },
    { loc: `${baseUrl}/shipping`, priority: 0.6 },
    { loc: `${baseUrl}/returns`, priority: 0.6 },
  ].map(
    (page) => `
      <url>
        <loc>${page.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>${page.priority}</priority>
      </url>
    `
  );

  // Assemble sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${staticUrls.join("")}
      ${categoryUrls.join("")}
      ${productUrls.join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
