import React from 'react';
import Link from 'next/link';

const InspirationSection = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 sm:mb-8 tracking-wide">
            inspiration
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
            We believe lingerie is an expression of individual style and spirit. Own your sensuality and redefine what it means to you with our boundary-pushing collections.
          </p>
        </div>
      </div>

      {/* Swimwear Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] lg:h-[75vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1753826188215-6076831cab97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8')` // Replace with actual image path
          }}
        >
          {/* Overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-20" /> */}
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 tracking-wide">
              Out Of Office
            </h3>
            
            <Link
              href="/swimwear"
              className="inline-block group"
            >
              <span className="text-sm sm:text-base font-medium tracking-wider uppercase border-b-2 border-white pb-1 group-hover:border-opacity-80 transition-all duration-300">
                SHOP SWIMWEAR
              </span>
            </Link>
          </div>
        </div>

        {/* Optional: Subtle gradient overlay from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />
      </div>
    </div>
  );
};

export default InspirationSection;