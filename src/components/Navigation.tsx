'use client'; // if you're in the app folder
import { useEffect, useState } from 'react';
import { selectCartCount } from "@/redux/cartSelectors"; // update path
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
import AnimatedLink from "./AnimatedLink"; // adjust path
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import logo from "@/logo.png"
import Image from 'next/image';



import Link from 'next/link';
import CartDrawer from "./CartDrawer";

import { ShoppingCart } from 'lucide-react';



function Navigation() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  // const [open, setOpen] = useState(false);
  // const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {
  setHasMounted(true);
}, []);


    
  // useEffect(() => {
  //   const root = document.documentElement;
  //   isDark ? root.classList.add('dark') : root.classList.remove('dark');
  // }, [isDark]);

  return (
    <>
     <header className="bg-light dark:bg-dark text-base-dark dark:text-base-light shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link style={{fontFamily: "cursive"}} prefetch href="/" className="after text-2xl font-bold text-primary">
          <Image src={logo} alt="" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium relative">
  <Link href="/">Home</Link>
  <Link href="/products">Shop</Link>
  <Link href="/about">About</Link>
  <SignedIn>
  <UserButton />
</SignedIn>
<SignedOut>
  <a href="/sign-in">Sign In</a>
</SignedOut>

  <div className="relative">
    <ShoppingCart
      onClick={() => dispatch(toggle())}
      className="hover:cursor-pointer hover:text-primary transition"
    />
    {hasMounted && cartCount > 0 && (
      <span className="absolute -top-3 -right-3 bg-dark text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </div>
</nav>

 {/* <button
      onClick={() => setIsDark(!isDark)}
      className="px-4 py-2 fixed rounded-md bg-primary text-white mt-4 text-sm right-12 top-16"
    >
      {isDark ? 'Light' : 'Dark'} Mode
    </button> */}

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden focus:outline-none hover:cursor-pointer font-extrabold text-blue-800 text-xl"
        >
          {/* <svg
            className="w-6 h-6 fill-current text-primary"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg> */}
          :
          
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-light dark:bg-dark text-base-dark dark:text-base-light shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-muted">
          <span className="text-xl font-bold text-primary">Menu</span>
          <button onClick={() => setIsOpen(false)} className="text-xl font-bold">
            × 
          </button>
        </div>

        <nav className="flex flex-col gap-6 p-6 text-base font-medium">
          <Link prefetch href="/" onClick={() => setIsOpen(false)} className="hover:text-primary">Home</Link>
          <Link prefetch href="/products" onClick={() => setIsOpen(false)} className="hover:text-primary">Shop</Link>
          <Link prefetch href="/about" onClick={() => setIsOpen(false)} className="hover:text-primary">About</Link>
          {/* <Link href="/category/tshirt" onClick={() => setIsOpen(false)} className="hover:text-primary">T-Shirts</Link> */}
          <Link prefetch href="/contact" onClick={() => setIsOpen(false)} className="hover:text-primary">Contact</Link>
        </nav>
      </div>

      {/* Overlay */}
      {/* {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
        />
      )} */}
    </header>
    <div className="header-spacer h-16"></div>
     {typeof window !== "undefined" && <CartDrawer />}
  
    </>
  )
}

export default Navigation






 
