'use client';
// import ReactMarkdown from 'react-markdown'
import WatchingIndicator from './WatchingIndicator';
import Ppatc from './Ppatc';

import { useState } from "react";

interface MediaType {
  type: 'image' | 'video' | 'string';
  url: string;
}

interface ProductInfoProps {
  id: string;
  title: string;
  price: number;
  originalprice: number;
  description: string;
  media: MediaType[];
}

export default function ProductInfo({
  id,
  title,
  price,
  description,
  media,
  originalprice,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
   const featureList = description.split('\n')

  return (
    <div className="space-y-3 p-4">
      <div className="space-y-1">
      <div className="">
        <h1 style={{ textTransform: 'capitalize' }} className="md:text-[28px] text-[24px] font-semibold text-gray-800">
          {title}
        </h1>
   </div>
 <div className="flex items-center gap-2">
          {originalprice && (
            <span className="block   text-gray-400 md:text-[34px] text-[30px] line-through">
              Rs.{originalprice.toFixed(2)}
            </span>
          )}
          <span className=" md:text-[34px] text-[30px] text-blue-600">Rs.{price.toFixed(2)}</span>
      </div>
        
      </div>

      <div className="flex gap-2 items-center">
        <button className="bg-purple-800 text-[10px] px-1 py-0.5 hover:cursor-pointer   text-white border-none outline-none rounded-sm">
          baadmay
        </button>
        <p className="font-medium text-[12px] ">Pay in Three Installments of</p>
        <p className="text-purple-800 font-bold text-sm ">Rs.{(price / 3).toFixed(2)}</p>
      </div>

      <p className="text-base-dark text-sm">SKU: E1680-A-GRADE</p>

      <div className="mt-4 flex items-center gap-4">
        <div className="p-1 flex items-center justify-between gap-4  overflow-hidden text-base-dark">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="hover:cursor-pointer font-bold bg-dark px-2 text-white hover:bg-gray-200 transition rounded-full"
          >
            -
          </button>
          <span className="px-3 py-1 w-8 text-center text-base-dark">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="hover:cursor-pointer font-bold px-2 bg-dark text-white hover:bg-gray-200 transition rounded-full"
          >
            +
          </button>
        </div>
      </div>

     <Ppatc product={{
  id,
  title,
  price,
  description,
  quantity,
  media: media.map((m) => ({
    url: m.url,
    type: m.type || "image",
  })),
}} />

<WatchingIndicator />
     <div className="leading-relaxed text-muted">
        {/* <ReactMarkdown>{description}</ReactMarkdown> */}
        <ul className="list-disc pl-5 space-y-1 text-[#737373] md:text-[15px] text-[14px] font-normal">
      {featureList.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
      </div>
    </div>
  );
}
