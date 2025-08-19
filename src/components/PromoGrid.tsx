'use client'
import Link from "next/link";

interface PromoCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const PromoCard = ({ image, title, description, link }: PromoCardProps) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-50/50 rounded-sm overflow-hidden shadow-sm">
      {/* Image */}
      <div className="md:w-1/2 ">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover  md:aspect-auto aspect-square"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center gap-4 p-6 md:w-1/2">
        <span className="uppercase  text-xs text-gray-500 font-medium">Promo</span>
        <h4 className="md:text-xl text-md font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-xs">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-xs gap-2 text-gray-900 font-medium hover:underline"
        >
          → Shop now
        </Link>
      </div>
    </div>
  );
};

export default function PromoGrid() {
  const promos = [
    {
      image: "https://images.unsplash.com/photo-1755004609214-c252674df1ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNXx8fGVufDB8fHx8fA%3D%3D",
      title: "Knickers 4 for 3, 7 for 5 & 10",
      description:
        "Add the min number of knickers, the least expensive ones will be free.",
      link: "/shop",
    },
    {
      image: "https://images.unsplash.com/photo-1754901350480-c0fdd1a427b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D",
      title: "Mix & Match 4 for 3",
      description:
        "Shop across to make the most of the 4 for 3 promotion.And here you go", 
      link: "/shop",
    },
  ];

  return (
    <section className="
    flex md:gap-6 gap-2 px-4 md:px-12 py-10 md:w-[78%] pt-[32px] md:pt-[40px]
    overflow-x-auto md:overflow-x-visible
    snap-x snap-mandatory md:snap-none
    ml-[16px]  md:mx-auto
    ">
      {promos.map((promo, idx) => (
    <div key={idx} className="flex-none w-[80%] sm:w-[60%] md:flex-1 snap-start">
      <PromoCard {...promo} />
    </div>
  ))}
    </section>
  );
}
