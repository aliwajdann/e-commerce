'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, X, ShoppingCart } from 'lucide-react';
import { selectCartCount } from "@/redux/cartSelectors";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import logo from "@/Velano.png";
import CartDrawer from "./CartDrawer";

const desktopNavItems = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/products" },
  { name: "CONTACT", href: "/contact" },
  { name: "CASUAL AND STYLISH", href: "/category/casual-stylish-tshirts" },
  { name: "SUMMER READY SHORTS", href: "/category/summer-ready-looks-shorts" },
  { name: "TRENDING AND MODERN", href: "/category/trending-modern" },
  // { name: "WINTER SALE", href: "/winter-sale" }
];

const mobileNavItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Contact", href: "/contact" },
  ...desktopNavItems.slice(3) // Add the special collections
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const { scrollY } = useScroll();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const { user } = useUser();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (showSearch && !event.target.closest('.search-container')) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  // Handle scroll to hide/show header
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Check if at top of page
    setAtTop(latest === 0);
    
    // Hide/show header based on scroll direction and position
    if (latest < previous && latest > 150) {
      // Scrolling up and not near top
      setHidden(false);
    } else if (latest > 100 && latest > previous) {
      // Scrolling down and past threshold
      setHidden(true);
    } else if (latest <= 100) {
      // Near top of page
      setHidden(false);
    }
  });

  // WhatsApp function with random number
  const handleWhatsAppClick = () => {
    // const randomNumbers = Math.floor(1000000000 + Math.random() * 9000000000);
    window.open(`https://wa.me/+923240059011`, '_blank');
  };

  // Handle search toggle
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="hidden md:block fixed w-full z-50 bg-white"
      >
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex justify-end items-center py-4">
            <Link href="/" className="hover:scale-105 transition-transform w-1/4"> 
              {logo ? (
                <Image src={logo} alt="Logo" width={120} height={40} />
              ) : (
                <span className="text-2xl font-bold text-gray-900 dark:text-white">Kayseria</span>
              )}
            </Link>
            
            <div className="flex items-center space-x-6">
              {/* Search */}
              <div className="relative search-container">
                <button 
                  onClick={toggleSearch}
                  className="hover:cursor-pointer flex items-center text-gray-700 hover:text-gray-900 group"
                >
                  <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="ml-1">Search</span>
                </button>
                
                {/* Search Input */}
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className=" absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-3 border border-gray-200"
                    >
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* WhatsApp */}
              <button 
                onClick={handleWhatsAppClick}
                className="hover:cursor-pointer flex items-center text-gray-700 hover:text-gray-900 group"
              >
                <ShoppingBag className="hover:cursor-pointer h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="ml-1">WhatsApp</span>
              </button>
              
              {/* User Authentication */}
              <SignedIn>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Welcome, {user?.firstName || "User"}!
                  </span>
                  <UserButton />
                </div>
              </SignedIn>
              <SignedOut>
                <Link 
                  href="/sign-in" 
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Link>
              </SignedOut>
              
        
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
          </div>
          
          {/* Main Navigation */}
          <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ 
              y: hidden ? -20 : 0,
              opacity: hidden ? 0 : 1
            }}
            transition={{ 
              type: "spring",
              damping: 15,
              delay: hidden ? 0 : 0.2
            }}
            className="flex justify-center py-4"
          >
            <ul className="flex space-x-8">
              {desktopNavItems.map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ 
                    y: -3,
                    scale: 1.05,
                    color: "#ef4444"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={item.href} 
                    className="text-sm font-medium uppercase tracking-wider text-gray-900 transition-colors hover:text-teal-600"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="md:hidden fixed w-full z-50 bg-white"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-900 hover:scale-110 transition-transform"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link href="/" className="hover:scale-105 transition-transform">
            {logo ? (
              <Image src={logo} alt="Logo" width={100} height={32} />
            ) : (
              <span className="text-xl font-bold text-gray-900">Kayseria</span>
            )}
          </Link>
          
          <div className="flex items-center space-x-4">
            <Search 
              className="h-5 w-5 text-gray-700 hover:scale-110 transition-transform cursor-pointer" 
              onClick={toggleSearch}
            />
            <div className="relative">
              <ShoppingCart
                onClick={() => dispatch(toggle())}
                className="h-5 w-5 text-gray-700 hover:cursor-pointer hover:text-teal-600 transition"
              />
              {hasMounted && cartCount > 0 && (
                <span className="absolute -top-2.5 -right-3 bg-gray-800 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 px-4 py-3"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl"
            >
              <div className="flex justify-between items-center p-4  border-gray-200">
                <Link 
                  href="/" 
                  className="text-xl font-bold text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {logo ? (
                    <Image src={logo} alt="Logo" width={80} height={28} />
                  ) : (
                    "Kayseria"
                  )}
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:rotate-90 transition-transform"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="p-4">
                {/* User Section */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <SignedIn>
                    <div className="flex items-center space-x-3 mb-3">
                      <UserButton />
                      <span className="text-gray-700">
                        {user?.firstName || "User"}
                      </span>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <Link
                      href="/sign-in"
                      className="block py-2 text-teal-600 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </SignedOut>
                </div>

                <ul className="space-y-4 ">
                  {mobileNavItems.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        href={item.href}
                        className="block py-2 text-gray-900 font-medium uppercase hover:text-teal-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* WhatsApp Button */}
                <div className="mt-6 pt-4 border-gray-200">
                  <button
                    onClick={() => {
                      handleWhatsAppClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>WhatsApp Order</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-28"></div>
      
      {/* Cart Drawer */}
      {typeof window !== "undefined" && <CartDrawer />}
    </>
  );
}