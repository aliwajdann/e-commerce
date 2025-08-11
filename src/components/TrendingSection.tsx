import React from 'react';
import Link from 'next/link';
// import { original } from '@reduxjs/toolkit';

// ProductCard Component (you can replace this with your actual ProductCard import)
const productt = {
name: "Trending Product",
href: "",
images : [
    {type: "image", url: "https://images.unsplash.com/photo-1750262773917-5562f37aaf90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"},
    {type: "image", url: "https://images.unsplash.com/photo-1712408175698-95ff4bc916b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"}
],
price: 1200,
originalprice: 1400,
id: 123
}
const ProductCard = () => {
  return (
    <div className="group">
      <Link href={productt.href} className="block">
        {/* Product Image */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
          <img
            src={productt.images[0].url || '/api/placeholder/300/400'}
            alt={productt.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Product Details */}
        <div className="text-center space-y-1">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
            {productt.name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-600">
              PKR {productt.price}
            </span>
            {productt.originalprice && productt.originalprice > productt.price && (
              <span className="text-sm text-gray-400 line-through">
                PKR {productt.originalprice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

const TrendingSection = () => {
  // Sample product data - replace with your actual data
  const trendingProduct = {
    id: 1,
    title: "Madeline Lace Chemise Black",
    price: 68.00,
    originalPrice: null,
    media: [
      '/api/placeholder/300/400', // Replace with actual image path
    ],
  };

  // Transform data to match your ProductCard structure
  const productForCard = {
    id: trendingProduct.id,
    name: trendingProduct.title,
    price: trendingProduct.price,
    images: trendingProduct.media || [],
    originalprice: trendingProduct.originalPrice,
    href: `/products/${trendingProduct.id}`,
    colors: [],
  };

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
        
        {/* Left Side - Video/Image */}
        <div className="relative overflow-hidden bg-gray-50">
          {/* You can switch between video and image */}
          {/* For Video */}
          {/* <video 
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://youtu.be/5mSsiQbgEJk?si=mrc0JjzYT7L2GyQH" type="video/mp4" /> */}

          {/* </video> */}
          <iframe width="560" height="315" src="https://www.youtube.com/embed/5mSsiQbgEJk?si=mrc0JjzYT7L2GyQH" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
          
          {/* For Image */}
          {/* <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('/api/placeholder/600/800')` // Replace with actual image/video
            }}
          /> */}
        </div>

        {/* Right Side - Content */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="max-w-sm w-full text-center">
            
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
                Trending
              </h2>
              <Link 
                href="/trending"
                className="inline-block group"
              >
                <span className="text-sm font-medium tracking-wider uppercase border-b border-gray-900 pb-1 group-hover:border-gray-600 transition-colors duration-300">
                  GET THE LOOK
                </span>
              </Link>
            </div>

            {/* Product Card */}
            <div className="mt-8">
              <ProductCard
              key={productt.id}
              product={{
                id: productt.id,
                name: productt.name,
                price: productt.price,
                images: productt.images || [],
                originalprice: productt.originalprice,
                href: `/products/${productt.id}`,
                colors: [],
                // sizes: [],
              }}
            />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TrendingSection;