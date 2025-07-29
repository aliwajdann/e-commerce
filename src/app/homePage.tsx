'use client';
import ProductsSection from "@/components/products";
import CategorySection from "@/components/CategorySection";
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const dynamicTexts = [
    "Where Style Meets Soul",
    "Crafted for Confidence", 
    "Your Beauty, Amplified",
    "Elegance Redefined"
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    // Text rotation
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <>
      <main className="pt-20 md:pt-2 relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#2D1B1E] via-[#3D2B2E] to-[#1A0F11]">
        {/* Simplified Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Static Floating Orbs - No mouse tracking */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#F5D5D6]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-[#681C1C]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-[#D4A5A6]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-[#F5D5D6]/12 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

          {/* Simple Grid Pattern - Static */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 213, 214, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 213, 214, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />

          {/* Simplified Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-[#681C1C]/10 via-[#F5D5D6]/5 to-[#681C1C]/10 opacity-50"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-5xl">
            {/* Brand Name */}
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative inline-block mb-8">
                <h2 className="text-6xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F5D5D6] via-[#D4A5A6] to-[#F5D5D6]">
                  VELANO
                </h2>
                
                {/* Simple Underline */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#681C1C] to-transparent opacity-80"></div>
              </div>
            </div>

            {/* Dynamic Tagline */}
            <div className={`relative h-20 mb-12 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                {dynamicTexts.map((text, index) => (
                  <h1
                    key={index}
                    className={`absolute text-3xl md:text-5xl font-bold text-white transition-all duration-1000 ${
                      index === currentTextIndex 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-95 translate-y-4'
                    }`}
                  >
                    {text}
                  </h1>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl md:text-2xl mb-16 text-[#F5D5D6]/90 leading-relaxed max-w-3xl mx-auto font-light">
                Discover curated pieces made to elevate your everyday look —
                <span className="text-[#D4A5A6] font-medium"> bold, effortless, and unapologetically you.</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className={`transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link href="/products">
                <button className="group relative px-12 py-5 text-lg font-bold text-white bg-[#681C1C] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#681C1C] to-[#8B2635]"></div>
                  
                  {/* Simplified Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F5D5D6] to-[#D4A5A6] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  {/* Button Text */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#681C1C] flex items-center">
                    Step Into Your Era
                    <svg className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            {/* <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex flex-col items-center">
                <span className="text-[#F5D5D6]/70 text-sm mb-4 font-light tracking-widest">EXPLORE MORE</span>
                <div className="w-6 h-10 border-2 border-[#F5D5D6]/50 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-[#F5D5D6] rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Simple Decorative Elements - Static positions */}
        <div className="absolute top-10 left-10 w-16 h-16 border border-[#F5D5D6]/20 rounded-full opacity-40"></div>
        <div className="absolute top-20 right-20 w-12 h-12 border border-[#681C1C]/20 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 bg-[#F5D5D6]/15 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-6 h-6 bg-[#681C1C]/15 rounded-full"></div>
      </main>
      <CategorySection></CategorySection>
      <ProductsSection></ProductsSection>
    </>
  );
}