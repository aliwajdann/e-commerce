// components/CategorySection.tsx

const categories = [
  {
    name: "Unstitched",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hpcnRzfGVufDB8fDB8fHww",
    link: "/category/unstitched",
  },
  {
    name: "Exclusive",
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D",
    link: "/category/exclusive",
  },
  {
    name: "Pret",
    image: "https://images.unsplash.com/photo-1523199455310-87b16c0eed11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D",
    link: "/category/pret",
  },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-center text-xl font-semibold mb-6 border-b border-black inline-block">
        SHOP BY CATEGORY
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.link}
            className="relative group overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[400px] object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 opacity-60 left-0 w-full bg-red-700 bg-opacity-80 py-3 text-center">
              <p className="text-white font-semibold tracking-widest uppercase">
                {category.name}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
