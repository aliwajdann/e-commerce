"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
// import { db, storage } from "@/lib/firebase"; // your firebase setup
import { db } from "@/lib/firebase"; // your firebase setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Star } from "lucide-react";

interface Review {
  id: string;
  name: string;
  email?: string;
  text: string;
  rating: number;
  imageUrl?: string;
  createdAt: any;
}

export default function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch reviews
  useEffect(() => {
    const q = query(
      collection(db, "products", productId, "reviews"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const revs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];
      setReviews(revs);
    });
    return () => unsub();
  }, [productId]);

  // Submit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || rating === 0) return alert("Please add review text & rating");
    setLoading(true);

    let imageUrl = "";
    // if (image) {
    //   const imgRef = ref(storage, `reviews/${productId}/${Date.now()}-${image.name}`);
    //   await uploadBytes(imgRef, image);
    //   imageUrl = await getDownloadURL(imgRef);
    // }

    await addDoc(collection(db, "products", productId, "reviews"), {
      name,
      email,
      text,
      rating,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    // reset
    setName("");
    setEmail("");
    setText("");
    setRating(0);
    setImage(null);
    setLoading(false);
  };

  return (
    <div className="mt-10 px-[16px] md:px-[32px]">
      {/* <h2 className="text-lg  font-semibold mb-4">Customer Reviews</h2> */}
      <h2 className="text-lg  font-semibold mb-4">Add Your Review</h2>

      {/* Review form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border  text-xs"
          required
        />
        <input
          type="email"
          placeholder="Your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border  text-xs"
        />
        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border text-xs"
          required
        />

        {/* Star rating */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`md:w-5 md:h-5 w-4 h-4 cursor-pointer ${
                star <= rating ? "text-emerald-500 fill-emerald-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Image upload */}
        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        /> */}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white text-xs md:text-sm hover:bg-gray-800"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Review list */}
      {/* <div className="space-y-4">
        {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center gap-2 mb-1">
              <strong>{rev.name || "Anonymous"}</strong>
              <div className="flex">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{rev.text}</p>
            {rev.imageUrl && (
              <img
                src={rev.imageUrl}
                alt="review"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
}
