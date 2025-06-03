'use client';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';


export default function ProductsSection() {
  const { products, loading } = useProducts();

  if (loading) return <div className="text-center py-10">Loading...</div>;

  
console.log(products)
  return (
  <section className="px-0 md:px-4 py-10 min-h-screen bg-light dark:bg-dark transition-colors duration-500">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-primary-dark">
       Classic Clothes
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 md:gap-4">
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
    colors: ['#000000', '#e53e3e', '#4299e1'],
    isNew: true,
    isBestSeller: true,
    href: `/products/${product.id}`,
  }}
/>

      ))}
    </div>
  </section>
);
}
