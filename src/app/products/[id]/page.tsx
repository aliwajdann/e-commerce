'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CategoryPageClient from '@/components/CategoryPageClient';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  media: string[];
}

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', id));
      const snapshot = await getDocs(q);

      const productsData: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p className="p-6">Loading products...</p>;

  return <CategoryPageClient category={id as string} products={products} />;
}
