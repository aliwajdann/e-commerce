import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AsSeenInSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logo data - replace with your actual logo images
  const logos = [
    {
      id: 1,
      name: 'BAZAAR',
      image: '/api/placeholder/200/80', // Replace with actual logo path
      alt: 'Bazaar Magazine'
    },
    {
      id: 2,
      name: 'WHO WHAT WEAR',
      image: '/api/placeholder/200/80', // Replace with actual logo path
      alt: 'Who What Wear'
    },
    {
      id: 3,
      name: 'WWD',
      image: '/api/placeholder/200/80', // Replace with actual logo path
      alt: 'Women\'s Wear Daily'
    },
    {
      id: 4,
      name: 'VOGUE',
      image: '/api/placeholder/200/80', // Replace with actual logo path
      alt: 'Vogue Magazine'
    },
    {
      id: 5,
      name: 'ELLE',
      image: '/api/placeholder/200/80', // Replace with actual logo path
      alt: 'Elle Magazine'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === logos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? logos.length - 1 : prevIndex - 1
    );
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Reset auto-scroll when user manually navigates
  const handleManualNavigation = (direction:string) => {
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <div className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">
            As Seen In
          </h2>
        </div>

        {/* Logo Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center">
            
            {/* Left Arrow */}
            <button
              onClick={() => handleManualNavigation('prev')}
              className="absolute left-0 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Previous logos"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>

            {/* Logo Container */}
            <div className="overflow-hidden w-full max-w-4xl mx-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / 3)}%)` 
                }}
              >
                {/* Duplicate logos for infinite scroll effect */}
                {[...logos, ...logos].map((logo, index) => (
                  <div 
                    key={`${logo.id}-${index}`}
                    className="flex-shrink-0 w-1/3 px-4 sm:px-6 lg:px-8"
                  >
                    <div className="flex items-center justify-center h-16 sm:h-20 lg:h-24">
                      {/* You can use actual logo images or text logos */}
                      {/* For image logos: */}
                      {/* <img 
                        src={logo.image} 
                        alt={logo.alt}
                        className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      /> */}
                      
                      {/* For text logos (matching your image): */}
                      <div className="text-center">
                        <span className="text-lg sm:text-xl lg:text-2xl font-light tracking-wider text-gray-800 hover:text-black transition-colors duration-300">
                          {logo.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => handleManualNavigation('next')}
              className="absolute right-0 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Next logos"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>

          </div>
        </div>

        {/* Static version for larger screens (optional) */}
        {/* <div className="hidden lg:block lg:mt-8">
          <div className="flex items-center justify-center space-x-12 xl:space-x-16">
            {logos.slice(0, 3).map((logo) => (
              <div key={`static-${logo.id}`} className="flex items-center justify-center h-24">
                <span className="text-2xl font-light tracking-wider text-gray-800 hover:text-black transition-colors duration-300">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default AsSeenInSection;