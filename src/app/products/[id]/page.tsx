'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import CartActivityToast from '@/components/CartActivityToast';
import ProductMedia from '@/components/productPage/ProductMedia';
import ProductInfo from '@/components/productPage/ProductInfo';
import ProductDetails from '@/components/productPage/ProductDetails';
import RelatedProducts from '@/components/productPage/RelatedProducts';
import Reviews from '@/components/productPage/ReviewsSection';
import ReviewSlider from '@/components/productPage/ReviewsSlider';

interface MediaType {
  type: 'image' | 'video';
  url: string;
}

interface ColorVariant {
  colorCode: string;
  colorName: string;
  swatchImage?: string;
  images?: MediaType[];
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
  productCode: string;
  features: string[]
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewsCount, setReviewsCount] = useState<number>(0);

  // fetch product details
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

  // fetch reviews count
  useEffect(() => {
    if (!id) return;

    const fetchReviewsCount = async () => {
      try {
        const reviewsRef = collection(db, "products", id, "reviews");
        const reviewsSnap = await getDocs(reviewsRef);
        setReviewsCount(reviewsSnap.size);
      } catch (err) {
        console.error("❌ Error fetching reviews:", err);
      }
    };

    fetchReviewsCount();
  }, [id]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-[#681C1C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white mt-2">
        <p className="pl-[16px] text-xs font-light">
          Women - {product.category.name} - {product.subcategory.name}
        </p>
        <CartActivityToast productTitle={product.title} />

        <div className="product-container grid md:mt-4 mt-1 md:w-[100%] mx-auto">
          <ProductMedia media={product.media} />
          <ProductInfo
            reviewsCount={reviewsCount}   // ✅ now passing state
            id={product.id}
            title={product.title}
            price={product.price}
            originalprice={product.originalPrice}
            description={product.description}
            media={product.media}
            variants={product.variants}
          />
        </div>
      </div>

      <ProductDetails productdetails={product} />
      <ReviewSlider productId={product.id} />
      <Reviews productId={product.id} />
      <RelatedProducts category={product.category.slug} currentProductId={product.id} />

      <style jsx>{`
        @media (min-width: 768px) {
          .product-container {
            grid-template-columns: 60% auto;
          }
        }
        @media (max-width: 767px) {
          .product-container {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}
