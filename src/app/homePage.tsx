'use client';
// import Image from "next/image";
import Products from "@/components/products"
// import ChatInterface from "@/components/ChatInterface";
import CategorySection from "@/components/CategorySection";

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
  <div className="relative z-10 flex items-center justify-center h-full">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        }}
        className="text-center text-white"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Velano</h1>
        <p className="text-lg md:text-xl mb-8">The Only Place You Wanna Be</p>
        <button className="px-8 py-3 bg-[#681C1C] text-white rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-[#681C1C] transition-colors">
          Shop Now
        </button>
      </motion.div>
  </div>

</main>
      <CategorySection />
      <Products />
      {/* <ChatInterface/> */}
    </>
  );
}
