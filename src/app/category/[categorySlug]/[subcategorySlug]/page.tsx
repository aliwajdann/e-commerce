'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductCard from '@/components/ProductCard';

interface VariantsType {
  colors: string[];
  sizes: string[];
}

interface CategoryType {
  name: string;
  slug: string;
}

interface SubCategoryType {
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  media: [];
  variants: VariantsType;
  category: CategoryType;
  subcategory: SubCategoryType;
  categorySlug: string;
  subcategorySlug: string;
}

export default function SubCategoryProductsPage() {
  const params = useParams();
  const category = params.categorySlug as string;
  const subcategory = params.subcategorySlug as string;
  console.log(subcategory)
  console.log(category)

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !subcategory) return;

    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category.slug', '==', category),
          where('subcategory.slug', '==', subcategory)
        );
        const snapshot = await getDocs(q);
        const productsData: Product[] = snapshot.docs.map((doc) => {
  const data = doc.data() as Omit<Product, 'id'>;
  return {
    id: doc.id,
    ...data,
  };
});

        setProducts(productsData);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6 mt-5">
      <h1 className="text-3xl font-bold capitalize mb-6">
        {subcategory.replace('-', ' ')}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this subcategory.</p>
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
                isNew: true,
                isBestSeller: true,
                href: `/products/${product.id}`,
                colors: product.variants?.colors || [],
                sizes: product.variants?.sizes || [],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
