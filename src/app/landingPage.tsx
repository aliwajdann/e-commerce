import React from 'react'
import ProductMedia from '@/components/productPage/ProductMedia'
import ProductInfo from '@/components/productPage/ProductInfo'
import ReviewsSection from '@/components/productPage/ReviewsSection';
import FaqSection from '@/components/productPage/FaqSection';


function LandingPage() {
  interface MediaType {
    type: 'image' | 'video';
    url: string;
  }

  const mediaArray: MediaType[] = [
    { type: 'image', url:'https://images.unsplash.com/photo-1730266760646-f36875b4fbbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydGFibGUlMjBqdWljZXIlMjBibGVuZGVyc3xlbnwwfHwwfHx8MA%3D%3D'},
    { type: 'image', url:'https://images.unsplash.com/photo-1620205252136-0944971c1ca2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBvcnRhYmxlJTIwanVpY2VyJTIwYmxlbmRlcnN8ZW58MHx8MHx8fDA%3D'},
    { type: 'image', url:'https://plus.unsplash.com/premium_photo-1727967194388-d838e1f37dec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8'},
    { type: 'image', url:'https://images.unsplash.com/photo-1752347179691-02d55bae9df3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D'},
    { type: 'image', url:'https://images.unsplash.com/photo-1750262727446-759032bf283f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D'},
    { type: 'image', url:'https://images.unsplash.com/photo-1752407828561-2450ced77979?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8'},
  ]

  return (
    <>

    {/* <div className='md:grid md:grid-cols-2 md:my-5 mb-5'>
      <ProductMedia media={mediaArray} />
      <ProductInfo
              id={'1122'}
              title={"Deerma Portable Juicer Fruit Blender NU-06"}
              price={1998}
              description={`QUICK & EASY OPERATION
PORTABLE DESIGN
HIGH-QUALITY MATERIAL
MULTIPURPOSE USES
RECHARGEABLE ELECTRIC JUICER`} 
              media={mediaArray}
              originalprice={2998}
            />
           
    </div>
     <div className="description mb-10 md:w-[95%] md:p-[2%] w-[90%] mx-auto p-[3] grid gap-4">
              <h4 className='md:text-[22px] text-[20px] font-bold'>Description </h4>
              <h4 className='md:text-[22px] text-[20px] font-bold'>Portable Juicer Fruit Blender with Detachable Blade Multi-Function Rechargeable Electric Juice Machine (400ML)
</h4>
<ul className="list-disc grid gap-2">
<li className='md:text-[15px] text-[14px] text-gray-400'> QUICK & EASY OPERATION: Keeping yourself juicing even if you’re away from home.This juicer blender offers you a convenient way to prepare juice, you just need to cut ingredients into small cups and pour the right amount of water. Just press the switch to turn it on.</li>
<li className='md:text-[15px] text-[14px] text-gray-400'> PORTABLE DESIGN: In simple it’s the juicer cup for any time, anywhere. You can take it while you’re traveling. 15 days long battery life is enough for making 6 cups of juice with one charge. Its anti-accident opening makes it a safe product during travel.</li>
<li className='md:text-[15px] text-[14px] text-gray-400'> HIGH-QUALITY MATERIAL: The PPTG bottle material make it a lightweight product that’s why it’s good to carry with you. It’s designed to maximize durability and sustainability. Everything is now for you! drink your favorite fruit juice in a quick time.</li>
<li className='md:text-[15px] text-[14px] text-gray-400'> MULTIPURPOSE USES: Press 2 times to open the system, you don’t need to worry that it will open accidentally. You can enjoy fruit and vegetable juice within a matter of a few seconds.</li>
<li className='md:text-[15px] text-[14px] text-gray-400'> RECHARGEABLE ELECTRIC JUICER: This mini juicer fruit blender is suitable for making 8 cups of juice after charging. No wire restrictions, It’s easy to make juice. Just tilt and shake from side to side to make the juice for your loved ones.</li>
            </ul>
            </div>
<FaqSection />
            <ReviewsSection /> */}
    </>
  )
}

export default LandingPage
