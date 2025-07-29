'use client';

import Link from "next/link";
import CategorySection from "@/components/CategorySection";
import ProductsSection from "@/components/products";
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <>
      <main 
        ref={heroRef}
        className="pt-20 md:pt-2 relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#2D1B1E] via-[#3D2B2E] to-[#1A0F11]"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-pulse"
              style={{
                left: `${20 + (i * 8)}%`,
                top: `${10 + (i * 7)}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? '#F5D5D6' : i % 3 === 1 ? '#681C1C' : '#D4A5A6'
                } 0%, transparent 70%)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
              }}
            />
          ))}

          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 213, 214, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 213, 214, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`
            }}
          />

          {/* Animated Waves */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-[#681C1C]/20 via-[#F5D5D6]/10 to-[#681C1C]/20 animate-pulse">
              <div className="wave-animation h-full w-full bg-gradient-to-r from-transparent via-[#F5D5D6]/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-5xl">
            {/* Brand Name with Spectacular Animation */}
            <div className={`transform transition-all duration-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className="relative inline-block mb-8">
                <h2 className="text-6xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F5D5D6] via-[#D4A5A6] to-[#F5D5D6] relative">
                  VELANO
                </h2>
                
                {/* Animated Underline */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#681C1C] to-transparent">
                  <div className="h-full bg-gradient-to-r from-[#F5D5D6] to-[#681C1C] animate-pulse"></div>
                </div>

                {/* Floating Letters Effect */}
                <div className="absolute inset-0 text-6xl md:text-8xl font-black tracking-wider text-[#681C1C]/10 animate-bounce" style={{ animationDelay: '1s' }}>
                  VELANO
                </div>
              </div>
            </div>

            {/* Dynamic Tagline */}
            <div className={`relative h-20 mb-12 transform transition-all duration-2000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
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

            {/* Description with Typewriter Effect */}
            <div className={`transform transition-all duration-2000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <p className="text-xl md:text-2xl mb-16 text-[#F5D5D6]/90 leading-relaxed max-w-3xl mx-auto font-light">
                Discover curated pieces made to elevate your everyday look
                <span className="text-[#D4A5A6] font-medium"> bold, effortless, and unapologetically you.</span>
              </p>
            </div>

            {/* CTA Button with Spectacular Hover Effect */}
            <div className={`transform transition-all duration-2000 delay-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <Link href="/products">
                <button className="group relative px-12 py-5 text-lg font-bold text-white bg-[#681C1C] rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl">
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#681C1C] to-[#8B2635] transition-all duration-500"></div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F5D5D6] to-[#D4A5A6] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                  
                  {/* Button Text */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#681C1C] flex items-center">
                    Step Into Your Era
                    <svg className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>

                  {/* Ripple Effects */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#F5D5D6]/30 animate-ping opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 rounded-full border border-[#F5D5D6]/50 animate-pulse"></div>
                </button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-2000 delay-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex flex-col items-center">
                <span className="text-[#F5D5D6]/70 text-sm mb-4 font-light tracking-widest">EXPLORE MORE</span>
                <div className="w-6 h-10 border-2 border-[#F5D5D6]/50 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-[#F5D5D6] rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#F5D5D6]/30 rounded-full animate-spin opacity-50" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-[#681C1C]/30 rounded-full animate-spin opacity-30" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#F5D5D6]/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-8 h-8 bg-[#681C1C]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Interactive Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#F5D5D6]/40 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
              }}
            />
          ))}
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes wave-animation {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .wave-animation {
          animation: wave-animation 8s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
      <CategorySection></CategorySection>
      <ProductsSection></ProductsSection>
    </>
  );
}