// lib/fetchProducts.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products: any[] = [];

  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() 
      
    });
  });

  return products; 
}
