import React from "react";
import Link from "next/link";

type Product = {
  id: number | string;
  name: string;
  price: number;
  originalprice?: number | null;
  images: { url: string  }[] | string[];
  href: string;
  colors?: string[];
};

// ✅ Props type for ProductCard
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageSrc =
    (Array.isArray(product.images) &&
      (typeof product.images[0] === "string"
        ? product.images[0]
        : (product.images[0] as { url: string }).url)) || "/api/placeholder/300/400";

  return (
    <div className="group">
      <Link href={product.href} className="block">
        {/* Product Image */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="text-center space-y-1">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-600">PKR {product.price}</span>
            {product.originalprice && product.originalprice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                PKR {product.originalprice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

// ✅ TrendingSection Component
const TrendingSection = () => {
  // Example product data (replace with actual API/data)
  const trendingProduct = {
    id: 123,
    name: "Trending Product",
    price: 1200,
    originalprice: 1400,
    images: [
      {
        url: "https://images.unsplash.com/photo-1750262773917-5562f37aaf90?w=600&auto=format&fit=crop&q=60",
      },
      {
        url: "https://images.unsplash.com/photo-1712408175698-95ff4bc916b7?w=600&auto=format&fit=crop&q=60",
      },
    ],
    href: `/products/123`,
  };

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-2 min-h-[60vh]">
        {/* Left Side - Video */}
        <div className="relative overflow-hidden bg-gray-50 flex items-center justify-center">
          <iframe
            width="100%"
            height="100%"
            className="aspect-video"
            src="https://www.youtube.com/embed/5mSsiQbgEJk?si=mrc0JjzYT7L2GyQH"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>

        {/* Right Side - Content */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="max-w-sm w-full text-center">
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-wide">
                Trending
              </h2>
              <Link href="/trending" className="inline-block group">
                <span className="text-sm font-medium tracking-wider uppercase border-b border-gray-900 pb-1 group-hover:border-gray-600 transition-colors duration-300">
                  GET THE LOOK
                </span>
              </Link>
            </div>

            {/* Product Card */}
            <div className="mt-8">
              <ProductCard product={trendingProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
