'use client';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';


export default function ProductsSection() {
  const { products, loading } = useProducts();

  if (loading) return <div className="text-center py-10">Loading...</div>;

  
console.log(products)
  return (
  <section className="px-3   md:px-4 py-6 min-h-screen custom-background dark:bg-dark transition-colors duration-500">
    <h2 className=" text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-primary-dark">
       Women Section
    </h2>

    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 md:gap-4">
      {products.map(product => (
       <ProductCard
  key={product.id}
  product={{
    id: product.id,
    name: product.title,
    price: product.price,
    images: product.media,
    originalprice: product.originalPrice,
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
  </section>
);
}
