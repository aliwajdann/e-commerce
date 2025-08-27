"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-6">
      <div className="bg-white md:shadow-sm rounded-2xl p-8 text-center max-w-md w-full">
        {/* Animated Check Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-green-500 w-16 h-16 animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="md:text-2xl text-xl font-bold text-gray-800">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2 text-xs md:text-sm">
          🎉 Thank you for shopping with us. Your order has been placed
          successfully.
        </p>

        {/* Payment Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6 text-green-700 text-xs md:text-sm">
          <p>Your order will be delivered soon.</p>
          <p className="font-medium">Payment Method: Cash on Delivery</p>
        </div>

        {/* Order Details Placeholder */}
        <div className="mt-6 text-left text-xs md:text-sm">
          <h2 className="font-semibold text-gray-700 text-xs md:text-sm">Order Summary</h2>
          <ul className="text-xs md:text-sm text-gray-600 mt-2 space-y-1 ">
            <li>• Product: Example Product</li>
            <li>• Quantity: 1</li>
            <li>• Total: PKR 2,500</li>
          </ul>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8">
          {/* <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition-all"
          >
            Continue Shopping
          </Link> */}
        </div>
      </div>
    </div>
  );
}
