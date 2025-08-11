import React from 'react';
import Link from 'next/link';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'sets',
      title: 'Sets',
      action: 'SHOP NOW',
      href: '/sets',
      image: 'https://images.unsplash.com/photo-1743449661678-c22cd73b338a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8' // Replace with actual image path
    },
    {
      id: 'bodysuits',
      title: 'Bodysuits',
      action: 'EXPLORE',
      href: '/bodysuits',
      image: 'https://images.unsplash.com/photo-1753771669796-1f8d0d93a696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8' // Replace with actual image path
    },
    {
      id: 'bras',
      title: 'Bras',
      action: 'GO TO',
      href: '/bras',
      image: 'https://images.unsplash.com/photo-1754344247886-4bfa285e499a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D' // Replace with actual image path
    },
    {
      id: 'knickers',
      title: 'Knickers',
      action: 'VIEW ALL',
      href: '/knickers',
      image: 'https://images.unsplash.com/photo-1754587417490-a391f7f7f582?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D' // Replace with actual image path
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 h-screen max-h-[600px] lg:max-h-[500px]">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="relative group overflow-hidden bg-gray-100"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url(${category.image})`,
            }}
          >
            {/* Dark overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" /> */}
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 lg:p-8">
            <div className="text-white">
              {/* Category Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-3 tracking-wide">
                {category.title}
              </h2>
              
              {/* Action Button */}
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase border-b border-white pb-1 group-hover:border-opacity-80 transition-all duration-300">
                  {category.action}
                </span>
              </div>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;