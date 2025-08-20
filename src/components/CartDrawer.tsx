"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toggle } from "@/redux/drawerSlice";
import Link from "next/link";

export default function CartDrawer() {
  const isOn = useSelector((state: RootState) => state.toggle.value);
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // --- Money logic (PKR) ---
  const freeShippingThreshold = 3000; // PKR
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0),
    [items]
  );
  const deliveryFee = subtotal > 0 && subtotal < freeShippingThreshold ? 200 : 0;
  const total = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  useEffect(() => {
    // keep your side-effects (if any) consistent
    isOn ? "hidden" : "auto";
  }, [isOn]);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
            onClick={() => dispatch(toggle())}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOn && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.28 }}
            className="fixed top-0 right-0 w-full max-w-md h-screen bg-white shadow-xl z-50 flex flex-col"
            role="dialog"
            aria-label="Cart drawer"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b flex justify-between items-center">
              <h2 className="text-base font-medium text-neutral-900">
                Your bag <span className="text-xs text-neutral-500">({items.length})</span>
              </h2>
              <button
                aria-label="Close cart"
                onClick={() => dispatch(toggle())}
                className="p-1 rounded hover:bg-neutral-100"
              >
                <X className="w-5 h-5 text-neutral-800" />
              </button>
            </div>

            {/* Promo (static UI like screenshot) */}
            <div className="px-5 pt-4">
              <div className="rounded border border-neutral-200 p-3">
                <span className="inline-block bg-red-600 text-white text-[10px] px-2 py-1 rounded">
                  Buy 5 get 70% off
                </span>
                <div className="mt-2">
                  <button className="text-xs text-neutral-800 underline inline-flex items-center gap-1">
                    Complete the Promo <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-neutral-700 mt-16 text-sm"
                >
                  🛒 Your cart is empty
                </motion.p>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                  className="space-y-5"
                >
                  {items.map((item, idx) => {
                    const imageUrl =
                      item.media?.find((m: any) => m.type === "image")?.url || "/placeholder.png";

                    // ✅ unique key even for same product with different variants
                    const key = `${item.id}-${item.selectedSize || "nosize"}-${item.selectedColor || "nocolor"}-${idx}`;

                    // const hasOriginal =
                      // typeof item.originalPrice === "string" &&
                      // item.originalprice > (item.price || 0);

                    return (
                      <motion.div
                        key={key}
                        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                        className="flex gap-3 pb-5 border-b border-neutral-200"
                      >
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded border border-neutral-200"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm text-neutral-900 font-medium truncate">
                              {item.title}
                            </h3>

                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              className="shrink-0 w-7 h-7 grid place-items-center rounded-full border border-neutral-300 hover:bg-neutral-100"
                              aria-label="Remove item"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5 text-neutral-700" />
                            </button>
                          </div>

                          {/* Size + Price line (compact like screenshot) */}
                          <p className="text-xs text-neutral-600 mt-1">
                            {item.selectedSize && <>Size: {item.selectedSize} &nbsp;&nbsp;</>}
                            Price:&nbsp;
                            <span className="text-neutral-900 font-medium">
                              Rs.{(item.price || 0).toFixed(0)}
                            </span>
                            {/* {hasOriginal && (
                              <span className="text-neutral-400 line-through ml-2">
                                Rs.{item.originalPrice.toFixed(0)}
                              </span> */}
                            {/* )} */}
                          </p>

                          {/* Optional color row */}
                          {item.selectedColor && (
                            <p className="text-xs text-neutral-600 mt-0.5">
                              Color: {item.selectedColor}
                            </p>
                          )}

                          {/* "+ Add another" link (UI only) */}
                          {/* <button className="mt-1 text-xs underline text-neutral-800">
                            + Add another
                          </button> */}

                          {/* Qty control row */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="inline-flex items-center border border-neutral-300">
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: Math.max(1, (item.quantity || 1) - 1),
                                    })
                                  )
                                }
                                className="px-2 py-1 text-neutral-700 hover:bg-neutral-100 text-sm"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="px-3 py-1 text-sm text-neutral-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: (item.quantity || 1) + 1,
                                    })
                                  )
                                }
                                className="px-2 py-1 text-neutral-700 hover:bg-neutral-100 text-sm"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 pt-2 pb-4 border-t border-neutral-200">
              {/* (Skip suggested products section per your ask) */}

              {/* Free shipping progress + text */}
              <p className="text-xs text-neutral-700 mb-2">
                {remainingForFree > 0
                  ? `Add Rs.${remainingForFree.toFixed(
                      0
                    )} to get Free Standard Shipping over Rs.${freeShippingThreshold}`
                  : "You’ve unlocked Free Standard Shipping 🎉"}
              </p>
              <div className="h-1 w-full bg-neutral-200 rounded overflow-hidden mb-4">
                <div
                  className="h-1 bg-neutral-900"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Checkout button with total (like screenshot) */}
              <Link prefetch href="/checkout" onClick={() => dispatch(toggle())}>
                <button className="w-full bg-neutral-900 text-white py-3 rounded text-sm">
                  Rs.{total.toFixed(0)} – Checkout
                </button>
              </Link>

              {/* Go to bag */}
              <Link
                href="/cart"
                onClick={() => dispatch(toggle())}
                className="block text-center text-sm text-neutral-800 mt-3 py-2 border border-neutral-200 rounded hover:bg-neutral-50"
              >
                Go to bag
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
