// lib/firestoreProducts.ts
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function updateProduct(id: string, data: any) {
  const ref = doc(db, "products", id);
  await updateDoc(ref, data);
}
