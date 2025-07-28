// import Image from "next/image";
import Products from "@/components/products"
// import ChatInterface from "@/components/ChatInterface";
import CategorySection from "@/components/CategorySection";
import Image from "next/image";
import heroImage from '@/hero-image.png'

export default function HomePage() {

  return (
    <>
     <main className="w-full relative overflow-hidden bg-white"> 
      {/* dekstop image  */}
  <Image
    className="hidden h-[92vh] md:block  inset-0 w-full object-contain object-center md:object-contain sm:object-contain" 
    // src="https://res.cloudinary.com/dzzjh7n6q/image/upload/v1753600045/cld-sample-5.jpg" 
    src={heroImage}
    alt="Hero Image"
    sizes="100vw"
  />
  {/* mobile image */}
   <Image
    className="md:hidden h-[80vh] block  inset-0 w-full object-cover object-center md:object-cover sm:object-contain" 
    // src="https://res.cloudinary.com/dzzjh7n6q/image/upload/v1753600045/cld-sample-5.jpg" 
     src={heroImage}
    alt="Hero Image"
    sizes="100vw"
  />
  {/* Optional overlay for better text readability */}
  <div className="absolute inset-0 bg-black/20"></div>
  
  {/* Optional content overlay */}
  <div className="relative z-10 flex items-center justify-center h-full">
    {/* Add your hero content here if needed */}
    
    {/* <div className="text-center text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Hero Title</h1>
      <p className="text-lg md:text-xl mb-8">Your hero description</p>
      <button className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
        Call to Action
      </button>
    </div> */}
   
  </div>
</main>
      <CategorySection />
      <Products />
      {/* <ChatInterface/> */}
    </>
  );
}
