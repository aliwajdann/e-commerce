"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { clearCart } from "@/redux/cartSlice";
import { useState } from "react";
import { createOrder } from "@/lib/firestoreOrders";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderData = {
      customer: form,
      items: cartItems,
      total,
    };

    try {
      const orderId = await createOrder(orderData);
      dispatch(clearCart());
      router.push("/thank-you");
    } catch (err) {
      alert("Something went wrong while placing the order.");
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10"
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-2">Complete your order details below</p>
        </div>

        <div className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-gray-700 font-medium">
            <span>Total Items:</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between text-gray-900 font-semibold text-lg mt-2">
            <span>Total Price:</span>
            <span>
              PKR{" "}
              {cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={handlePlaceOrder}
          className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition"
        >
          Place Order (COD)
        </motion.button>
      </div>
    </motion.div>
  );
}
