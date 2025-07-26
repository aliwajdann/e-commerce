'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type MediaItem = {
  type: string;
  url: string;
};

type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  media: MediaItem[];
  variants?: {
    colors: string[];
    sizes: string[];
  };
};

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const data = querySnapshot.docs.map(doc => {
          const productData = doc.data();
          return {
            id: doc.id,
            title: productData.title,
            price: productData.price,
            description: productData.description,
            media: productData.media || [],
            originalPrice: productData.originalPrice,
             variants: productData.variants,
          } as Product;
        });

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
}
