'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  originalprice?: number;
  images: { url: string }[];
  colors?: string[];
  href: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleCardClick = () => {
    router.push(product.href);
  };

  const discount =
    product.originalprice && product.originalprice > product.price
      ? Math.round(((product.originalprice - product.price) / product.originalprice) * 100)
      : 0;

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border p-2 rounded-md shadow-sm hover:shadow-md transition"
    >
      <div className="relative">
        <img
          src={product.images?.[0]?.url || '/placeholder.png'}
          alt={product.name}
          className="w-full h-60 object-cover rounded"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-1 bg-white rounded-full border"
        >
          <svg
            className="w-5 h-5 text-red-500"
            fill={isWishlisted ? 'currentColor' : 'none'}
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
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#681C1C] text-sm">
            Rs.{product.price.toFixed(0)}
          </span>
          {product.originalprice && (
            <span className="text-sm text-gray-500 line-through">
              Rs.{product.originalprice.toFixed(0)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-1">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
