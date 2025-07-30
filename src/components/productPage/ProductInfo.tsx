'use client';

import { useEffect, useState } from 'react';
import WatchingIndicator from './WatchingIndicator';
import Ppatc from './Ppatc';

interface MediaType {
  type: 'image' | 'video' | 'string';
  url: string;
}
interface VariantsType {
  colors: string[];
  sizes: string[];
}

interface ProductInfoProps {
  id: string;
  title: string;
  price: number;
  originalprice: number;
  description: string;
  media: MediaType[];
  variants: VariantsType;
}

export default function ProductInfo({
  id,
  title,
  price,
  description,
  media,
  originalprice,
  variants,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const featureList = description.split('\n');

  useEffect(() => {
    if (variants?.colors?.length > 0) {
      setSelectedColor(variants.colors[0]);
    }
    if (variants?.sizes?.length > 0) {
      setSelectedSize(variants.sizes[0]);
    }
  }, [variants]);

  return (
    <div className="space-y-4 p-4 sm:p-6">
      {/* Title & Price */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold capitalize text-black">{title}</h1>
        <div className="flex items-center gap-2 mt-1">
          {originalprice > price && (
            <span className="text-lg sm:text-xl text-black line-through">
              Rs.{originalprice.toFixed(2)}
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-bold text-[#681C1C]">
            Rs.{price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Installment Info */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button className="bg-purple-700 text-white px-2 py-1 text-xs rounded">
          baadmay
        </button>
        <span className="text-black">Pay in three installments of</span>
        <span className="text-purple-700 font-semibold">
          Rs.{(price / 3).toFixed(2)}
        </span>
      </div>

      <p className="text-sm text-gray-600">SKU: E1680-A-GRADE</p>

      {/* Color Selection */}
      {variants?.colors?.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-1 text-gray-600">Color:</p>
          <div className="flex gap-2">
            {variants?.colors.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-7 h-7 rounded-full border-2 cursor-pointer ${
                  selectedColor === color ? 'border-black' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {variants?.sizes?.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-1 text-gray-200">Size:</p>
          <div className="flex flex-wrap gap-2">
            {variants?.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-md border text-sm font-medium transition ${
                  selectedSize === size
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-black hover:bg-gray-100 border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4 mt-4">
        <p className="text-sm text-gray-600">Quantity:</p>
        <div className="flex items-center border border-gray-600 rounded-full px-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-xl px-2 font-bold text-[#681C1C]"
          >
            -
          </button>
          <span className="px-3 text-gray-600">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-xl px-2 font-bold text-[#681C1C]"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <Ppatc
        product={{
          id,
          title,
          price,
          description,
          quantity,
          selectedColor,
          selectedSize,
          media: media.map((m) => ({
            url: m.url,
            type: m.type || 'image',
          })),
        }}
      />

      <WatchingIndicator />

      {/* Features */}
      {featureList.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          {featureList.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
