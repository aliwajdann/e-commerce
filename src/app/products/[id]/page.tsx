'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from '@/lib/firebase';
import RelatedProducts from '@/components/RelatedProducts'


import ProductMedia from '@/components/productPage/ProductMedia';
import ProductInfo from '@/components/productPage/ProductInfo';

interface MediaType {
  type: 'image' | 'video';
  url: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  description: string;
  media: MediaType[];
}

export default function ProductPage() {
  // const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ ...docSnap.data(), id: docSnap.id } as Product);
      } else {
        console.error('❌ Product not found');
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-8">Loading...</p>;

  return (
    <>
    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto ">
      <ProductMedia media={product.media} />
      <ProductInfo
        id={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
        media={product.media}
        originalprice={product.originalPrice}
      />
    </div>
    <RelatedProducts/>
</>
  );
}
