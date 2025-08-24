
"use client"
import React from 'react'
import CustomCategorySlider from "./CustomCategorySlider";

function TextWithCategories () {
  return (
    <>
  <div className="textwithcategories pt-[32px] md:pt-[40px] md:pl-[32px] pl-[0px]  items-center overflow-hidden">
  
  {/* Mobile header section */}
  {/* <div className="md:hidden flex flex-col items-center justify-center"> */}
    {/* <div className="inline-flex items-center justify-center mb-6">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
      <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
        <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
      </div>  
      <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-20"></div>
    </div> */}
    {/* <div className="flex items-center flex-col gap-4 mb-4">
      <h2 style={{lineHeight: "41px"}} className="text-[32px] font-semibold capitalize text-gray-800">
        OnSaleSection
      </h2>
      <button className="text-sm text-[#681C1C] underline font-medium">
        View All
      </button>
    </div> */}
  {/* </div> */}

  {/* Image */}
  <div className='pl-[16px] md:pl-[32px]'>
    <h4 className='text-[24px]  md:text-[32px] font-medium capitalize text-[#3C3738]'>Summer Essentials</h4>
    {/* <p>So many fabrics, patterns and colours to collect</p> */}
    {/* <Link href="" className='text-sm custom-gray underline  text-[#3c3738]'>Shop Now</Link> */}
  </div>

  {/* Products List */}
  <div className="overflow-x-hidden">
    <CustomCategorySlider  />
  </div>
</div>
 <style jsx>{`
        .textwithcategories {
          display: grid;
        }

        /* Desktop (>=768px) */
        @media (min-width: 768px) {
          .textwithcategories {
            grid-template-columns: 25% auto;
          }
        }

        /* Mobile (<768px) */
        @media (max-width: 767px) {
          .textwithcategories {
            grid-template-rows:  auto auto;
          }
        }
      `}</style>
</>
  )
}

export default TextWithCategories

