"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import Link from "next/link";

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // 🔐 Prevent hydration mismatch

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <div className="p-8 text-center text-base-dark">🛒 Your cart is empty</div>;
  }

  return (
    <div className="w-full p-4 md:p-6 'bg-[#d9d9d9]' cart-page custom-background">
    <div className="max-w-4xl mx-auto pt-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold uppercase text-base-dark">Your Cart</h1>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mt-4">
          <p className="font-medium text-base-dark">
            Please, hurry! Someone has placed an order on one of the items you have in the cart. 
            We'll keep it for you for <span className="font-bold">24 minutes</span>.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Products */}
        <div className="md:col-span-2 space-y-6">
          {items.map(item => {
            const imageUrl = item.media?.find(media => media.type === "image")?.url || "/placeholder.png";
            const discountedPrice = item.price;

            return (
              <div key={item.id} className="grid grid-cols-4 gap-4 border-b pb-6">
                <div className="col-span-1">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
                <div className="col-span-3">
                  <h2 className="font-bold text-lg text-base-dark">{item.title}</h2>
                  {/* <p className="text-base-dark text-sm mt-1">Kayseria-Kayseria Classic- Unstitched +: fid1-25</p> */}
                  
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {/* Price Column */}
                    <div>
                      <p className="text-base-dark font-medium">Price</p>
                      <div className="mt-2">
                        <p className="text-base-dark line-through">Rs. {item.price.toLocaleString()}</p>
                        <p className="text-[#681C1C] font-bold">Rs. {discountedPrice.toLocaleString()}</p>
                      </div>
                    </div>
                    
                  {/* Variants Column  */}
                  {item.selectedColor && (
  <p className="text-sm text-base-dark">Color: <span className="font-semibold">{item.selectedColor}</span></p>
)}
{item.selectedSize && (
  <p className="text-sm text-base-dark">Size: <span className="font-semibold">{item.selectedSize}</span></p>
)}



                    {/* Quantity Column */}
                    <div>
                      <p className="text-base-dark font-medium text-base-dark">Quantity</p>
                      <div className="mt-2 text-base-dark">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(updateQuantity({ 
                              id: item.id, 
                              quantity: Math.max(1, parseInt(e.target.value) || 1)
                            }))
                          }
                          className="w-16 border p-1 rounded text-center text-base-dark"
                          min={1}
                        />
                      </div>
                    </div>
                    
                    {/* Subtotal Column */}
                    <div>
                      <p className="text-base-dark font-medium text-base-dark">Subtotal</p>
                      <p className="mt-2 font-bold text-base-dark">Rs. {(discountedPrice * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="mt-4 text-[#681C1C]  text-sm font-medium hover:cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:col-span-1 text-base-dark">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-bold uppercase mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">Rs. {subtotal.toLocaleString()}</span>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-bold mb-2">Goodmold</h3>
                <p className="text-sm">Pay in 3 installments of <span className="font-bold">Rs. {(subtotal / 3).toLocaleString()}</span></p>
              </div>
              
              {/* <div>
                <h3 className="font-bold mb-2">Additions/Comments</h3>
                <textarea 
                  placeholder="Special instruction for seller..."
                  className="w-full border p-2 rounded text-sm h-20"
                />
              </div> */}
              
              {/* <div className="pt-4">
                <h3 className="font-bold mb-2">Calculate Shipping</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Coupon Code</label>
                    <input 
                      type="text" 
                      placeholder="Enter Coupon Code"
                      className="w-full border p-2 rounded text-sm"
                    />
                    <p className="text-xs text-base-dark mt-1">Coupon code will be applied on the checkout page</p>
                  </div>
                </div>
              </div> */}
              
              <Link prefetch href="/checkout">
                <button className="hover:cursor-pointer w-full bg-black text-white py-3 text-sm rounded-lg font-bold hover:bg-gray-800 transition mt-6">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
