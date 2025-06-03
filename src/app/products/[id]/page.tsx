// app/category/[id]/page.tsx
export const dynamic = "force-dynamic";

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CategoryPageClient from "@/components/CategoryPageClient";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  media: string[];
}

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = params.id;

  if (!category) {
    throw new Error("Category slug is missing!");
  }

  const q = query(collection(db, "products"), where("category", "==", category));
  const snapshot = await getDocs(q);
  const products: Product[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as any),
  }));

  return <CategoryPageClient category={category} products={products} />;
}
