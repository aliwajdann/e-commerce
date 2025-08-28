import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['velano-assets.pages.dev'], // add your CDN subdomain
}

  
};

export const config = {
  matcher: ['/admin/:path*'], // 👈 Middleware runs ONLY on /admin routes
};


export default nextConfig;
