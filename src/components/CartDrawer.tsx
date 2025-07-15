"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import { X } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toggle } from "@/redux/drawerSlice";
import Link from "next/link";

export default function CartDrawer( ) {
  const isOn = useSelector((state: RootState) => state.toggle.value);
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  useEffect(() => {
     isOn ? "hidden" : "auto";
  }, []);

  return (
    <>
      {/* Overlay with animation */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => dispatch(toggle())}
          />
        )}
      </AnimatePresence>

      {/* Drawer with animation */}
      <AnimatePresence>
        {isOn && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-base-dark">Shopping Cart</h2>
              <button onClick={()=> dispatch(toggle())}>
                <X className="w-6 h-6 text-base-dark" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="mb-4 text-sm text-gray-500">
                {items.length} {items.length === 1 ? "item" : "items"}
              </div>

              {items.length === 0 ? (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-base-dark mt-20"
                >
                  🛒 Your cart is empty
                </motion.p>
              ) : (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {items.map((item) => {
                    const imageUrl =
                      item.media?.find((media) => media.type === "image")?.url || "/placeholder.png";

                    return (
                      <motion.div
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="flex gap-4 pb-6 mb-6 border-b"
                      >
                        <img
                          src={imageUrl}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover border"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-base-dark">{item.title}</h3>
                          <div className="flex gap-2 mt-1">
                            <span className="font-semibold text-price">Rs.{item.price.toFixed(2)}</span>
                            {item.price && (
                              <span className=" line-through text-base-dark">
                                Rs.{item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="p-1 flex items-center justify-around border border-gray-300 overflow-hidden text-base-dark">
                              <button
                                onClick={() => dispatch(updateQuantity({
                                  id: item.id,
                                  quantity: Math.max(1, item.quantity - 1)
                                }))}
                                className="hover:cursor-pointer scale-80 px-3 py-1 bg-dark text-white hover:bg-gray-200 transition rounded-full"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 w-8 text-center  text-base-dark text-base-dark">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => dispatch(updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity + 1
                                }))}
                                className="hover:cursor-pointer scale-80 px-3 py-1 bg-dark hover:bg-gray-200 transition text-white rounded-full"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              className="text-red-500 text-sm hover:text-red-700 transition"
                            >
                              <X className="w-5 h-5 text-base-dark hover:cursor-pointer" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t">
              <div className="space-y-4 flex flex-col">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2 text-base-dark">Subtotal</h3>
                  <div className="flex justify-between">
                    <span className="text-base-dark">Total:</span>
                    <span className="font-semibold text-base-dark">Rs.{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                {/* <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">Diagrams</h3>
                  <div className="text-sm">
                    <span className="font-medium">baschnay</span>
                    <p>Pay in 3 Installments of <span className="font-semibold">Rs.{(subtotal / 3).toFixed(2)}</span></p>
                  </div>
                </div> */}

                {/* <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold"
                > */}
                  <Link prefetch href="/checkout">
  <button onClick={()=> dispatch(toggle())} className="hover:cursor-pointer w-full bg-black text-white p-3 rounded mt-4">
    Proceed to Checkout
  </button>
</Link>

                {/* </motion.button> */}
                
                <Link  onClick={()=> dispatch(toggle())} href={"/cart"} className="text-base-dark py-3 text-center text-sm underline hover:text-gray-600 transition">
                  VIEW CART
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
