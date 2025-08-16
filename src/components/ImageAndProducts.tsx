import React from 'react'
import ProductsWithoutPrices from './ProductsWithoutPrices'

function ImageAndProducts() {
  return (
  <div className="pt-[32px] md:pt-[40px] w-full md:pl-[32px] pl-[0px] grid grid-cols-1 md:grid-cols-2 items-center justify-center overflow-hidden">
  
  {/* Mobile header section */}
  <div className="md:hidden flex flex-col items-center justify-center">
    <div className="flex items-center flex-col gap-4 mb-4">
      <h2  className="text-[32px] capitalize text-gray-800">
        OnSale Section
      </h2>
      <button className="text-sm text-gray-800 underline font-medium">
        View All
      </button>
    </div>
  </div>

  {/* Image */}
  <div className="w-full px-4 md:px-0">
  <img
    className="w-full object-cover rounded-sm"
        src="https://sfra.production.calzedonia.coremedia.cloud/resource/image/5932608/portrait_ratio1x1/900/900/80781a6da499a9416ab41ee2613e0bf7/B5DED459A00C335C0E0D65F45CEFCCD9/int-hp-cw2525-homepageupdate-shopthelook-all-01-1-.jpg"

    alt=""
  />
</div>


  {/* Products List */}
  <div className="overflow-x-hidden">
    <ProductsWithoutPrices
      category="jewellery"
      subcategory="necklaces"
      title="BestSellers on sale"
      linktext="View All"
    />
  </div>
</div>
  )
}

export default ImageAndProducts

