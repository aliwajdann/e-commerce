"use client";

import { motion, AnimatePresence } from "framer-motion";




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

interface Props {
  product: Product;
   isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}


export function InfoSidebar({ isOpen, onClose, content, product }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar / Drawer */}
          <motion.div
            className="fixed z-50 bg-white rounded-t-2xl md:rounded-none shadow-xl
                       w-full md:w-[400px] h-[60vh] md:h-full
                       bottom-0 md:top-0 md:right-0"
            initial={{ x: "100%", y: "100%" }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: "100%", y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
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
      )}
    </AnimatePresence>
  );
}
