import type { Metadata } from "next";
import "./globals.css";
// import Navigation from "@/components/Navigation";
// import NewHeader from "@/components/NewHeader";
import Header from "@/components/Header";
// import VelanoHeader from "./VelanoHeader";
import { Providers } from "@/app/providers";
// import {Inter} from "next/font/google";
// import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs'
// import Head from 'next/head';
// import { Lexend_Deca } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LoadingOverlayProvider } from '@/components/LoadingOverlay';
import Footer from "./LevanoFooter";
// import velano from "./favicon.ico"




// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
   
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// const lexendDeca = Lexend_Deca({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'], // you can choose the weights you want
//   variable: '--font-lexend-deca',
// })

export const metadata: Metadata = {
  title: "Velano",
  description: "Minimal, everyday essentials with a clean aesthetic.",
   icons: {
    icon: "./favicon.ico", 
  },
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
      <body className={` ${montserrat.variable} antialiased min-h-screen transition-colors duration-500 bg-white pt-2 md:pt-16` }
      >
        <Providers>
        {/* <Navigation /> */}
        <Header />
        {/* <VelanoHeader /> */}
        <LoadingOverlayProvider>
          {children}
          </LoadingOverlayProvider>
          <SpeedInsights />
          <Footer />
          </Providers>
      </body>
    </html>
          </ClerkProvider>
  );
}
