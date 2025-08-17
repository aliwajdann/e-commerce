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
      
<link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&family=Dancing+Script:wght@400..700&family=Dosis:wght@200..800&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Metal+Mania&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Ruda:wght@400..900&display=swap"     precedence="default"
 rel="stylesheet">
</link>
      <body className={` ${montserrat.variable} antialiased min-h-screen transition-colors duration-500 bg-white` }
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
