import React from 'react'
import ProductsWithoutPrices from './ProductsWithoutPrices'

function ImageAndProducts() {
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
    <div className="flex items-center flex-col gap-4 mb-4">
      <h2 style={{lineHeight: "41px"}} className="text-[32px] font-semibold capitalize text-gray-800">
        OnSaleSection
      </h2>
      <button className="text-sm text-[#681C1C] underline font-medium">
        View All
      </button>
    </div>
  </div>

  {/* Image */}
  <img
    className="mx-[16px] md:mx-0 md:w-full object-cover rounded-[5px]"
    src="https://sfra.production.calzedonia.coremedia.cloud/resource/image/5932608/portrait_ratio1x1/900/900/80781a6da499a9416ab41ee2613e0bf7/B5DED459A00C335C0E0D65F45CEFCCD9/int-hp-cw2525-homepageupdate-shopthelook-all-01-1-.jpg"
    alt=""
  />

  {/* Products List */}
  <div className="overflow-x-hidden">
    <ProductsWithoutPrices
      category="jewellery"
      subcategory="necklaces"
      title="BestSellers on sale"
    />
  </div>
</div>
  )
}

export default ImageAndProducts
