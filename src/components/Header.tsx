'use client'
import { Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react'
import { selectCartCount } from "@/redux/cartSelectors"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "@/redux/drawerSlice"
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import CartDrawer from "./CartDrawer"
import Image from 'next/image'
import logo from '@/logo-v.png'

export default function Header() {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Redux and Auth integration
  const dispatch = useDispatch(); // Add this import: import { useDispatch } from "react-redux"
  const cartCount = useSelector(selectCartCount); // Add this import: import { selectCartCount } from "@/redux/cartSelectors"
  const { user } = useUser(); // Add this import: import { useUser } from "@clerk/nextjs"

  const allowedAdminEmails = [
    "aliwajdan.it@gmail.com", 
    "mominabbbasminhas5@email.com"
  ];

  const isAdmin = user && allowedAdminEmails.includes(user?.primaryEmailAddress?.emailAddress || "");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleCartClick = () => {
    dispatch(toggle()); // Add this import: import { toggle } from "@/redux/drawerSlice"
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        // Scrolling up or near top - show top bar
        setIsTopBarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide top bar
        setIsTopBarVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    'New In', 'Lingerie', 'Sets', 'Bestsellers', 'Provocative', 
    'Bras', 'Swim', 'Nightwear', 'Hosiery', 'Gifts', 'Clothing', 'Archive'
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Section - Desktop Only */}
      <div className='h-8 bg-black text-white text-center flex items-center justify-center'>hey</div>
      <div 
        className={`hidden lg:block transition-all duration-500 ease-out overflow-hidden ${
          isTopBarVisible ? 'max-h-20 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >
        <div className="border-gray-100 md:pt-3 md:pb-2">
          <div className="max-w-[90%] mx-auto  px-6 md:px-0">
            <div className="flex items-center justify-between h-12">
              {/* Left Links */}
              <div className="flex space-x-6">
                <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors">
                  About Us
                </a>
                <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors">
                  Help
                </a>
              </div>

              {/* Logo */}
              <div className="flex-1 flex justify-center">
                <div className="text-xl font-light tracking-[0.2em] text-black">
                  VELANO<sup className="text-xs">®</sup>
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                {/* Account - Desktop */}
                <SignedIn>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-600">Hi, {user?.firstName || 'User'}!</span>
                    <UserButton appearance={{ elements: { avatarBox: "w-6 h-6 hover:scale-105 transition-transform" } }} />
                  </div>
                </SignedIn>
                <SignedOut>
                  <a href="/sign-in" className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <User className="w-4 h-4 text-gray-700" />
                  </a>
                </SignedOut>
                
                <button className="p-1 hover:bg-gray-100 rounded transition-colors relative">
                  <Heart className="w-4 h-4 text-gray-700" />
                </button>
                
                {/* Cart */}
                <button 
                  onClick={handleCartClick}
                  className="p-1 hover:bg-gray-100 rounded transition-colors relative"
                >
                  <ShoppingCart className="w-4 h-4 text-gray-700" />
                  {hasMounted && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header - Single Line */}
          <div className="flex items-center justify-between h-14 lg:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile Logo - Always Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="text-lg font-light tracking-[0.15em] text-black">
                VELANO<sup className="text-xs">®</sup>
              </div>
            </div>

            {/* Mobile Icons - Always Visible */}
            <div className="flex items-center space-x-3">
              {/* Account - Mobile */}
              <SignedIn>
                <UserButton appearance={{ elements: { avatarBox: "w-6 h-6 hover:scale-105 transition-transform" } }} />
              </SignedIn>
              <SignedOut>
                <a href="/sign-in" className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <User className="w-4 h-4 text-gray-700" />
                </a>
              </SignedOut>
              
              {/* Cart - Mobile */}
              <button 
                onClick={handleCartClick}
                className="p-1 hover:bg-gray-100 rounded transition-colors relative"
              >
                <ShoppingCart className="w-4 h-4 text-gray-700" />
                {hasMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-14">
            {/* Desktop Menu */}
            <nav className="flex flex-1 justify-center">
              <div className="flex space-x-8 xl:space-x-10">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-[12px] font-[500] text-gray-900 hover:text-gray-600 transition-colors whitespace-nowrap"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white border-t border-gray-100`}>
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block text-base font-medium text-gray-900 hover:text-gray-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <a href="#" className="block text-sm text-gray-600 hover:text-black py-2">About Us</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-black py-2">Help</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu - Full Width */}
      <div className={`fixed inset-y-0 left-0 z-60 w-full bg-white transform transition-transform duration-500 ease-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="text-xl font-light tracking-[0.2em] text-black">
              Menu
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-6 space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between px-4 py-4 text-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item}</span>
                </a>
              ))}
            </nav>

            {/* Additional Links */}
            <div className="mt-8 px-6 pt-6 border-t border-gray-200">
              <div className="space-y-1">
                <a href="#" className="flex items-center px-4 py-4 text-base text-gray-600 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  About Us
                </a>
                <a href="#" className="flex items-center px-4 py-4 text-base text-gray-600 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  Help
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-center space-x-8">
              {/* Account */}
              <SignedIn>
                <div className="flex flex-col items-center space-y-2 p-4">
                  <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 hover:scale-105 transition-transform" } }} />
                  <span className="text-sm text-gray-900">Hi, {user?.firstName || 'User'}!</span>
                  {isAdmin && (
                    <a href="/admin" className="text-xs text-blue-600 hover:underline">
                      Admin
                    </a>
                  )}
                </div>
              </SignedIn>
              <SignedOut>
                <a 
                  href="/sign-in" 
                  className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-6 h-6 text-gray-600" />
                  <span className="text-sm text-gray-900">Account</span>
                </a>
              </SignedOut>
              
              {/* Wishlist */}
              <button className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-lg transition-colors relative">
                <Heart className="w-6 h-6 text-gray-600" />
                <span className="text-sm text-gray-900">Wishlist (0)</span>
              </button>

              {/* Cart */}
              <button 
                onClick={() => {
                  handleCartClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-lg transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="text-sm text-gray-900">Cart</span>
                {hasMounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        </div>

      {/* Drawer Component */}
<CartDrawer />

    </header>
  );
}