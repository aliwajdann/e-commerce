"use client";

import { useState } from "react";

interface ProductDescriptionProps {
  description: string;
//   itemCode: string;
//   features: string[];
}

const infoButtons = [
  "Composition & Care",
  "Traceability",
  "Returns",
  "Product availability in store",
];
let itemCode = 987;

let features = [
    "sdf", "sfa", "sfa", "sfa", "sfa"
]
export default function ProductDetails({
  description,
//   itemCode,
//   features,
}: ProductDescriptionProps) {
  return (
    <div className="py-4 md:py-6 md:px-[36px] pl-[16px] grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-neutral-700 mt-8">
      {/* Description */}
      <div>
        <h3 className="font-medium mb-4 border-b-1 md:pb-4 pb-3">Description</h3>
        <p className="text-xs text-neutral-500 mb-2">Item code: {itemCode}</p>
        <p className="mb-4">{description}</p>
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
            className="w-full flex justify-between items-center text-left px-4 py-3 text-sm bg-neutral-50 hover:bg-neutral-100 rounded transition"
          >
            <span>{btn}</span>
            <span>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
