'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

type Subcategory = {
  name: string;
  slug: string;
};

type CategorySlug = 'clothing' | 'accessories' | 'jewellery' ;

const subcategories: Record<CategorySlug, Subcategory[]> = {
  clothing: [
    { name: "T-Shirts", slug: "t-shirts" },
    { name: "Hoodies", slug: "hoodies" },
    { name: "Jeans", slug: "jeans" },
  ],
  accessories: [
    { name: "Watches", slug: "watches" },
    { name: "Sunglasses", slug: "sunglasses" },
    { name: "Wallets", slug: "wallets" },
  ],
  jewellery: [
    { name: "Necklaces", slug: "necklaces" },
    { name: "Earrings", slug: "earrings" },
    { name: "Bracelets", slug: "bracelets" },
    { name: "Key Chains", slug: "key-chains" },
  ],
  
};

export default function SubCategoryPage() {
  const params = useParams();
  const category = params.categorySlug as CategorySlug;

  const subs = subcategories[category] || [];

  return (
    <section className="w-full px-4 py-10 custom-background pt-20">
    <div className="max-w-7xl pt-20 mx-auto">
      {/* Heading */}
      <div className="flex items-center gap-4 mb-10">
        {/* <div className="flex-grow border-t border-2 border-black" /> */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black whitespace-nowrap uppercase">
          {category} 
        </h1>
        {/* <div className="flex-grow border-t border-2 border-black" /> */}
      </div>

      {/* Subcategory Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {subs.map((sub) => (
          <Link
            key={sub.slug}
            href={`/category/${category}/${sub.slug}`}
            className="group block bg-white border border-gray-200 shadow hover:shadow-md transition-all rounded-lg overflow-hidden"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-xl group-hover:bg-gray-200 transition">
              {/* Placeholder text/image */}
              {sub.name}
            </div>
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-black transition">
                {sub.name}
              </h2>
              <p className="text-sm text-gray-500 capitalize mt-1">
                Explore {sub.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
