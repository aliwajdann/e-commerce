'use client';
import React, { useState, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface MediaType {
  type: 'image' | 'video';
  url: string;
}

const loadSwiper = async () => {
  const { Swiper, SwiperSlide } = await import('swiper/react');
  const { Navigation, Pagination, Thumbs, FreeMode } = await import('swiper/modules');
  return { Swiper, SwiperSlide, Navigation, Pagination, Thumbs, FreeMode };
};

export default function ProductMedia({ media }: { media: MediaType[] }) {
  const [swiperModules, setSwiperModules] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const mainSwiperRef = useRef<any>(null);
  const thumbsSwiperRef = useRef<any>(null);
  const mobileThumbsSwiperRef = useRef<any>(null);

  useEffect(() => {
    const initSwiper = async () => {
      try {
        const modules = await loadSwiper();
        setSwiperModules(modules);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load Swiper:', error);
        setIsLoading(false);
      }
    };
    initSwiper();
  }, []);

  if (!media?.length || isLoading || !swiperModules) {
    return (
      <div className="flex flex-col lg:flex-row  max-w-6xl mx-auto p-4 w-full">
        <div className="hidden lg:flex flex-col items-center space-y-2">
          <div className="w-16 h-64 rounded-lg animate-pulse" />
        </div>
        <div className="flex-1 relative">
          <div className="aspect-[3/4] lg:aspect-[4/5]  rounded-lg animate-pulse" />
        </div>
        <div className="lg:hidden flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-16 h-20 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const { Swiper, SwiperSlide, Navigation, Pagination, Thumbs, FreeMode } = swiperModules;

  return (
    <div className="min-w-full flex flex-col  gap-0 max-w-6xl mx-auto p-4">
      {/* Desktop Thumbnails - Vertical */}
      <div className="hidden  flex-col items-center w-20 space-y-2">
        <button
          onClick={() => thumbsSwiperRef.current?.swiper.slidePrev()}
          className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
        >
          <ChevronUp size={16} />
        </button>

        <Swiper
          ref={thumbsSwiperRef}
          direction="vertical"
          slidesPerView={4}
          spaceBetween={8}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="thumbnail-swiper h-80"
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-16 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-all duration-200">
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={item.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => thumbsSwiperRef.current?.swiper.slideNext()}
          className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Main Media */}
     <div className="flex-1 w-full max-w-md  mx-auto min-w-full">
     {/* <div className="w-full lg:w-auto flex-1"> */}


       <div className="relative w-full rounded-lg overflow-hidden">

          <Swiper
            ref={mainSwiperRef}
            thumbs={{ swiper: thumbsSwiperRef.current?.swiper }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Navigation, Pagination, Thumbs]}
            className="w-full h-full"
        onSlideChange={(swiper: SwiperType) => {
  if (typeof swiper?.activeIndex === 'number') {
    setActiveIndex(swiper.activeIndex);
  }
}}


            loop={false}
          >
            {media.map((item, index) => (
              <SwiperSlide  key={index}>
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay={index === activeIndex}
                    muted
                  />
                ) : (
                  <img src={item.url} alt={`Product image ${index + 1}`} className="w-full h-full object-contain" />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100 z-10">
            <ChevronLeft size={20} />
          </button>
          <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100 z-10">
            <ChevronRight size={20} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 right-4 bg-[#681C1C]  bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
            {activeIndex + 1} / {media.length}
          </div>
        </div>
      </div>

      {/* Mobile Thumbnails - Horizontal */}
     {/* Mobile Thumbnails - Horizontal */}
<div className=" mt-4 w-full px-4">
  <div className="flex items-center space-x-4 overflow-hidden">
    {/* Left Arrow */}
    {/* <button
      onClick={() => mobileThumbsSwiperRef.current?.swiper.slidePrev()}
      className="p-2 rounded-full border hover:bg-gray-100 transition-colors flex-shrink-0"
    >
      <ChevronLeft size={16} />
    </button> */}

    <div className="overflow-hidden">
      <Swiper
        ref={mobileThumbsSwiperRef}
        slidesPerView={'auto'}
        spaceBetween={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode]}
        className="thumbnail-swiper"
      >
        {media.map((item, index) => (
          <SwiperSlide key={index} className="!w-16 flex-shrink-0">
            <button
              onClick={() => mainSwiperRef.current?.swiper.slideTo(index)}
              className={`w-16 h-20 rounded-lg overflow-hidden border-2 ${
                activeIndex === index
                  // ? 'border-pink-400 ring-2 ring-pink-200'
                  // : 'border-gray-200'
              } transition-all duration-200`}
            >
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover" muted />
              ) : (
                <img src={item.url} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
              )}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Right Arrow */}
    {/* <button
      onClick={() => mobileThumbsSwiperRef.current?.swiper.slideNext()}
      className="p-2 rounded-full border hover:bg-gray-100 transition-colors flex-shrink-0"
    >
      <ChevronRight size={16} />
    </button> */}
  </div>
</div>

    </div>
  );
}
