"use client";

import { useState } from "react";


interface MediaType {
  type: "image" | "video";
  url: string;
}
interface ColorVariant {
  colorCode: string;
  colorName: string;
  swatchImage?: string;
  images?: MediaType[];
}
interface VariantsType {
  sizes: string[];
  colors: ColorVariant[];
}
interface categoryType {
  slug: string;
  name: string;
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
  productCode: string;
  features: string[];
}
interface ProductDetailsProps {
  productdetails: Product;
}

export default function ProductDetails({ productdetails }: ProductDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<React.ReactNode>(null);

  const infoButtons = [
    { label: "Composition & Care", content: <p>Fabric details...</p> },
    { label: "Traceability", content: <p>Made in Pakistan...</p> },
    {
      label: "Returns",
      content: <>
       <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-md font-bold mb-4">Return & Refund Policy</h1>
      <ul className="text-sm list-disc pl-5 space-y-3 text-gray-700 ">
        <li className="text-xs">You can return the product within 7 days of receiving it.</li>
        <li className="text-xs">The item must be unused, with tags, and in original packaging.</li>
        <li className="text-xs">If there’s a defect or issue, contact us via WhatsApp for resolution.</li>
        <li className="text-xs">Refunds are processed within 5–7 business days after we receive the item.</li>
        <li className="text-xs">Return shipping will be handled by us in case of damaged/wrong product.</li>
      </ul>
    </div>
       </>,
    },
    {
      label: "Product availability in store",
      content: <p>Available in XYZ stores...</p>,
    },
  ];

  return (
    <div
      id="custom-product-details"
      className="py-4 md:py-6 md:px-[36px] pl-[16px] grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-neutral-700 mt-8"
    >
      {/* Description */}
      <div>
        <h3 className="font-medium mb-4 border-b-1 md:pb-4 pb-3">Description</h3>
        <p className="text-xs text-neutral-500 mb-2">Item code: {productdetails.productCode}</p>
        <p className="mb-4">{productdetails.description}</p>
        <ul className="space-y-1">
          {productdetails.features?.map((f, i) => (
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
              <div>
                <p className="text-xs text-neutral-500">Standard</p>
                <p className="text-xs text-neutral-500">2-4 working days</p>
              </div>
              <p className="text-xs text-red-900 underline">
                Free with My Velano
              </p>
            </div>
            <div className="flex w-[90%] justify-between items-center">
              <div>
                <p className="text-xs text-neutral-500 mt-1">Express</p>
                <p className="text-xs text-neutral-500 mt-1">1-2 working days</p>
              </div>
              <p className="text-xs text-red-900 underline">PKR 200.00</p>
            </div>
          </div>
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
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed z-50 bg-white rounded-t-2xl md:rounded-none shadow-xl
                    w-full md:w-[400px] h-[60vh] md:h-full
                    bottom-0 md:top-0 md:right-0 flex flex-col
                    transform transition-transform duration-500
                    ${
                      isOpen
                        ? "translate-x-0 translate-y-0"
                        : "translate-x-full md:translate-x-full translate-y-full md:translate-y-0"
                    }`}
      >
        <div className="p-4 overflow-y-auto h-full">
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm mb-4 underline"
          >
            Close
          </button>
          {activeContent}
        </div>
      </div>
    </div>
  );
}
