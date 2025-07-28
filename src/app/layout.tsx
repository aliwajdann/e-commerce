import type { Metadata } from "next";
import "./globals.css";
// import Navigation from "@/components/Navigation";
import NewHeader from "@/components/NewHeader";
// import VelanoHeader from "./VelanoHeader";
import { Providers } from "@/app/providers";
// import {Inter} from "next/font/google";
// import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
// import Head from 'next/head';
import { Lexend_Deca } from 'next/font/google'
import LevanoFooter from "./LevanoFooter";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LoadingOverlayProvider } from '@/components/LoadingOverlay';




// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
   
// const montserrat = Inter({
//   subsets: ["latin"],
//   variable: "--font-montserrat",
// });

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // you can choose the weights you want
  variable: '--font-lexend-deca',
})

export const metadata: Metadata = {
  title: "Velano",
  description: "Minimal, everyday essentials with a clean aesthetic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      // className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-light dark:bg-dark transition-colors duration-500` 
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={` ${lexendDeca.variable} antialiased min-h-screen transition-colors duration-500 className='bg-[#d9d9d9]'` }
      >
        <Providers>
        {/* <Navigation /> */}
        <NewHeader />
        {/* <VelanoHeader /> */}
        <LoadingOverlayProvider>
          {children}
          </LoadingOverlayProvider>
          <SpeedInsights />
        {/* <Footer /> */}
        <LevanoFooter />
          </Providers>
      </body>
    </html>
          </ClerkProvider>
  );
}
