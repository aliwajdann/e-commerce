'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface MediaType {
  type: 'image' | 'video';
  url: string;
} 

export default function ProductMedia({ media }: { media: MediaType[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!media?.length) return null;

  return (
    <div className="w-full">
      {/* Main Media */}
      <Swiper
        spaceBetween={10}
        // navigation
        // pagination
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, Pagination]}
        className="overflow-hidden"
      >
        {media.map((item, index) => (
          <SwiperSlide key={index}>
            {item.type === 'video' ? (
              <video src={item.url} controls className="w-full h-auto " />
            ) : (
              <img src={item.url} alt={`Media ${index}`} className="w-full h-auto object-cover" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {media.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          // pagination
          watchSlidesProgress
          className="mt-4"
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-20 object-cover rounded-md" />
              ) : (
                <img src={item.url} alt={`Thumb ${index}`} className="w-full h-20 object-cover rounded-md" />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
