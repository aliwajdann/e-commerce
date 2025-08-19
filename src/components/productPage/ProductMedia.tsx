'use client';
import React, { useState, useRef, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

interface MediaType {
  type: 'image' | 'video';
  url: string;
}

const loadSwiper = async () => {
  const { Swiper, SwiperSlide } = await import('swiper/react');
  const { Pagination } = await import('swiper/modules');
  return { Swiper, SwiperSlide, Pagination };
};

export default function ProductMedia({ media }: { media: MediaType[] }) {
  const [swiperModules, setSwiperModules] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mainSwiperRef = useRef<any>(null);

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
    return <div className="w-full aspect-[4/5] bg-gray-100 animate-pulse rounded-lg" />;
  }

  const { Swiper, SwiperSlide, Pagination } = swiperModules;

  return (
    <>
    <div className="w-full max-w-6xl mx-auto pl-[16px] md:pl-[0px]">
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2">
        {media.map((item, index) => (
          <div key={index} className="w-full aspect-[4/5] overflow-hidden">
            {item.type === 'video' ? (
              <video src={item.url} controls muted className="w-full h-full object-cover" />
            ) : (
              <img
                src={item.url}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden relative">
        <Swiper
          ref={mainSwiperRef}
          slidesPerView={1.1} // main slide + peek of next
          spaceBetween={8}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          modules={[Pagination]}
          className="w-full h-full"
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full aspect-[4/5] overflow-hidden rounded-sm">
                {item.type === 'video' ? (
                  <video src={item.url} controls muted className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={item.url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination at bottom-left */}
        <div className="product-page-custom-pagination absolute bottom-2 left-2 !w-auto flex space-x-2 z-10"></div>
      </div>
    </div>
    </>
  );
}
