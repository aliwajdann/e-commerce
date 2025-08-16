import React from 'react'
import ProductsWithoutPrices from './ProductsWithoutPrices'
import Link from 'next/link'

function TextAndProducts() {
  return (
  <div className="md:pl-[32px] pl-[0px] grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden">
  
  {/* Mobile header section */}
  <div className="md:hidden flex flex-col items-center justify-center">
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
  </div>

  {/* Image */}
  <div>
    <h4>T-Shirts</h4>
    <p>So many fabrics, patterns and colours to collect</p>
    <Link href="">Shop Now</Link>
  </div>

  {/* Products List */}
  <div className="overflow-x-hidden">
    <ProductsWithoutPrices
      category="jewellery"
      subcategory="necklaces"
      title=""
      linktext=""
    />
  </div>
</div>
  )
}

export default TextAndProducts

