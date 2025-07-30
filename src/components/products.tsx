'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';

export default function ProductsSection() {
  const { products, loading } = useProducts();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'bestseller', label: 'Best Sellers' },
    { id: 'sale', label: 'Sale' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
  ];

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-1 py-12">
      <div className="md:max-w-[90%] mx-auto">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Women's Collection</h2>
          <p className="text-gray-600 mt-2 text-base">Stylish & comfortable picks for every mood.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeFilter === filter.id
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm text-gray-700"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-2 md:gap-x-4 md:gap-y-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                price: product.price,
                images: product.media || [],
                originalprice: product.originalPrice,
                href: `/products/${product.id}`,
                colors: [],
                // sizes: [],
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
