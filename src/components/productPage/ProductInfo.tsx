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
  const featureList = description.split('\n');

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Auto-select first color and size
  useEffect(() => {
    if (variants?.colors?.length > 0) {
      setSelectedColor(variants.colors[0]);
    }
    if (variants?.sizes?.length > 0) {
      setSelectedSize(variants.sizes[0]);
    }
  }, [variants]);

  return (
    <div className="space-y-3 p-4">
      {/* Title & Price */}
      <div className="space-y-1">
        <h1 style={{ textTransform: 'capitalize' }} className="md:text-[28px] text-[24px] font-semibold text-[#F5D5D6]">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {originalprice && (
            <span className="block text-[#F5D5D6] text-[24px] line-through">
              Rs.{originalprice.toFixed(2)}
            </span>
          )}
          <span className="md:text-[34px] text-[30px] text-[#681C1C]">
            Rs.{price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Installment */}
      <div className="flex gap-2 items-center">
        <button className="bg-purple-800 text-[10px] px-1 py-0.5 text-white border-none rounded-sm">
          baadmay
        </button>
        <p className="font-medium text-[12px] text-[#F5D5D6]">Pay in Three Installments of</p>
        <p className="text-purple-800 font-bold text-sm">Rs.{(price / 3).toFixed(2)}</p>
      </div>

      <p className="text-base-dark text-sm text-[#F5D5D6]">SKU: E1680-A-GRADE</p>

      {/* Color */}
      {variants?.colors && variants?.colors?.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Color:</p>
          <div className="flex gap-2">
            {variants.colors.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                  selectedColor === color ? 'border-black' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size */}
      {variants?.sizes && variants?.sizes?.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Size:</p>
          <div className="flex gap-2 flex-wrap">
            {variants.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded-md text-sm font-medium ${
                  selectedSize === size
                    ? 'bg-gray-800 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mt-4 flex items-center gap-4">
        <div className="p-1 flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="font-bold bg-dark px-2 text-white hover:bg-gray-200 transition rounded-full"
          >
            -
          </button>
          <span className="px-3 py-1 w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="font-bold px-2 bg-dark text-white hover:bg-gray-200 transition rounded-full"
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
      <div className="leading-relaxed text-muted">
        <ul className="list-disc pl-5 space-y-1 text-[#F5D5D6] md:text-[15px] text-[14px] font-normal">
          {featureList.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
