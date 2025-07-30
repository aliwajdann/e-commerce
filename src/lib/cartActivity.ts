import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const logCartActivity = async (productId: string, userId: string | null = null) => {
  try {
    await addDoc(collection(db, "cartActivity"), {
      productId,
      userId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("❌ Error logging cart activity:", error);
  }
};
