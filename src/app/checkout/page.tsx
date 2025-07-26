"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { clearCart } from "@/redux/cartSlice";
import { useState } from "react";
import { createOrder } from "@/lib/firestoreOrders";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiShoppingBag, FiUser, FiPhone, FiMapPin, FiChevronRight } from "react-icons/fi";


export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderData = {
  customer: form,
  items: cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    selectedColor: item.selectedColor || null,
    selectedSize: item.selectedSize || null,
    media: item.media.map((m) => ({
      url: m.url,
      type: m.type,
    })),
  })),
  total,
  status: "pending",
  createdAt: new Date().toISOString(),
};


    try {
      const orderId = await createOrder(orderData);
      dispatch(clearCart());
      router.push("/thank-you");
    } catch (err) {
      alert("Something went wrong while placing the order.");
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-2 sm:px-4 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-8">
          <div className="flex-1 border-t border-gray-200"></div>
          <h1 className="mx-4 text-3xl font-bold text-gray-900 flex items-center">
            <FiShoppingBag className="mr-2" />
            Checkout
          </h1>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiUser className="mr-2 text-indigo-600" />
              Customer Information
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="outline-none w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                    placeholder=" ali wajdan"
                  />
                  <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="outline-none w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                    placeholder="+92 3240059011"
                  />
                  <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <div className="relative">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    className="outline-none w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition"
                    placeholder="enter you address"
                  />
                  <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center py-3 border-b border-gray-100"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                      {item.media.map( (it, index)=>{
                      return  <img
                          src={it.url}
                          alt={it.type}
                          key={index}
                          className="w-full h-full object-cover"
                        />
                        }  )}
                      
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
{item.selectedSize && <p>Size: {item.selectedSize}</p>}

                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>PKR {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>PKR 0</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2">
                <span>Total</span>
                <span>PKR {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className={`w-full mt-8 py-3.5 hover:cursor-pointer rounded-lg font-medium text-white transition ${isSubmitting ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-800'}`}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:cursor-pointer flex items-center justify-center"
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Order...
                  </motion.span>
                ) : (
                  <motion.span
                    key="placeOrder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center hover:cursor-pointer"
                  >
                    <FiCheckCircle className="mr-2" />
                    Place Order (COD)
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>By placing your order, you agree to our Terms of Service</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}