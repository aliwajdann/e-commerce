'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { selectCartCount } from "@/redux/cartSelectors"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "@/redux/drawerSlice"
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import CartDrawer from "./CartDrawer"
// import logoDesign from "@/logo-design.png"
import Image from 'next/image'

import logo from '@/logo-v.png'
const NewHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)
  const { user } = useUser()
const allowedAdminEmails = [
  "aliwajdan.it@gmail.com", 
  "yourcousin@email.com"
];

const isAdmin = user && allowedAdminEmails.includes(user?.primaryEmailAddress?.emailAddress || "");

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-6xl z-50 transition-all duration-300 bg-black/60 ${
        isScrolled 
          // ? 'bg-white/15 backdrop-blur-[25px]' 
          // ? 'bg-[#681C1C] backdrop-blur-[200px]' 
          // : 'bg-white/10 backdrop-blur-[20px]'
      } border border-white/20 rounded-full px-4 py-2 flex items-center justify-between  hover:shadow-lg hover:shadow-black/10 md:top-5 md:w-[calc(100%-2.5rem)] sm:top-4 sm:w-[calc(100%-1.875rem)] sm:px-5 sm:py-3`}>
        
        {/* Left Navigation */}
        <div className="flex items-center gap-8 md:gap-5">
          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={toggleMobileMenu}
            className={`md:hidden flex flex-col p-1 transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <span className="w-5 h-0.5 bg-white/80 mb-0.5 transition-all duration-300 rounded-sm hover:bg-white" />
            <span className="w-5 h-0.5 bg-white/80 mb-0.5 transition-all duration-300 rounded-sm hover:bg-white" />
            <span className="w-5 h-0.5 bg-white/80 transition-all duration-300 rounded-sm hover:bg-white" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 lg:gap-8 md:gap-5">
            <Link 
              href="/category/jewellery" 
              className="text-white/90 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-white hover:-translate-y-0.5 relative group"
            >
              Jewellery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              href="/category/skincare" 
              className="text-white/90 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-white hover:-translate-y-0.5 relative group"
            >
              Skin Care
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              href="/category/undergarments" 
              className="text-white/90 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-white hover:-translate-y-0.5 relative group"
            >
              Under Garments
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="block">
            <div className="bg-transparent w-12 h-10 md:w-15 md:h-10 rounded-2xl flex items-center justify-center  transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              {/* <div className="relative w-6 h-6 sm:w-5 sm:h-5"> */}
              {/* <div className="relative w-full  rounded-2xl"> */}
                {/* Custom geometric logo */}
                 {/* <div className="absolute top-0 left-0 w-3 h-3 bg-gray-800 transform rotate-45" /> 
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-800 transform rotate-45" />  */}
               <Image
            src={logo} 
            alt='logo'
            className='rounded-2xl'
          /> 
              {/* </div> */}
            </div>
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-8 md:gap-5">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 lg:gap-8 md:gap-5">
            <Link 
              href="/about" 
              className="text-white/90 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-white hover:-translate-y-0.5 relative group"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              href="/contact" 
              className="text-white/90 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-white hover:-translate-y-0.5 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Authentication - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
  <SignedIn>
    {isAdmin && (
      <Link
        href="/admin"
        className="text-white/90 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-white hover:-translate-y-0.5 relative group"
      >
        Admin
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
      </Link>
    )}
    <div className="flex items-center space-x-3">
      <span className="text-sm text-white/90">
        Hi, {user?.firstName || "User"}!
      </span>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8 hover:scale-105 transition-transform",
          },
        }}
      />
    </div>
  </SignedIn>
    </div>


          {/* Cart */}
          <div className="relative">
            <button 
              onClick={() => dispatch(toggle())}
              className="w-9 h-9 sm:w-8 sm:h-8 bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white" />
            </button>
            {hasMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#681C1C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
     <div className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-[20px] transition-all duration-300 md:hidden ${
  isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
}`}>
  <div className="flex flex-col h-full overflow-y-auto pt-24 pb-20 px-6 gap-10 items-center">

        {/* Close Button */}
        <button
          onClick={closeMobileMenu}
          className="absolute top-20 right-8 text-white text-3xl transition-all duration-300 hover:text-pink-400 hover:rotate-90"
        >
          ×
        </button>

        {/* Mobile Authentication Section */}
        <nav className="flex flex-col items-center gap-8">
  ...
  <SignedIn>
    {isAdmin && (
      <Link 
        href="/admin" 
        onClick={closeMobileMenu}
        className="text-white text-2xl font-medium uppercase tracking-wide transition-all duration-300 hover:text-pink-400 hover:scale-110"
      >
        Admin
      </Link>
    )}
  </SignedIn>
</nav>


        {/* Mobile Navigation Links */}
        <nav className="flex flex-col items-center gap-8">
          <Link 
            href="/category/jewellery" 
            onClick={closeMobileMenu}
            className="text-white text-2xl font-medium uppercase tracking-wide transition-all duration-300 hover:text-pink-400 hover:scale-110"
          >
            Jewellery
          </Link>
          <Link 
            href="/category/skin-care" 
            onClick={closeMobileMenu}
            className="text-white text-2xl font-medium uppercase tracking-wide transition-all duration-300 hover:text-pink-400 hover:scale-110"
          >
            Skin Care
          </Link>
          <Link 
            href="/category/under-garments" 
            onClick={closeMobileMenu}
            className="text-white text-2xl font-medium uppercase tracking-wide transition-all duration-300 hover:text-pink-400 hover:scale-110"
          >
            Under Garments
          </Link>
          <Link 
            href="/about" 
            onClick={closeMobileMenu}
            className="text-white text-2xl font-medium uppercase tracking-wide transition-all duration-300 hover:text-pink-400 hover:scale-110"
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            onClick={closeMobileMenu}
            className="text-white text-2xl font-medium uppercase tracking-wide transition-all duration-300 hover:text-pink-400 hover:scale-110"
          >
            Contact
          </Link>
           <SignedIn>
                <Link href="/admin">Admin</Link>
            </SignedIn>
          
        </nav>
        <div className="hidden md:flex items-center">
            <SignedIn>
                <Link href="/admin">Admin</Link>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-white/90">
                  Hi, {user?.firstName || "User"}!
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 hover:scale-105 transition-transform"
                    }
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <Link 
                href="/sign-in" 
                className="flex items-center gap-2 text-white/90 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-white hover:-translate-y-0.5 relative group"
              >
                <User className="w-4 h-4" />
                Account
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </SignedOut>
          </div>


        {/* Mobile Cart Info */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={() => {
              dispatch(toggle())
              closeMobileMenu()
            }}
            className="flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white/30 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {hasMounted && cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      </div>

      {/* Click Outside to Close Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Cart Drawer */}
      {typeof window !== "undefined" && <CartDrawer />}
    </>
  )
}

export default NewHeader