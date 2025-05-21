// lib/firestoreOrders.ts

import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const createOrder = async (orderData: any) => {
  const ordersRef = collection(db, "orders");
  const newOrder = {
    ...orderData,
    createdAt: Timestamp.now(),
    status: "pending",
  };
  const docRef = await addDoc(ordersRef, newOrder);
  return docRef.id;
};
