import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';

const HeaderBar = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('EUROPE (EUR)');
  
  const messages = [
    'GIFT WRAPPING AVAILABLE',
    'FREE SHIPPING ON ORDERS OVER PKR 3000',
    'NEW ARRIVALS WEEKLY'
  ];

  const currencies = [
    'EUROPE (EUR)',
    'UNITED STATES (USD)',
    'UNITED KINGDOM (GBP)',
    'CANADA (CAD)'
  ];

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentMessage((prev) => (prev - 1 + messages.length) % messages.length);
  };

  return (
    <div className="bg-black text-white relative overflow-hidden">
      <div className="flex items-center h-10 px-2 sm:px-4 justify-center">
        
        {/* Center - Message with Navigation Arrows */}
        {/* <div className='w-[33%]'></div> */}
        <div className=" flex items-center justify-center gap-2 sm:gap-3 w-[100%]">
          {/* Left Arrow */}
          <button
            onClick={prevMessage}
            className="hover:bg-gray-800 p-1 rounded transition-colors duration-200 flex-shrink-0"
            aria-label="Previous message"
          >
            <ChevronLeft size={12} className="sm:w-4 sm:h-4" />
          </button>

          {/* Message Display */}
          <div className="relative h-4 overflow-hidden min-w-0 flex-1 max-w-xs sm:max-w-md">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${currentMessage * 16}px)` }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="text-xs font-medium tracking-wide uppercase whitespace-nowrap h-4 flex items-center justify-center"
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

        {/* Right - Currency Selector */}
        {/* <div className="flex items-center gap-1 flex-shrink-0 ml-2 w-[33%] justify-end">
          <div className="relative hidden sm:block">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent text-white text-xs font-medium appearance-none pr-5 pl-1 py-1 hover:bg-gray-800 rounded transition-colors duration-200 cursor-pointer outline-none"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency} className="bg-black">
                  {currency}
                </option>
              ))}
            </select>
            {/* <div className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Globe size={10} />
            </div> */}
          {/* </div>
          
          <div className="sm:hidden">
            <button className="hover:bg-gray-800 p-1 rounded transition-colors duration-200">
              <Globe size={12} />
            </button> */}
          {/* </div> */}

          {/* <span className="text-xs font-medium hidden sm:inline">Change</span> */}
        {/* </div> */}
      {/* </div> */} 

      {/* Message Indicators */}
      {/* <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex gap-1">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full transition-colors duration-300 ${
              index === currentMessage ? 'bg-white' : 'bg-gray-600'
            }`}
          />
        ))}
      </div> */}
    </div>
    </div>
  );
};

export default HeaderBar;