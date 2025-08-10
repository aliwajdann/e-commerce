'use client';
import ProductsSection from "@/components/products";
import SubcategorySlider from "@/components/SubcategoryProducts";
import CategoryRoundSlider from "@/components/CategorySlider";
import HeroSection from "@/components/HeroSection";


import 'swiper/css';
import 'swiper/css/pagination';



export default function HeroCategorySwiper() {
  return (
    <>
  <HeroSection />
    <SubcategorySlider
  category="jewellery"
  subcategory="necklaces"
  title="Necklaces Collection"
/>
 
    <SubcategorySlider
  category="undergarments"
  subcategory="necklaces"
  title="Necklaces Collection"
/>
    <SubcategorySlider
  category="skincare"
  subcategory="necklaces"
  title="Necklaces Collection"
/>
<CategoryRoundSlider category="jewellery" title="Shop by Type" />

<ProductsSection></ProductsSection>
{/* <CategorySection></CategorySection> */}
</>
  );
}