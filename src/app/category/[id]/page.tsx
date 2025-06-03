'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  media: [];
}

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), where('category', '==', id));
        const snapshot = await getDocs(q);

        const productsData: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        setProducts(productsData);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6 mt-5">
      <h1 className="text-3xl font-bold capitalize mb-6">{id}</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                price: product.price,
                originalprice: product.originalPrice,
                images: product.media,
                rating: 4.5,
                colors: ['#000000', '#e53e3e', '#4299e1'],
                isNew: true,
                isBestSeller: true,
                href: `/products/${product.id}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
