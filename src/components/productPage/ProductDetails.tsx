"use client";

import { useState } from "react";
import { InfoSidebar } from "./InfoSidebar";



let itemCode = 987;

let features = [
    "sdf", "sfa", "sfa", "sfa", "sfa"
]

interface MediaType {
  type: 'image' | 'video';
  url: string;
}

interface ColorVariant {
  colorCode: string;
  colorName: string;
  swatchImage?: string; // optional, if you add swatch images
  images?: MediaType[]; // optional, so you can show color-specific media
}

interface VariantsType {
  sizes: string[];
  colors: ColorVariant[];
}

interface categoryType  {
  slug: string,
  name: string,
}

interface Product {
  id: string;
  title: string;
  price: number;
  category: categoryType;
  originalPrice: number;
  description: string;
  media: MediaType[];
  variants: VariantsType;
}

interface ProductDetailsProps {
  productdetails: Product;
}

export default function ProductDetails({productdetails }: ProductDetailsProps) {

const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<React.ReactNode>(null);
  const infoButtons = [
  { label: "Composition & Care", content: <p>Fabric details...</p> },
  { label: "Traceability", content: <p>Made in Pakistan...</p> },
  { label: "Returns", content:
     <p>30-day return policy... {productdetails.title}</p>,
     },
  { label: "Product availability in store", content: <p>Available in XYZ stores...</p> },
];
  return (
    <div id="custom-product-details" className="py-4 md:py-6 md:px-[36px] pl-[16px] grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-neutral-700 mt-8">
      {/* Description */}
      <div>
        <h3 className="font-medium mb-4 border-b-1 md:pb-4 pb-3">Description</h3>
        <p className="text-xs text-neutral-500 mb-2">Item code: {itemCode}</p>
        <p className="mb-4">{productdetails.description}</p>
        <ul className="space-y-1">
          {features.map((f, i) => (
            <li key={i} className="before:content-['·'] before:mr-1">
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping */}
      <div className="w-full">
        <h3 className="font-medium mb-4 border-b-1 md:pb-4 pb-3">Shipping</h3>
        <div className="space-y-5 w-full">
          <div className="w-full space-y-3">
            <p className="font-medium mb-1.5">Courier delivery</p>
            <div className="flex w-[90%] justify-between items-center">
            <div className="">
            <p className="text-xs text-neutral-500">Standard</p>
            <p className="text-xs text-neutral-500">2-4 working days</p>
            </div>
            <p className="text-xs text-red-900 underline">Free with My Velano</p>
            </div>
            <div className="flex w-[90%] justify-between items-center">
            <div className="">
            <p className="text-xs text-neutral-500 mt-1">Express</p>
            <p className="text-xs text-neutral-500 mt-1">1-2 working days</p>
            </div>
            <p className="text-xs text-red-900 underline">PKR 200.00</p>
            </div>
          </div>

          {/* <div>
            <p className="font-medium mb-1">Store Pick-Up</p>
            <p className="text-xs text-neutral-500">Standard 2-3 working days</p>
            <p className="text-xs">Free of charge</p>
          </div> */}

          {/* <div>
            <p className="font-medium mb-1">Pick-up point</p>
            <p className="text-xs text-neutral-500">Standard 2-4 working days</p>
            <p className="text-xs">Free with My Intimissimi</p>
            <p className="text-xs text-neutral-500 mt-1">Express 1-2 working days</p>
            <p className="text-xs">£5.95</p>
          </div> */}
        </div>
      </div>

      {/* Info Buttons */}
      <div className="space-y-2">
      {infoButtons.map((btn, i) => (
        <button
          key={i}
          onClick={() => {
            setActiveContent(btn.content);
            setIsOpen(true);
          }}
          className="w-full flex justify-between items-center text-left px-4 py-3 text-sm bg-neutral-50 hover:bg-neutral-100 rounded transition"
        >
          <span>{btn.label}</span>
          <span>→</span>
        </button>
      ))}

      <InfoSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={activeContent}
        product={productdetails}
      />
    </div>
    </div>
  );
}
