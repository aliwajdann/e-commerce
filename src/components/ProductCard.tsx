'use client'; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import  { useRouter } from 'next/navigation';
import AtcBtn from './AtcBtn';

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
  colors?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  href: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Rotate through images on hover
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

  // Render star rating
  const renderRating = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden group hover:cursor-pointer"
      onClick={(()=>{
         router.push(product.href)
      })}
    >
      {/* Badges */}
      {/* <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex gap-1 sm:gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
            Bestseller
          </span>
        )}
      </div> */}

      {/* Wishlist button */}
      {/* <button className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 hover:text-red-500 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button> */}

      {/* Product Image */}
      <div
        className="relative overflow-hidden aspect-[4/7] md:aspect-[4/6]"
        // style={{aspectRatio: 4/6}}
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageLeave}
      >
        <motion.div
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.95 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <img
            src={product.images?.find(media => media.type === "image")?.url || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {product.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 1.05,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <img
              src={product.images.filter(media => media.type === "image")[1]?.url || "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        )}

        {/* Quick add to cart (appears on hover) - Desktop only */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="hover:cursor-pointer hidden md:block absolute bottom-3 left-0 right-0 px-3"
        >
          <AtcBtn product={{
            id: product.id,
            title: product.name,
            price: product.price,
            media: product.images.map((m) => ({
              url: m.url,
              type: m.type || "image" 
            })),
            quantity: 1,
            description: "hey"
          }}/>
        </motion.div>
      </div>

      {/* Mobile Add to Cart Button */}
      <div className='mt-1.5 md:hidden w-full hover:cursor-pointer'>
        <AtcBtn product={{
          id: product.id,
          title: product.name,
          price: product.price,
          media: product.images.map((m) => ({
            url: m.url,
            type: m.type || "image" 
          })),
          quantity: 1,
          description: ""
        }}/>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 flex items-center">
        <div className="justify-between items-start w-full space-y-1">
          {/* Product Name */}
          <div className='text-center'>
            <h3 className="text-gray-900 text-sm font-medium sm:text-base leading-tight line-clamp-2">
              {product.name}
            </h3>
            {/* Rating - uncomment if needed */}
            {/* <div className="flex items-center justify-center mt-1">
              {renderRating()}
              <span className="text-xs text-gray-500 ml-1">
                ({product.rating.toFixed(1)})
              </span>
            </div> */}
          </div>

          {/* Price Section */}
          <div className="text-center flex items-center gap-2 sm:gap-3 justify-center">
            {product.originalprice && (
              <span className="font-medium text-xs sm:text-sm text-gray-500 line-through">
                Rs.{product.originalprice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-price text-sm sm:text-base">
              Rs.{product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Color options */}
        {/* {product.colors && product.colors.length > 0 && (
          <div className="mt-2 sm:mt-3">
            <div className="flex justify-center space-x-1 sm:space-x-2">
              {product.colors.slice(0, 4).map((color) => (
                <button
                  key={color}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 self-center">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )} */}
      </div>
    </motion.div>
  );
};

export default ProductCard;