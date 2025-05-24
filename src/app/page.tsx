// "use client";
// import { useTransition } from "react";
// import { useRouter } from "next/navigation";
// import Loader from "@/app/components/loader";
import Image from "next/image";
import Products from "@/components/products"
import heroImage from "../hero-image.jpg";
import Link from "next/link";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  // const router = useRouter();
  // const [isPending, startTransition] = useTransition();

  // const handleClick = () => {
  //   startTransition(() => {
  //     router.push("/products");
  //   });
  // };
// Please install OpenAI SDK first: `npm install openai`

    






  return (
    <>
      {/* {isPending && <Loader />} */}
      <main className="min-h-screen bg-light dark:bg-dark transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center h-full gap-16">
          {/* Left Side */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-base-dark dark:text-base-light leading-tight mb-6">
              Elevate Your Style <br />
              <span className=" text-fuchsia-500">With Every Stitch</span>
            </h1>
            <p className="text-lg text-muted dark:text-base-light mb-8">
              Discover the latest fashion trends for men and women. Quality,
              comfort, and elegance — all in one place.
            </p>
            <div className="flex gap-4">
              <Link
                // onClick={handleClick} 
               href={'/products'}  className="bg-fuchsia-500 text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
              >
                Shop Now
              </Link>

              <button className="border border-fuchsia-500 text-fuchsia-500 px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <Image
              src={heroImage}
              alt="Clothing model"
              className="h-96 rounded-3xl shadow-xl object-cover"
            />
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30 rounded-3xl" />
          </div>
        </div>
      </main>

      <Products />
      <ChatInterface/>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </>
  );
}
