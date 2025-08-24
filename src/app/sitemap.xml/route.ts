import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // adjust import
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  const productsSnap = await getDocs(collection(db, "products"));

  const urls = productsSnap.docs.map((doc) => {
    const data = doc.data();
    return `
      <url>
        <loc>https://www.velanoshop.store/products/${doc.id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
    `;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.velanoshop.store/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${urls.join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
