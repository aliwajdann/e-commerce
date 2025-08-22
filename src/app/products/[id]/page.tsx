'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import CartActivityToast from '@/components/CartActivityToast';
import ProductMedia from '@/components/productPage/ProductMedia';
import ProductInfo from '@/components/productPage/ProductInfo';
// import FaqSection from '@/components/productPage/FaqSection';
import ProductDetails from '@/components/productPage/ProductDetails';
import RelatedProducts from '@/components/productPage/RelatedProducts';

interface MediaType {
  type: 'image' | 'video';
  url: string;
}

interface ColorVariant {
  colorCode: string;
  colorName: string;
  swatchImage?: string; // optional, if you add swatch images
  images?: MediaType[]; // optional, so you can show color-specific media
}

interface VariantsType {
  sizes: string[];
  colors: ColorVariant[];
}

interface categoryType  {
  slug: string,
  name: string,
}
interface subcategoryType  {
  slug: string,
  name: string,
}

interface Product {
  id: string;
  title: string;
  price: number;
  category: categoryType;
  originalPrice: number;
  description: string;
  media: MediaType[];
  variants: VariantsType;
  subcategory: subcategoryType;
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({ ...data, id: docSnap.id } as Product);
        } else {
          console.error('❌ Product not found');
        }
      } catch (err) {
        console.error('❌ Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 

  if (loading || !product) return ( <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-[#681C1C]  border-t-transparent rounded-full animate-spin"></div>
    </div>)

  return (
    <>
      <div className="w-full bg-white mt-2">
       <p style={{fontWeight: 400}} className=' pl-[16px]  text-xs font-light'>Women - {product.category.name} - {product.subcategory.name} </p>
        <CartActivityToast productTitle={product.title} />

        <div className="product-container grid md:mt-4 mt-1 md:w-[100%] mx-auto">
          <ProductMedia media={product.media} />
          <ProductInfo
            id={product.id}
            title={product.title}
            price={product.price}
            originalprice={product.originalPrice}
            description={product.description}
            media={product.media}
            variants={product.variants} // ✅ now passing updated colors + sizes
          />
        </div>
      </div>

<ProductDetails  productdetails={product} />
<RelatedProducts category={product.category.slug} currentProductId={product.id} />

      <style jsx>{`
        /* Desktop (>=768px) */
        @media (min-width: 768px) {
          .product-container {
            grid-template-columns: 60% auto;
          }
        }
        /* Mobile (<768px) */
        @media (max-width: 767px) {
          .product-container {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}
