// components/CategorySection.tsx
import Link from 'next/link';

const categories = [
  {
    name: "Casual & Stylish",
    image: "https://images.pexels.com/photos/9775539/pexels-photo-9775539.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/category/casual-stylish-tshirts",
  },
  {
    name: "Summer Ready Shorts",
    image: "https://images.pexels.com/photos/29205209/pexels-photo-29205209/free-photo-of-athletic-male-on-urban-rooftop-in-austin.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/category/summer-ready-looks-shorts",
  },
  {
    name: "Trending & Modern",
    image: "https://images.pexels.com/photos/8346053/pexels-photo-8346053.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "/category/trending-modern",
  },
];

export default function CategorySection() {
  // Show only first two categories for mobile/tablet
  const mobileCategories = categories.slice(0, 1);
  
  return (
    <section className="max-w-7xl mx-auto py-10">
<div className="flex items-center gap-4 my-10">
  <div className="flex-grow border-t border-2 border-black" />
  <h2 className="text-center text-xl font-semibold text-black whitespace-nowrap">
    SHOP BY CATEGORY
  </h2>
  <div className="flex-grow  border-t border-2 border-black" />
</div>

      
      {/* Desktop view - all 3 categories */}
      <div className="hidden lg:grid grid-cols-3 gap-6 mt-6">
        {categories.map((category) => (
          <Link
          prefetch
            key={category.name}
            href={category.link}
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

      {/* Mobile and Tablet view - only 2 categories, face to face */}
      {/* <div className="lg:hidden grid grid-cols-2 gap-4 mt-6"> */}
      <div className="lg:hidden mt-6">
        {mobileCategories.map((category) => (
          <Link
            key={category.name}
            href={category.link}
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
    </section>
  );
}