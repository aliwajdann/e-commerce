"use client";

import { ShoppingBag, CircleUserRound, AlignJustify, X } from "lucide-react";
import { useState, useEffect } from "react";
import { selectCartCount } from "@/redux/cartSelectors";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/redux/drawerSlice";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import CartDrawer from "./CartDrawer";
import HeaderBar from "./HeaderBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const { user } = useUser();

  useEffect(() => setHasMounted(true), []);

  const handleCartClick = () => dispatch(toggle());
  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const closeMenu = () => setIsMenuOpen(false);

  const menuItems = [
    "New In",
    "Lingerie",
    "Sets",
    "Bestsellers",
    "Provocative",
    "Bras",
    "Swim",
    "Nightwear",
    "Hosiery",
    "Gifts",
    "Clothing",
    "Archive",
  ];

  return (
    <>
      <div className="sticky top-0">
        {/* optional top bar */}
        <div className=" z-50 bg-[#CC0D14]">
          <HeaderBar />
        </div>

        {/* Main header */}
        <header className=" bg-white flex items-center justify-between h-14 px-4 md:px-6 text-gray-900 ">
          {/* Left: Hamburger */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Open menu"
              className="flex gap-2 items-center justify-center rounded hover:opacity-80 transition"
            >
              <AlignJustify className="w-5 h-5 text-gray-900" />
              <span className="hidden md:inline">Menu</span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a
              href="/"
              className="inline-block text-sm tracking-[0.18em] font-medium text-gray-900"
            >
              VELANO
              <sup className="text-[10px] text-gray-700">®</sup>
            </a>
          </div>

          {/* Right: Account + Cart */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
            </SignedIn>

            <SignedOut>
              <a href="/sign-in" className="p-1 rounded flex items-center">
                <CircleUserRound className="w-5 h-5 text-gray-900" />
              </a>
            </SignedOut>

            <button
              onClick={handleCartClick}
              className="relative p-1 rounded"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              {hasMounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Side menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* overlay */}
          <div
            className="flex-1 bg-black/50"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* menu panel */}
          <div
            className={`w-full md:w-1/4 bg-white shadow-lg transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <span className="text-md tracking-[0.18em]">Menu</span>
                <button onClick={closeMenu} className="p-2 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Menu items */}
              <nav className="flex-1 overflow-y-auto py-6 text-sm">
                <ul className="px-6 space-y-1">
                  {menuItems.map((m, i) => (
                    <li key={i}>
                      <a
                        onClick={closeMenu}
                        href="#"
                        className="block w-full text-sm py-3 border-b border-gray-100 hover:bg-gray-50"
                      >
                        {m}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 px-6 border-t pt-4 space-y-2">
                  <a
                    onClick={closeMenu}
                    href="#"
                    className="block text-sm py-3 border-b"
                  >
                    About Us
                  </a>
                  <a
                    onClick={closeMenu}
                    href="#"
                    className="block text-sm py-3 border-b"
                  >
                    Help
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
}
