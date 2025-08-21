import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeaderBar = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    'GIFT WRAPPING AVAILABLE',
    'FREE SHIPPING ON ORDERS OVER PKR 3000',
    'NEW ARRIVALS WEEKLY'
  ];

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentMessage((prev) => (prev - 1 + messages.length) % messages.length);
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(nextMessage, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-red-600 z-50 text-white top-0 overflow-hidden  ">
      <div className="flex items-center h-[1.8rem] px-2 sm:px-4 justify-center gap-4">
        
        {/* Left Arrow */}
        <button
          onClick={prevMessage}
          className="hover:bg-gray-800 p-1 rounded transition-colors duration-200 flex-shrink-0"
          aria-label="Previous message"
        >
          <ChevronLeft size={12} className="sm:w-4 sm:h-4" />
        </button>

        {/* Message Container */}
        <div className="relative h-4 overflow-hidden flex-1 max-w-xs sm:max-w-md">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentMessage * 100}%)` }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex items-center justify-center text-[10px] font-medium tracking-wide uppercase whitespace-nowrap"
              >
                {message}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextMessage}
          className="hover:bg-gray-800 p-1 rounded transition-colors duration-200 flex-shrink-0"
          aria-label="Next message"
        >
          <ChevronRight size={12} className="sm:w-4 sm:h-4" />
        </button>

      </div>
    </div>
  );
};

export default HeaderBar;
