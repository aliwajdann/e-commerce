'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
  gradient: string;
  icon: string;
}

const categories: Category[] = [
  {
    name: "Jewellery",
    slug: "jewellery",
    image: "https://media.istockphoto.com/id/1299139185/photo/female-hands-with-trendy-dark-nail-design-with-gold-bracelets-on-aqua-background-luxury.webp?a=1&b=1&s=612x612&w=0&k=20&c=PBXjSOfNKK7MICs6YVNbgEt-3wOTPSzGpe6Jotybk-c=",
    description: "Elegant pieces for every occasion",
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    icon: "💎"
  },
  {
    name: "Skin Care",
    slug: "skin-care",
    image: "https://media.istockphoto.com/id/2171944978/photo/facial-serum-skin-care-essence-liquid-texture-of-cosmetic-product-on-beige-background-3d.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZxP13h98u8g7Wtyyu3c9UqtIwIOyBahNBuea4gLQbMw=",
    description: "Nourish your natural beauty",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    icon: "✨"
  },
  {
    name: "Under Garments",
    slug: "under-garments",
    image: "https://images.unsplash.com/photo-1679826010913-09dab83d852c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVuZGVyJTIwZ2FybWVudHN8ZW58MHx8MHx8fDA%3D",
    description: "Comfort meets confidence",
    gradient: "from-purple-400 via-violet-500 to-indigo-600",
    icon: "🌸"
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://plus.unsplash.com/premium_photo-1669106605262-f4c11d489403?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWNjZXNzaW9yaWVzfGVufDB8fDB8fHww",
    description: "Complete your perfect look",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    icon: "👜"
  },
  // {
  //   name: "Fragrances",
  //   slug: "fragrances",
  //   image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=600&auto=format&fit=crop&q=60",
  //   description: "Captivate with signature scents",
  //   gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
  //   icon: "🌺"
  // }
];

export default function CategorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle slide change
  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    goToSlide((activeSlide + 1) % categories.length);
  };

  const prevSlide = () => {
    goToSlide((activeSlide - 1 + categories.length) % categories.length);
  };

  return (
    <section 
      ref={sectionRef}
      // className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      className="relative min-h-screen hero-background overflow-hidden"
    >
      {/* Animated Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div> */}

      <div className="relative z-10 w-full max-w-7xl mx-auto md:px-4 px-0 py-16 md:py-20">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-24"></div>
            <div className="mx-8 relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-2xl animate-bounce">🛍️</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-24"></div>
          </div>
          
          <h2 style={{lineHeight: 1.2}} className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Discover our premium collections crafted for the modern woman
          </p>
        </div>

        {/* Main Slider */}
        <div className="relative mb-12">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {categories.map((category, index) => (
              <div
                key={category.slug}
                className="w-full flex-shrink-0 px-4"
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="group block relative"
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-3xl">
                    {/* Main Content */}
                    <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
                      {/* Image Side */}
                      <div className="hidden md:block relative overflow-hidden md:order-1 order-2">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="hidden md:block w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:hidden"></div>
                        
                        {/* Mobile Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
                      </div>

                      {/* Content Side */}
                      <div className="relative flex flex-col justify-center p-12 md:order-2 order-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm"></div>
                        
                        <div className="relative z-10">
                          <div className="text-6xl mb-6 transform transition-transform duration-500 group-hover:scale-110">
                            {category.icon}
                          </div>
                          
                          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {category.name}
                          </h3>
                          
                          <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                            {category.description}
                          </p>
                          
                          <div className="flex items-center space-x-4">
                            <button className={`group/btn relative px-8 py-4 bg-gradient-to-r ${category.gradient} text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden`}>
                              <span className="md:hidden  relative z-10 flex items-center">
                                Explore 
                              </span>
                              <span className="hidden relative z-10 md:flex items-center">
                                Explore Collection
                                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </span>
                              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                            </button>
                            
                            {/* <div className="text-gray-400 text-sm">
                              {Math.floor(Math.random() * 500) + 100}+ items
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className={`absolute top-6 right-6 w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-full opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-125`}></div>
                    <div className={`absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-full opacity-30 blur-lg transition-all duration-700 group-hover:opacity-60`}></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center items-center space-x-3 mb-12">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ${
                index === activeSlide 
                  ? 'w-12 h-3' 
                  : 'w-3 h-3 hover:w-6'
              }`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? `bg-gradient-to-r ${categories[index].gradient}`
                  : 'bg-white/30 hover:bg-white/50'
              }`}></div>
            </button>
          ))}
        </div>

        {/* Category Preview Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {categories.map((category, index) => (
            <button
              key={`preview-${category.slug}`}
              onClick={() => goToSlide(index)}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                index === activeSlide 
                  ? 'scale-105 ring-2 ring-white/50' 
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white text-sm font-semibold truncate">
                    {category.name}
                  </div>
                </div>
                {index === activeSlide && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-3 gap-8 mt-16 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { number: '10K+', label: 'Happy Customers' },
            { number: '500+', label: 'Products' },
            { number: '98%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}