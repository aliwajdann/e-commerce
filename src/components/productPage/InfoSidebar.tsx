"use client";

import { motion } from "framer-motion";

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
}

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

export function InfoSidebar({ isOpen, onClose, content }: Props) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Sidebar / Drawer */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : "100%",
          y: isOpen ? 0 : "100%", // mobile slides up, desktop slides from right
        }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed z-50 bg-white rounded-t-2xl md:rounded-none shadow-xl
                   w-full md:w-[400px] h-[60vh] md:h-full
                   bottom-0 md:top-0 md:right-0 flex flex-col"
      >
        <div className="p-4 overflow-y-auto h-full">
          <button
            onClick={onClose}
            className="text-sm mb-4 underline"
          >
            Close
          </button>
          {content}
        </div>
      </motion.div>
    </>
  );
}
