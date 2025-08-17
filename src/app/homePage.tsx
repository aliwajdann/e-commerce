'use client';
// import ProductsSection from "@/components/products";
// import SubcategorySlider from "@/components/SubcategoryProducts";
// import CategoryRoundSlider from "@/components/CategorySlider";
// import CategoryGrid from "@/components/CategoryGrid";
import HeroSection from "@/components/HeroSection";
// import InspirationSection from "@/components/InspirationSection";
// import TrendingSection from "@/components/TrendingSection";
// import AsSeenInSection from "@/components/AsSeenIn";
// import TestimonialSection from "@/components/Testimonials";
// import TextWithImage from "@/components/TextWithImage";
import OnSaleSection from "@/components/OnSaleSection";
import ImageAndProducts from "@/components/ImageAndProducts";
import TextAndProducts from "@/components/TextAndProducts";
import PromoGrid from "@/components/PromoGrid";
import TextWithCategories from "@/components/TextWithCategories";
import ServicesSection from "@/components/ServicesSection";
import CollectionSectionTexts from "@/components/CollectionSectionTexts"



import 'swiper/css';
import 'swiper/css/pagination';



export default function HeroCategorySwiper() {
  return (
    <>
  <HeroSection />
    <OnSaleSection
  category="jewellery"
  subcategory="necklaces"
  title="BestSellers on sale"
/>
<ImageAndProducts  
image="https://sfra.production.calzedonia.coremedia.cloud/resource/image/5932608/portrait_ratio1x1/900/900/80781a6da499a9416ab41ee2613e0bf7/B5DED459A00C335C0E0D65F45CEFCCD9/int-hp-cw2525-homepageupdate-shopthelook-all-01-1-.jpg"
title="Fresh pyjamas for summer" tagline="" linktext="Shop Now" buttonlink=""
/>
<TextAndProducts />
<ImageAndProducts 
title="The perfect combo"
tagline="Light tank tops and briefs to match in many colours"
linktext="Shop Now" 
buttonlink=""
image="https://sfra.production.calzedonia.coremedia.cloud/resource/image/5934182/portrait_ratio1x1/900/900/e5e057f83d0ccbe58a8db6afe0107cfc/8DCAE655F003897EDFBA7528A57535AE/int-hp-cw2525-homepageupdate-shopthelook-all-02.jpg"/>
<TextWithCategories />
<PromoGrid />
<ServicesSection />
<CollectionSectionTexts />
    {/* <SubcategorySlider
  category="jewellery"
  subcategory="necklaces"
  title="Necklaces Collection"
/> */}
 {/* <CategoryGrid /> */}
 {/* <InspirationSection /> */}
 {/* <TrendingSection /> */}
 {/* <TextWithImage /> */}
 {/* <AsSeenInSection /> */}
 {/* <TestimonialSection /> */}
    {/* <SubcategorySlider
  category="undergarments"
  subcategory="necklaces"
  title="Necklaces Collection"
/>
    <SubcategorySlider
  category="skincare"
  subcategory="necklaces"
  title="Necklaces Collection"
/> */}
{/* <CategoryRoundSlider category="jewellery" title="Shop by Type" /> */}

{/* <ProductsSection></ProductsSection> */}
{/* <CategorySection></CategorySection> */}
</>
  );
}