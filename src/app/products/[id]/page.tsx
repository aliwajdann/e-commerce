// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { doc, getDoc } from 'firebase/firestore';
// import { useDispatch } from 'react-redux';
// import { db } from '@/lib/firebase';
// import RelatedProducts from '@/components/RelatedProducts'


// import ProductMedia from '@/components/productPage/ProductMedia';
// import ProductInfo from '@/components/productPage/ProductInfo';

// interface MediaType {
//   type: 'image' | 'video';
//   url: string;
// }

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   originalPrice: number;
//   description: string;
//   media: MediaType[];
// }

// export default function ProductPage() {
//   // const dispatch = useDispatch();
//   const params = useParams();
//   const id = params?.id as string;

//   const [product, setProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       const docRef = doc(db, 'products', id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setProduct({ ...docSnap.data(), id: docSnap.id } as Product);
//       } else {
//         console.error('❌ Product not found');
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) return <p className="p-8">Loading...</p>;

//   return (
//     <>
//     <div className="p-3.5 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 max-w-6xl mx-auto mt-1.5 md:mt-6">
//       <ProductMedia media={product.media} />
//       <ProductInfo
//         id={product.id}
//         title={product.title}
//         price={product.price}
//         description={product.description}
//         media={product.media}
//         originalprice={product.originalPrice}
//       />
//     </div>
//     <RelatedProducts/>
// </>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import ProductMedia from '@/components/productPage/ProductMedia';
import ProductInfo from '@/components/productPage/ProductInfo';
import ReviewsSection from '@/components/productPage/ReviewsSection';
import FaqSection from '@/components/productPage/FaqSection';

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

  if (loading || !product) return <p className="p-8">Loading...</p>;

  return (
    <>
      {/* <div className="p-3.5 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 max-w-6xl mx-auto mt-1.5 md:mt-6"> */}
       <div className='md:grid md:grid-cols-2 md:my-5 mb-5 md:w-[90%] mx-auto'>

        <ProductMedia media={product.media} />
        <ProductInfo
          id={product.id}
          title={product.title}
          price={product.price}
          originalprice={product.originalPrice}
          description={product.description}
          media={product.media}
        />
      </div>

      <div className="description mb-10 md:w-[95%] md:p-[2%] w-[90%] mx-auto p-[3] grid gap-4">
        <h4 className="md:text-[22px] text-[20px] font-bold">Description</h4>
        <p className="md:text-[15px] text-[14px] text-gray-500 whitespace-pre-line">
          {product.description}
        </p>
      </div>

      <FaqSection />
      <ReviewsSection />
    </>
  );
}
