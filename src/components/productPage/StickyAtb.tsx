"use client";

import { useState, useEffect } from 'react';
import StickyAtcBtn from './StickyAtcBtn';

interface MediaType {
  type: string;
  url: string;
}

interface StickyATBProps {
  id: string;
  title: string;
  price: number;
  description: string;
  media: MediaType[];
  qty: number;
  selectedColor?: string | null;
  selectedSize?: string | null;
}

export default function StickyATB({
  id,
  title,
  price,
  description,
  media,
  qty,
  selectedColor,
  selectedSize,
}: StickyATBProps) {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const target = document.getElementById("main-add-to-bag");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
   <div
  className={`
    fixed left-0 right-0 z-50 bg-white shadow-xs border-b px-[16px] md:px-[32px] py-3 
    flex items-center justify-between transform transition-transform duration-300
    
    bottom-0 md:top-0 md:bottom-auto
    ${showSticky 
      ? "translate-y-0 md:translate-y-0" 
      : "translate-y-full md:-translate-y-full"}
  `}
>
      {/* Product summary */}
      <div className="flex items-center gap-3 overflow-hidden">
        {media?.[0] && (
          <img
            src={media[0].url}
            alt={title}
            className="hidden md:block w-12 h-12 object-cover rounded-md"
          />
        )}
        <div className="truncate">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-gray-500">
            {selectedColor && <span>{selectedColor} • </span>}
            {selectedSize && <span>{selectedSize} • </span>}
            Qty: {qty}
          </p>
        </div>
      </div>

      {/* Add to Cart button */}
      <StickyAtcBtn
        product={{
          id,
          title,
          price,
          description,
          quantity: qty,
          selectedColor: selectedColor ?? undefined,
          selectedSize: selectedSize ?? undefined,
          media,
        }}
      />
    </div>
  );
}
