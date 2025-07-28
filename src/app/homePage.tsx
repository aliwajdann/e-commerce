'use client';
// import Image from "next/image";
import Products from "@/components/products"
// import ChatInterface from "@/components/ChatInterface";
import CategorySection from "@/components/CategorySection";
import Link from "next/link";

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function HomePage() {

 const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <>
     <main className="h-lvh w-full relative overflow-hidden flex justify-center items-center"> 

      <div className="hero-background h-[full]  inset-0 w-full absolute top-0 left-0"></div>
      {/* dekstop image  */}
  {/* <Image
    className="hidden h-[92vh] md:block  inset-0 w-full object-contain object-center md:object-contain sm:object-contain" 
    // src="https://res.cloudinary.com/dzzjh7n6q/image/upload/v1753600045/cld-sample-5.jpg" 
    src={heroImage}
    alt="Hero Image"
    sizes="100vw"
  /> */}
  {/* mobile image */}
   {/* <Image
    className="md:hidden h-[80vh] block  inset-0 w-full object-cover object-center md:object-cover sm:object-contain" 
    // src="https://res.cloudinary.com/dzzjh7n6q/image/upload/v1753600045/cld-sample-5.jpg" 
     src={heroImage}
    alt="Hero Image"
    sizes="100vw"
  /> */}
  {/* Optional overlay for better text readability */}
  {/* <div className="absolute inset-0 bg-black/20"></div> */}
  
  {/* Optional content overlay */}
 <div className="relative z-10 flex items-center justify-center h-screen">
  <motion.div
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    }}
    className="text-center text-white max-w-2xl px-4"
  >
    <p className="text-2xl font-semibold tracking-widest mb-4 uppercase text-[#F5D5D6]">
      Velano
    </p>

    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
      Where Style Meets Soul
    </h1>

    <p className="text-lg md:text-xl mb-10 text-white/90">
      Discover curated pieces made to elevate your everyday look bold, effortless, and unapologetically you.
    </p>

    <Link href="/products" className="cursor-pointer px-8 py-3 bg-[#681C1C] text-white rounded-lg hover:bg-white hover:text-[#681C1C] transition-colors duration-300">
      Step Into Your Era
    </Link>
  </motion.div>
</div>


</main>
      <CategorySection />
      <Products />
      {/* <ChatInterface/> */}
    </>
  );
}
