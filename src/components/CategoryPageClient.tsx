'use client';

import ProductCard from "@/components/ProductCard";

export default function CategoryPageClient({
  category,
  products,
}: {
  category: string;
  products: any[];
}) {
  return (
    <div className="p-6 mt-5">
      <h1 className="text-3xl font-bold capitalize mb-6">{category}</h1>

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
                // rating: 4.5,
                // isNew: true,
                // isBestSeller: true,
                href: `/products/${product.id}`,
                 colors: product.variants?.colors || [],
                 description: product.description
                //  sizes: product.variants?.sizes || [],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}





