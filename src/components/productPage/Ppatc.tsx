'use client'
import { addToCart } from '@/redux/cartSlice';
import { useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
import { useRouter } from 'next/navigation';

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
  selectedColor?: string;  // <-- add this
  selectedSize?: string;   // <-- and this
}

interface Product {
  product: ProductInfoProps;
}

function Ppatc({ product }: Product) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    dispatch(toggle());
    dispatch(
      addToCart({
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

      })
    );
  };

  const handleBuyNow = (e: any) => {
    e.stopPropagation();
    // dispatch(toggle());
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        media: product.media.map((m: any) => ({
          url: m.url,
          type: m.type || "image",
        })),
        quantity: product.quantity,
      })
    );
    router.push('/checkout');
  };

  const handleOrderOnWhatsApp = () => {
    const phone = "+923240059011"; // Change this to your WhatsApp number
    const message = `Hi, I'm interested in "${product.title}". Here’s the link: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className='flex gap-2 flex-wrap'>
      <button
        onClick={handleAddToCart}
        className="hover:cursor-pointer border-2 inline-block px-6 py-2 text-[#F5D5D6] bg-[#681C1C] transition-all text-center border-[#F5D5D6]  rounded-md"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="hover:cursor-pointer border-2 inline-block px-6 py-2 text-[#681C1C] bg-[#F5D5D6] transition-all text-center rounded-md border-[#F5D5D6]"
      >
        Buy Now
      </button>
      <button
        onClick={handleOrderOnWhatsApp}
        className="hover:cursor-pointer border-2 inline-block px-6 py-2 text-[#F5D5D6] bg-transparent transition-all text-center rounded-md border-[#F5D5D6]"
      >
        Order On WhatsApp
      </button>
    </div>
  );
}

export default Ppatc;
