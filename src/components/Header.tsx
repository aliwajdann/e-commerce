'use client'
import { Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react'
import { selectCartCount } from "@/redux/cartSelectors"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "@/redux/drawerSlice"
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import CartDrawer from "./CartDrawer"
import HeaderBar from './HeaderBar';

export default function Header() {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const { user } = useUser();

  const allowedAdminEmails = ["aliwajdan.it@gmail.com","mominabbbasminhas5@email.com"];
  const isAdmin = user && allowedAdminEmails.includes(user?.primaryEmailAddress?.emailAddress || "");

  useEffect(() => { setHasMounted(true); }, []);

  const handleCartClick = () => dispatch(toggle());
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < lastScrollY - 20 || currentScrollY <= 200) {
            setIsTopBarVisible(true);
          } else if (currentScrollY > lastScrollY + 40 && currentScrollY > 400) {
            setIsTopBarVisible(false);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuItems = ['New In','Lingerie','Sets','Bestsellers','Provocative','Bras','Swim','Nightwear','Hosiery','Gifts','Clothing','Archive'];

  return (
    <>
      {/* Sticky wrapper for both HeaderBar + Header */}
      <div className="sticky top-0 z-50">
        <HeaderBar />
        <header
          className={`bg-white shadow-sm transition-transform duration-200`}
          style={{ transform: isTopBarVisible ? 'translateY(0)' : 'translateY(-66px)' }}
        >
          {/* Desktop Top Section */}
          <div className="hidden lg:block border-gray-100 md:pt-3 md:pb-2">
            <div className="max-w-[90%] mx-auto px-6 md:px-0">
              <div className="flex items-center justify-between h-12">
                <div className="flex space-x-6">
                  <a href="#" className="text-[13px] text-gray-600 hover:text-black">About Us</a>
                  <a href="#" className="text-[13px] text-gray-600 hover:text-black">Help</a>
                </div>
                <div className="flex-1 flex justify-center text-2xl tracking-[0.2em]">VELANO<sup className="text-xs">®</sup></div>
                <div className="flex items-center space-x-4">
                  <SignedIn>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-600">Hi, {user?.firstName || 'User'}!</span>
                      <UserButton appearance={{ elements: { avatarBox: "w-6 h-6 hover:scale-105" } }} />
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <a href="/sign-in" className="p-1 hover:bg-gray-100 rounded"><User className="w-4 h-4 text-gray-700" /></a>
                  </SignedOut>
                  <button className="p-1 hover:bg-gray-100 rounded"><Heart className="w-4 h-4 text-gray-700" /></button>
                  <button onClick={handleCartClick} className="p-1 hover:bg-gray-100 rounded relative">
                    <ShoppingCart className="w-4 h-4 text-gray-700" />
                    {hasMounted && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between h-14 px-4">
            <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 rounded"><Menu className="w-5 h-5 text-gray-700" /></button>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-lg tracking-[0.15em]">VELANO<sup className="text-xs">®</sup></div>
            <div className="flex items-center space-x-3">
              <SignedIn><UserButton appearance={{ elements: { avatarBox: "w-6 h-6 hover:scale-105" } }} /></SignedIn>
              <SignedOut><a href="/sign-in" className="p-1 hover:bg-gray-100 rounded"><User className="w-4 h-4 text-gray-700" /></a></SignedOut>
              <button onClick={handleCartClick} className="p-1 hover:bg-gray-100 rounded relative">
                <ShoppingCart className="w-4 h-4 text-gray-700" />
                {hasMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex justify-center border-t border-gray-100">
            <nav className="flex space-x-8 xl:space-x-10 h-14 items-center">
              {menuItems.map((item, i) => (
                <a key={i} href="#" className="text-[12px] font-[500] text-gray-900 hover:text-gray-600">{item}</a>
              ))}
            </nav>
          </div>
        </header>
      </div>

      {/* Mobile Slide Menu - fullscreen overlay */}
      <div className={`fixed inset-0 z-[9999] w-full h-screen bg-white transform transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-white">
            <span className="text-xl tracking-[0.2em]">Menu</span>
            <button onClick={closeMobileMenu} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
          </div>
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-6 bg-white">
            <nav className="px-6">
              {menuItems.map((item, i) => (
                <a key={i} href="#" onClick={closeMobileMenu} className="block px-4 py-4 border-b text-lg hover:bg-gray-50">{item}</a>
              ))}
            </nav>
            <div className="mt-8 px-6 pt-6 border-t space-y-2 bg-white">
              <a href="#" className="block px-4 py-4 border-b text-gray-600 hover:bg-gray-50">About Us</a>
              <a href="#" className="block px-4 py-4 border-b text-gray-600 hover:bg-gray-50">Help</a>
            </div>
          </div>
          {/* Bottom */}
          <div className="border-t p-6 flex justify-around bg-white">
            <SignedIn>
              <div className="flex flex-col items-center space-y-2">
                <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
                <span className="text-sm">Hi, {user?.firstName || 'User'}!</span>
                {isAdmin && <a href="/admin" className="text-xs text-blue-600">Admin</a>}
              </div>
            </SignedIn>
            <SignedOut>
              <a href="/sign-in" onClick={closeMobileMenu} className="flex flex-col items-center space-y-2">
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-sm">Account</span>
              </a>
            </SignedOut>
            <button className="flex flex-col items-center space-y-2 relative ">
              <Heart className="w-6 h-6 text-gray-600" />
              <span className="text-sm">Wishlist (0)</span>
            </button>
            <button onClick={() => { handleCartClick(); closeMobileMenu(); }} className="flex flex-col items-center space-y-2 relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="text-sm">Cart</span>
              {hasMounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <CartDrawer />
    </>
  );
}
