'use client';

import { addToCart } from '@/redux/cartSlice';
import { useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
import { useRouter } from 'next/navigation';
import { logCartActivity } from "@/lib/cartActivity";

interface MediaType {
  type: string;
  url: string;
}

interface ProductInfoProps {
  id: string;
  title: string;
  price: number;
  description: string;
  media: MediaType[];
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface Product {
  product: ProductInfoProps;
}

function StickyAtcBtn({ product }: Product) {
  const dispatch = useDispatch();
  const router = useRouter();

  const logActivity = () => {
    logCartActivity(product.title);
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    dispatch(toggle());

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      media: product.media.map((m: any) => ({
        url: m.url,
        type: m.type || "image",
      })),
      quantity: product.quantity,
      selectedColor: product.selectedColor ?? undefined,
      selectedSize: product.selectedSize ?? undefined,
    }));

    logActivity(); // ✅ Track add to cart
  };

  const handleBuyNow = (e: any) => {
    e.stopPropagation();

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      media: product.media.map((m: any) => ({
        url: m.url,
        type: m.type || "image",
      })),
      quantity: product.quantity,
      selectedColor: product.selectedColor ?? undefined,
      selectedSize: product.selectedSize ?? undefined,
    }));

    logActivity(); // ✅ Track buy now
    router.push('/checkout');
  };

  const handleOrderOnWhatsApp = () => {
    const phone = "+923240059011";
    const message = `Hi, I'm interested in "${product.title}". Here’s the link: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    // <div className='flex gap-2 flex-wrap'>
      <button
        onClick={handleAddToCart} id='main-atb'
        className="hover:cursor-pointer border-2 inline-block text-sm md:text-md px-4 md:px-6 py-2 text-white border-none bg-[#3C3738] transition-all text-center "
      >
        Add to shopping bag
      </button>
      
  );
}

export default StickyAtcBtn;
/* <button
        onClick={handleBuyNow}
        className="hover:cursor-pointer border-2 inline-block px-6 py-2 text-[#681C1C] bg-[#F5D5D6] transition-all text-center rounded-md border-[#F5D5D6]"
      >
        Buy Now
      </button> */
      /* <button
        onClick={handleOrderOnWhatsApp}
        className="hover:cursor-pointer inline-block bg-teal-600 px-6 py-2 text-white transition-all text-center rounded-md"
      >
        Order On WhatsApp
      </button> */
    // </div>