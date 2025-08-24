'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import Ppatc from './Ppatc';

interface MediaType {
  type: 'image' | 'video' | 'string';
  url: string;
}

interface ColorVariant {
  colorCode: string;
  colorName: string;
  image?: string;
  images?: MediaType[];
}

interface VariantsType {
  colors: ColorVariant[];
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
  reviewsCount: any
}

export default function ProductInfo({
  id,
  title,
  price,
  originalprice,
  description,
  media,
  variants,
  reviewsCount
}: ProductInfoProps) {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [showSizeGrid, setShowSizeGrid] = useState(false);

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
 const handleScrollToReviews = () => {
    const reviewsSection = document.getElementById("reviewsSlider");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // default selections
  useEffect(() => {
    if (variants?.colors?.length > 0) {
      setSelectedColor(variants.colors[0]);
    }
    if (variants?.sizes?.length > 0) {
      setSelectedSize(variants.sizes[0]);
    }
  }, [variants]);

  const discount = originalprice
    ? Math.round(((originalprice - price) / originalprice) * 100)
    : null;

  return (
    <div className="max-w-xl space-y-4 md:px-[36px] px-[16px] mt-5">
      {/* Badge */}
      <div className="inline-block bg-red-700 text-white text-xs font-medium px-3 py-1 rounded">
        Buy 5 get 70% off
      </div>

      


      {/* Title and Prices */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-serif">{title}</h1>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Rs.{price.toFixed(2)}</span>
          {originalprice && (
            <>
              <span className="text-sm text-red-500">(-{discount}%)</span>
              <span className="text-sm text-gray-500 line-through">
                Rs.{originalprice.toFixed(2)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Colors */}
      {variants?.colors?.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm">
            Colour:{' '}
            <span className="font-medium">
              {selectedColor ? selectedColor.colorName : ''}
            </span>
          </p>
          <div className="flex space-x-2">
            {variants.colors.map((c,v) => (
              <button
                key={v}
                onClick={() => setSelectedColor(c)}
                className={`w-16 h-20  overflow-hidden transition 
                  ${
                    selectedColor?.colorName === c.colorName
                      ? 'border-gray-300 border-2'
                      : ''
                  }
                  ${c.image ? 'rounded-sm' : 'rounded-full'}
                `}
                title={c.colorName}
              >
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.colorName}
                    className="w-full h-full object-cover"
                  />
                ) : <p>p</p>

                }
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="flex space-x-4 text-sm underline text-gray-600">
        <button>Find your size</button>
        <button>Size chart</button>
      </div>

      {/* Size Selector */}
      {variants?.sizes?.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowSizeGrid(!showSizeGrid)}
            className="w-full flex justify-between items-center border px-4 py-3 rounded text-sm"
          >
            {selectedSize ? 'Size: ' + selectedSize : 'Select size'}
            <span className="ml-2">▾</span>
          </button>

          {showSizeGrid && (
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-20">
              <div className="grid grid-cols-4 gap-2">
                {variants.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSize(s);
                      setShowSizeGrid(false);
                    }}
                    className={`py-2 text-sm rounded border transition 
                      ${
                        selectedSize === s
                          ? 'border-black font-medium'
                          : 'border-gray-300 hover:border-black'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quantity + Add to Bag */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center border rounded h-full px-3 py-2">
          <button
            className="px-0"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Minus size={16} />
          </button>
          <span className="px-4">{qty}</span>
          <button className="px-0" onClick={() => setQty((q) => q + 1)}>
            <Plus size={16} />
          </button>
        </div>

        <Ppatc
          product={{
            id,
            title,
            price,
            description,
            quantity: qty,
            selectedColor: selectedColor?.colorName,
            selectedSize: selectedSize,
            media: media.map((m) => ({ url: m.url, type: m.type })),
          }}
        />
        
      </div>
      {reviewsCount > 0 && (
        <button
          onClick={handleScrollToReviews}
          className="text-black  underline text-xs block hover:text-black"
        >
          {reviewsCount} {reviewsCount === 1 ? "review" : "reviews"} on this product
        </button>
      )}

      {/* Tabs */}
      <div className="border-t mt-4 pt-4 flex space-x-6 text-sm">
        <button  onClick={() => scrollToSection("custom-product-details")} className="underline">Product description</button>
        <button  onClick={() => scrollToSection("custom-product-details")} className="underline">Shipping and returns</button>
      </div>
    </div>
  );
}

