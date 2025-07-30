'use client';

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface CartActivity {
  id: string;
  productId: string;
  timestamp: any;
  userId?: string | null;
}

export default function CartActivityPage() {
  const [activity, setActivity] = useState<CartActivity[]>([]);

  useEffect(() => {
    const q = query(collection(db, "cartActivity"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CartActivity[];
      setActivity(logs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">🛒 Cart Activity</h1>
      <ul className="space-y-3">
        {activity.map((log) => (
          <li key={log.id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">🧾 Product ID: <Link href={`/products/${log.productId}`} className="underline">{log.productId}</Link></p>
                <p className="text-sm text-gray-500">User: {log.userId || "Guest"}</p>
              </div>
              <p className="text-sm text-gray-500">
                {log.timestamp?.toDate().toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
