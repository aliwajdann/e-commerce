'use client';
import ProductsSection from "@/components/products";
import SubcategorySlider from "@/components/SubcategoryProducts";
import CategoryRoundSlider from "@/components/CategorySlider";
import CategoryGrid from "@/components/CategoryGrid";
import HeroSection from "@/components/HeroSection";
import InspirationSection from "@/components/InspirationSection";
import TrendingSection from "@/components/TrendingSection";
import AsSeenInSection from "@/components/AsSeenIn";
import TestimonialSection from "@/components/Testimonials";
import TextWithImage from "@/components/TextWithImage";
import OnSaleSection from "@/components/OnSaleSection";
import ImageAndProducts from "@/components/ImageAndProducts";


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
<ImageAndProducts />
    {/* <SubcategorySlider
  category="jewellery"
  subcategory="necklaces"
  title="Necklaces Collection"
/> */}
 <CategoryGrid />
 <InspirationSection />
 <TrendingSection />
 <TextWithImage />
 <AsSeenInSection />
 <TestimonialSection />
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
<CategoryRoundSlider category="jewellery" title="Shop by Type" />

{/* <ProductsSection></ProductsSection> */}
{/* <CategorySection></CategorySection> */}
</>
  );
}