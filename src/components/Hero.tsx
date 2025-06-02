import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import heroImage from "@/hero-image.jpg"

function Hero() {
  return (
    <div>
      {/* {isPending && <Loader />} */}
            <main className="min-h-screen bg-light dark:bg-dark transition-colors duration-500">
              <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center h-full gap-16">
                {/* Left Side */}
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-base-dark dark:text-base-light leading-tight mb-6">
                    Elevate Your Style <br />
                    <span className=" text-primary">With Every Stitch</span>
                  </h1>
                  <p className="text-lg text-muted dark:text-base-light mb-8">
                    Discover the latest fashion trends for men and women. Quality,
                    comfort, and elegance — all in one place.
                  </p>
                  <div className="flex gap-4">
                    <Link
                      // onClick={handleClick} 
                     href={'/products'}  className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
                    >
                      Shop Now
                    </Link>
      
                    <button className="border border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition">
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
      
    </div>
  )
}

export default Hero
