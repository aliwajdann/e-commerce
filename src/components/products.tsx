'use client';
import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';




export default function ProductsSection() {
  const { products, loading } = useProducts();
  const [isVisible, setIsVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const sectionRef = useRef<HTMLElement>(null);

  const filters = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'new', label: 'New Arrivals', count: 15 },
    { id: 'bestseller', label: 'Best Sellers', count: 8 },
    { id: 'sale', label: 'On Sale', count: 12 }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //       }
  //     },
  //     { threshold: 0.1 }
  //   );

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          {/* Loading Animation */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#F5D5D6] rounded-full animate-spin border-t-[#681C1C] mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full animate-ping border-t-[#681C1C]/20"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Products</h3>
          <p className="text-gray-600">Discovering amazing pieces for you...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F5D5D6]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#681C1C]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4A5A6]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#681C1C]/30 to-transparent w-20"></div>
            <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-[#F5D5D6]/30">
              <div className="w-3 h-3 bg-gradient-to-r from-[#681C1C] to-[#D4A5A6] rounded-full animate-pulse"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#681C1C]/30 to-transparent w-20"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Women's Collection
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover curated pieces that celebrate your unique style and confidence
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className={`mb-12 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-[#681C1C] to-[#8B2635] text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {filter.label}
                    <span className="ml-2 text-xs opacity-75">({filter.count})</span>
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#681C1C]/20 focus:border-[#681C1C] transition-all duration-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="transform transition-all duration-500"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <ProductCard
                  product={{
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    images: product.media || [],
                    originalprice: product.originalPrice,
                    rating: 4.5,
                    isNew: index % 3 === 0,
                    isBestSeller: index % 4 === 0,
                    href: `/products/${product.id}`,
                    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
                    sizes: ['XS', 'S', 'M', 'L', 'XL'],
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Load More Section */}
        <div className={`text-center transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex flex-col items-center gap-6">
            <button className="group relative px-12 py-4 bg-gradient-to-r from-[#681C1C] to-[#8B2635] text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center">
                Load More Products
                <svg className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m0 0l7-7m7 7H3" />
                </svg>
              </span>
            </button>

            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#681C1C] rounded-full animate-pulse"></div>
                <span className="text-sm">Showing {products.length} of 156 products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-900 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { number: '500+', label: 'Products', icon: '🛍️' },
            { number: '15K+', label: 'Happy Customers', icon: '💝' },
            { number: '98%', label: 'Satisfaction', icon: '⭐' },
            { number: '24/7', label: 'Support', icon: '💬' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-[#681C1C] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}