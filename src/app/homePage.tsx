'use client';
import ProductsSection from "@/components/products";
// import CategorySection from "@/components/CategorySection";

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ClassNames } from "@emotion/react";

const categories = [
  {
    name: 'Jewellery',
    slug: 'jewellery',
    image:
      'https://img.freepik.com/premium-photo/best-amazing-wonderful-this-photo-take-this-picture-your-work-ai-generated-top-lovely-photo_1078211-47480.jpg?ga=GA1.1.462192201.1753866574&semt=ais_hybrid&w=740&q=80',
    description: 'Elegant pieces for every occasion',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    icon: '💎',
  },
  {
    name: 'Skin Care',
    slug: 'skin-care',
    image:
      'https://img.freepik.com/premium-photo/beauty-woman-face-portrait-beautiful-female-model-with-perfect-clean-skin-isolated_489646-298.jpg?semt=ais_hybrid&w=740&q=80',
    description: 'Nourish your natural beauty',
    gradient: 'from-pink-400 via-rose-500 to-red-500',
    icon: '✨',
  },
  {
    name: 'Under Garments',
    slug: 'under-garments',
    image:
      'https://images.unsplash.com/photo-1679826010913-09dab83d852c?w=600&auto=format&fit=crop&q=60',
    description: 'Comfort meets confidence',
    gradient: 'from-purple-400 via-violet-500 to-indigo-600',
    icon: '🌸',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image:
      'https://plus.unsplash.com/premium_photo-1669106605262-f4c11d489403?w=600&auto=format&fit=crop&q=60',
    description: 'Complete your perfect look',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    icon: '👜',
  },
];

export default function HeroCategorySwiper() {
  return (
    <>
    <section className="hero-background relative py-20 px-4 md:px-8 pt-30">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <div style={{lineHeight: 1.2}} className="text-5xl md:text-6xl font-extrabold text-white">
          {/* bg-clip-text   text-transparent*/}
          Shop by Category
        </div>
        <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
          Discover premium collections crafted for the modern woman ✨
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides= {true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 , loop: true },
        }}
        className="pb-12"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.slug} className="">
            <Link href={`/category/${cat.slug}`} className="block group">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
                <div className="h-56 md:h-64 w-full relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div
                    className={`text-4xl mb-2 transition-transform`}
                  >
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                  <button
                    className={`px-5 py-2 rounded-full text-white font-medium text-sm bg-gradient-to-r ${cat.gradient} transition-all hover:scale-105`}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
<ProductsSection></ProductsSection>
{/* <CategorySection></CategorySection> */}
</>
  );
}