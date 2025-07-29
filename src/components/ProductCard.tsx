'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import AtcBtn from './AtcBtn';

type MediaItem = {
  type: string;
  url: string;
};

interface Product {
  id: string;
  name: string;
  price: number;
  originalprice?: number;
  images: MediaItem[];
  rating: number;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  href: string;
}

interface ProductCardProps {
  product: Product;
}

// Mock AtcBtn component for demo
const AtcBtn = ({ product }: { product: any }) => (
  <button className="w-full bg-gradient-to-r from-[#681C1C] to-[#8B2635] text-white py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
    Add to Cart
  </button>
);

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleImageHover = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleImageLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleCardClick = () => {
    router.push(product.href);
  };

  // 
  


  const calculateDiscount = () => {
    if (!product.originalprice) return 0;
    return Math.round(((product.originalprice - product.price) / product.originalprice) * 100);
  };

  return (
    <div className="group relative">
      {/* Main Card Container */}
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
        onClick={handleCardClick}
      >
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              BESTSELLER
            </span>
          )}
          {product.originalprice && calculateDiscount() > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              -{calculateDiscount()}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 group/wishlist"
        >
          <svg
            className={`w-5 h-5 transition-all duration-300 ${
              isWishlisted 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 hover:text-red-500 group-hover/wishlist:scale-110'
            }`}
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Product Image Container */}
        <div
          className="relative overflow-hidden aspect-[4/5] bg-gray-50"
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
        >
          {/* Primary Image */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
            }`}
          >
            <img
              src={product.images?.[0]?.url || "/api/placeholder/400/500"}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Hover Image */}
          {product.images.length > 1 && (
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            >
              <img
                src={product.images[1]?.url || "/api/placeholder/400/500"}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Desktop Quick Actions */}
          <div
            className={`hidden md:flex absolute bottom-4 left-4 right-4 gap-2 transition-all duration-500 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button className="flex-1 bg-white/95 backdrop-blur-sm text-gray-800 py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white hover:shadow-lg">
              Quick View
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3 className="text-gray-800 font-semibold text-base leading-tight line-clamp-2 group-hover:text-[#681C1C] transition-colors duration-300">
            {product.name}
          </h3>

          {/* Rating */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {renderRating()}
              <span className="text-xs text-gray-500 ml-1">
                ({product.rating})
              </span>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-1">
                {product.images.slice(0, 3).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-[#681C1C]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div> */}

          {/* Price */}
          <div className="flex items-center flex-col md:flex-row justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#681C1C] text-lg">
                Rs.{product.price.toFixed(2)}
              </span>
              {product.originalprice && (
                <span className="text-sm text-gray-500 line-through">
                  Rs.{product.originalprice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">Colors:</span>
              <div className="flex gap-1">
                {product.colors.slice(0, 4).map((color, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <div className="w-5 h-5 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-600 font-medium">
                      +{product.colors.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sizes */}
          {/* {product.sizes?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">Sizes:</span>
              <div className="flex gap-1 flex-wrap">
                {product.sizes.slice(0, 4).map((size, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                    +{product.sizes.length - 4}
                  </span>
                )}
              </div>
            </div>
          )} */}

          {/* Add to Cart Button */}
          <div className="pt-2">
            <AtcBtn 
              product={{
                id: product.id,
                title: product.name,
                price: product.price,
                media: product.images.map((m) => ({
                  url: m.url,
                  type: m.type || "image" 
                })),
                quantity: 1,
                description: "Product description"
              }}
            />
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#681C1C]/5 to-[#F5D5D6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Mobile Quick Actions (appears below card) */}
      {/* <div className="md:hidden mt-3 flex gap-2">
        <button className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-gray-200">
          Quick View
        </button>
        <button 
          onClick={handleWishlistToggle}
          className={`p-2.5 rounded-full transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-100 text-red-500' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;