// components/CategorySection.tsx
'use client';

import Link from 'next/link';

const categories = [
  {
    name: "Jewellery",
    slug: "jewellery",
    image: "https://media.istockphoto.com/id/1299139185/photo/female-hands-with-trendy-dark-nail-design-with-gold-bracelets-on-aqua-background-luxury.webp?a=1&b=1&s=612x612&w=0&k=20&c=PBXjSOfNKK7MICs6YVNbgEt-3wOTPSzGpe6Jotybk-c=",
  },
  {
    name: "Skin Care",
    slug: "skin-care",
    image: "https://images.unsplash.com/photo-1620755901999-166c6c151efe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2tpbiUyMGNhcmUlMjB0aHVtYm5haWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Under Garments",
    slug: "under-garments",
    image: "https://images.unsplash.com/photo-1568441556126-f36ae0900180?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5kZXJnYXJtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function CategorySection() {
  // Show only the first category for mobile (optional tweak)
  const mobileCategories = categories.slice(0, 1);

  return (
    <section className=" w-[100%] md:w-[100%] mx-auto py-10 custom-background">
      <div className=" w-[90%] md:w-[85%] mx-auto">
      <div className="flex items-center gap-4 my-10">
        <div className="flex-grow border-t border-2 border-black" />
        <h2 className="text-center text-xl font-semibold text-black whitespace-nowrap">
          SHOP BY CATEGORY
        </h2>
        <div className="flex-grow border-t border-2 border-black" />
      </div>

      {/* Desktop view */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
        {categories.map((category) => (
          <Link
            prefetch
            key={category.slug}
            href={`/category/${category.slug}`}
            className="relative group overflow-hidden shadow-lg"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 opacity-80 left-0 w-full bg-gray-800 bg-opacity-80 py-3 text-center">
              <p className="text-white font-semibold tracking-widest uppercase">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile and Tablet view */}
      <div className="hidden mt-6">
        {mobileCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="relative group overflow-hidden shadow-lg"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[300px] sm:h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 opacity-80 left-0 w-full bg-gray-800 bg-opacity-80 py-2 sm:py-3 text-center">
              <p className="text-white font-semibold tracking-widest uppercase text-sm sm:text-base">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
