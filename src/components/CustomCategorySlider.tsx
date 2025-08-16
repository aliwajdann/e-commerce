'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Category type
interface Category {
  name: string;
  slug: string;
  image: string;
}

interface CategorySliderProps {
  title?: string;
  linktext?: string;
}

// Example categories (replace with your own data or Firestore fetch later if needed)
const categories: Category[] = [
  { name: 'Men', slug: 'men', image: 'https://images.unsplash.com/photo-1755181547501-219d61043116?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8' },
  { name: 'Women', slug: 'women', image: 'https://images.unsplash.com/photo-1754942668740-8a815525cf2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
  { name: 'Kids', slug: 'kids', image: 'https://images.unsplash.com/photo-1755126623817-198848b50414?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8' },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1755095901050-1a4754f1f064?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Watches', slug: 'watches', image: 'https://images.unsplash.com/photo-1754993313857-d7e6370c24bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D' },
];

export default function CustomCategorySlider({ title, linktext }: CategorySliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleScroll = () => checkScrollButtons();

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 12;
      container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 12;
      container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full pt-6 pb-10 flex flex-col items-start pl-[16px] md:pl-[32px]">
      {/* Heading */}
      <div className="md:block hidden">
        <div className="flex items-start flex-col gap-4 mb-4">
          <h2
            style={{ lineHeight: '47.5px' }}
            className="text-[38px] font-semibold capitalize text-gray-800"
          >
            {title}
          </h2>
          {linktext && (
            <button className="text-sm text-black underline font-medium">
              {linktext}
            </button>
          )}
        </div>
      </div>

      {/* Scroll Container */}
      <div
        className="w-full relative"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {/* Arrows */}
        <div
          className={`hidden md:block transition-opacity duration-300 ${
            showArrows ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-full px-4 py-0.5 border border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Categories */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-2 md:gap-3 pt-2 pb-4 scroll-smooth custom-scrollbar"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex-none w-1/2 md:w-[calc(33.333%-8px)] lg:w-[calc(25%-9px)] relative rounded-sm overflow-hidden group"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div  className="absolute  w-full h-full inset-0 custom-gradient ">
                <span className="text-white text-xl font-semibold capitalize absolute bottom-2 left-2">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px !important;
          height: 0.1rem !important;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #bfbfbf;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
         .custom-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.381) 0%, rgba(255, 255, 255, 0) 100%);
}
      `}</style>
    </section>
  );
}
