import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample testimonial data - replace with your actual reviews
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Everything was true to size and perfect!",
      author: "Sarah M.",
      verified: true
    },
    {
      id: 2,
      rating: 5,
      text: "Beautiful quality and fits like a dream. Will definitely order again!",
      author: "Emma K.",
      verified: true
    },
    {
      id: 3,
      rating: 5,
      text: "Exceeded my expectations. The fabric is luxurious and the fit is impeccable.",
      author: "Jessica L.",
      verified: true
    },
    {
      id: 4,
      rating: 5,
      text: "Fast shipping and gorgeous pieces. Love the attention to detail.",
      author: "Maria R.",
      verified: true
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index:any) => {
    setCurrentIndex(index);
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 hover:bg-white hover:shadow-md rounded-full transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 hover:bg-white hover:shadow-md rounded-full transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          {/* Testimonial Content with Smooth Transitions */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="text-center max-w-4xl mx-auto px-8 sm:px-12 lg:px-16">
                    
                    {/* Star Rating */}
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={20}
                          className={`mx-1 transition-colors duration-300 ${
                            starIndex < testimonial.rating
                              ? 'text-gray-800 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <div className="mb-8 sm:mb-10">
                      <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-light leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots with Bigger Active Dot */}
          <div className="flex items-center justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-3 h-3 bg-gray-800 scale-125' // Bigger active dot
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default TestimonialSection;