"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  createdAt?: any;
}

export default function ReviewSlider({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // fetch reviews from Firestore
  useEffect(() => {
    const q = query(
      collection(db, "products", productId, "reviews"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const revs = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];
      setReviews(revs);
    });
    return () => unsub();
  }, [productId]);

  const next = () =>
    setCurrentIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));

  const goTo = (index: number) => setCurrentIndex(index);

  // auto-scroll every 4s
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [reviews]);

  if (reviews.length === 0) {
    return (
      <div className="w-full bg-gray-50 py-16 text-center text-gray-500">
        No reviews yet. Be the first!
      </div>
    );
  }

  return (
    <div id="reviewsSlider" className="w-full bg-white  py-6 md:py-8 md:px-[32px] px-[16px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* nav arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white hover:shadow-md rounded-full"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white hover:shadow-md rounded-full"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>

        {/* slide content */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((rev) => (
              <div key={rev.id} className="w-full flex-shrink-0">
                <div className="text-center max-w-4xl mx-auto px-8 sm:px-12 lg:px-16">
                  {/* stars */}
                  <div className="flex justify-center md:mb-6 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={`mx-1 ${
                          i < rev.rating
                            ? "text-emerald-500 fill-emerald-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* text */}
                  <blockquote className="md:text-lg text-sm  lg:text-2xl text-gray-700 font-light leading-relaxed md:mb-6 mb-5">
                    “{rev.text}”
                  </blockquote>

                  {/* author */}
                  <p className="text-gray-600 md:text-sm text-xs font-medium">
                    – {rev.name || "Anonymous"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="flex justify-center space-x-3 md:mt-8 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === currentIndex
                  ? "w-2 h-2 bg-gray-800 scale-125"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
