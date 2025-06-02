import Image from "next/image";
import Products from "@/components/products"
import ChatInterface from "@/components/ChatInterface";
// import { Image } from "lucide-react";
import CategorySection from "@/components/CategorySection";
import img from '@/hero-bg-img.jpg'

export default function Home() {

  return (
    <>
      <main className="h-lvh w-full relative">
         <Image  className={"absolute h-full w-full"} src={img} alt="" />
      </main>
      <CategorySection />
      <Products />
      <ChatInterface/>

    </>
  );
}
