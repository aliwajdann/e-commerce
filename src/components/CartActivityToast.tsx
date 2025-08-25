'use client';
import { useEffect, useState } from 'react';

const randomMinutes = [2, 5, 9, 15, 20];

export default function CartActivityToast({ productTitle }: { productTitle: string }) {
  const [show, setShow] = useState(false);
  const [minutesAgo, setMinutesAgo] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutesAgo(randomMinutes[Math.floor(Math.random() * randomMinutes.length)]);
      setShow(true);

      // Hide after 5 seconds
      setTimeout(() => setShow(false), 5000);
    }, Math.floor(Math.random() * 30000) + 30000); // every 30–60 seconds

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
  <div
  className="
    fixed bottom-5 left-1/2 transform -translate-x-1/2 
    bg-white border border-gray-300 shadow-lg rounded-xl
    md:px-3 px-1 py-1 md:py-2 z-50 animate-slideIn 
    w-4/5 sm:w-auto
  "
>
  <p className="text-xs text-gray-700 text-center">
    Someone ordered <strong>{productTitle}</strong> {minutesAgo} minutes ago
  </p>
</div>
  );
}
