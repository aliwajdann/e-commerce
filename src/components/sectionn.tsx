// 'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';

// const categories = [
//   {
//     name: "Jewellery",
//     slug: "jewellery",
//     image: "https://media.istockphoto.com/id/1299139185/photo/female-hands-with-trendy-dark-nail-design-with-gold-bracelets-on-aqua-background-luxury.webp?a=1&b=1&s=612x612&w=0&k=20&c=PBXjSOfNKK7MICs6YVNbgEt-3wOTPSzGpe6Jotybk-c=",
//     description: "Elegant pieces for every occasion",
//     gradient: "from-yellow-400 via-amber-500 to-orange-600"
//   },
//   {
//     name: "Skin Care",
//     slug: "skin-care",
//     image: "https://images.unsplash.com/photo-1620755901999-166c6c151efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2tpbiUyMGNhcmUlMjB0aHVtYm5haWx8ZW58MHx8MHx8fDA%3D",
//     description: "Nourish your natural beauty",
//     gradient: "from-pink-400 via-rose-500 to-red-500"
//   },
//   {
//     name: "Under Garments",
//     slug: "under-garments",
//     image: "https://images.unsplash.com/photo-1568441556126-f36ae0900180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5kZXJnYXJtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
//     description: "Comfort meets confidence",
//     gradient: "from-purple-400 via-violet-500 to-indigo-600"
//   },
// ];

// export default function Sectionn() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 overflow-hidden"
//     >
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-2xl animate-bounce delay-500"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
//         {/* Header Section */}
//         <div className={`text-center mb-16 transform transition-all duration-1000 ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//         }`}>
//           <div className="inline-flex items-center justify-center mb-6">
//             <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
//             <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
//               <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
//             </div>
//             <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
//           </div>
          
//           <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-4">
//             Shop by Category
//           </h2>
//           <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//             Discover our curated collections designed to elevate your style and confidence
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
//           {categories.map((category, index) => (
//             <div
//               key={category.slug}
//               className={`transform transition-all duration-1000 ${
//                 isVisible 
//                   ? 'translate-y-0 opacity-100' 
//                   : 'translate-y-20 opacity-0'
//               }`}
//               style={{ transitionDelay: `${index * 200}ms` }}
//             >
//               <Link
//                 href={`/category/${category.slug}`}
//                 className="group block relative"
//                 onMouseLeave={() => setHoveredCategory(null)}
//               >
//                 <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl">
//                   {/* Image Container */}
//                   <div className="relative h-80 md:h-96 overflow-hidden">
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
//                     {/* Shimmer Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
//                   </div>

//                   {/* Content Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
//                     <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
//                       <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 tracking-wide">
//                         {category.name}
//                       </h3>
//                       <p className="text-gray-200 text-sm md:text-base opacity-90 mb-4">
//                         {category.description}
//                       </p>
                      
//                       {/* CTA Button */}
//                       <div className="inline-flex items-center text-white bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 transition-all duration-300 group-hover:bg-white/30 group-hover:transform group-hover:scale-105">
//                         <span className="text-sm font-semibold tracking-wider mr-2">EXPLORE</span>
//                         <svg 
//                           className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
//                           fill="none" 
//                           stroke="currentColor" 
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Floating Accent */}
//                   <div className={`absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-full opacity-0 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-110 blur-xl`}></div>
//                 </div>

//                 {/* Floating Label */}
//                 <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
//                   hoveredCategory === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
//                 }`}>
//                   <div className={`bg-gradient-to-r ${category.gradient} text-white px-6 py-2 rounded-full shadow-lg text-sm font-semibold tracking-wider`}>
//                     NEW ARRIVALS
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA Section */}
//         <div className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//         }`}>
//           <div className="inline-flex items-center justify-center space-x-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 shadow-lg">
//             <div className="flex -space-x-2">
//               {[1,2,3].map((i) => (
//                 <div key={i} className={`w-8 h-8 bg-gradient-to-r ${categories[i-1]?.gradient} rounded-full border-2 border-white animate-pulse`} style={{animationDelay: `${i * 200}ms`}}></div>
//               ))}
//             </div>
//             <span className="text-gray-700 font-medium">Join thousands of happy customers</span>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }




'use client';

import Link from "next/link";
import CategorySection from "@/components/CategorySection";
import ProductsSection from "@/components/products";
import { useState, useEffect, useRef } from 'react';

export default function Sectionnn() {
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
      
    </>
  );
}
