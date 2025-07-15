'use client'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/Velano.png'
import {  ShoppingCart } from 'lucide-react';
import { selectCartCount } from "@/redux/cartSelectors";
import { useSelector, useDispatch } from "react-redux";
import CartDrawer from "../components/CartDrawer";
import { toggle } from "@/redux/drawerSlice";
import { useState, useEffect } from 'react';


  


export default function VelanoHeader() {
const [hasMounted, setHasMounted] = useState(false);
useEffect(() => {
    setHasMounted(true);
  }, []);
   const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  return (
    <header className="sticky top-0 z-50  bg-white shadow-sm ">
      {/* bg-[#d9d9d9] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo} // Make sure this exists in public folder
            alt="Velano"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="text-[#737373] font-semibold text-lg tracking-wide">
            VELANO
          </span>
        </Link>

        {/* Cart Icon (optional) */}
        {/* <Link href="/cart" className="text-[#737373] hover:text-black">
          <ShoppingBag size={22} />
        </Link> */}
         {/* Cart */}
                      <div className="relative">
                        <button 
                          onClick={() => dispatch(toggle())}
                          className="flex items-center text-gray-700 hover:text-gray-900 group"
                        >
                          <ShoppingCart className="hover:cursor-pointer h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="ml-1"></span>
                        </button>
                        {hasMounted && cartCount > 0 && (
                          <span className="hover:cursor-pointer absolute -top-3.5 -right-2 bg-gray-800 text-white text-xs font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </div>
      </div>
      {/* Cart Drawer */}
            {typeof window !== "undefined" && <CartDrawer />}
    </header>
  )
}
