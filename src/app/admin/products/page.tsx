// app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/fetchProducts";
import CreateProductForm from "@/app/components/CreateProductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-4">Loading products...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold">Rs {product.price}</p>
            <div className="flex gap-2 mt-2">
              {product.media?.map((item: any, i: number) =>
                item.type === "image" ? (
                  <img
                    key={i}
                    src={item.url}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
       <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Add Product</h1>
      <CreateProductForm />
    </div>
    </div>
  );
}
