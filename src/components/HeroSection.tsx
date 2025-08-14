'use client'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiPause, FiPlay, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Image from 'next/image';
// import image1 from '../assets/image-1.jpg';
// import image2 from '../assets/image-2.jpg';
// import videooo from '../assets/Julia Sloane.mp4';
import image1 from "@/Internet_20250730_210957_1.jpeg"
import image2 from "@/Internet_20250730_210957_2.jpeg"
import image3 from "@/Internet_20250730_210957_4.jpeg"
// import image1 from "@/Velano.png"

// Import styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import '../styles.css'; // New custom styles

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<any>(null);

  const mediaItems = [
    {
      type: 'image',
      src: image1,
      alt: 'Nike Campaign'
    },
    // {
    //   type: 'video',
    //   src: "",
    //   alt: 'Nike Shoe Video'
    // },
    {
      type: 'image',
      src: image2,
      alt: 'Nike Air Max'
    },
    {
      type: 'image',
      src: image3,
      alt: 'Nike Air Max'
    }
  ];

  const togglePlayPause = () => {
    if (swiperRef.current?.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current?.swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <section  className="relative h-[85vh] md:h-[80vh] w-full overflow-hidden flex justify-center items-center">
        {/* <div className='absolute botom-[10%] left-[10%] bg-amber-700'>
            <h2>NEW COLLECTION</h2>
            <button>EXPLORE</button>
        </div> */}
      <Swiper
        ref={swiperRef}
        loop = { true }
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ 
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true
        }}
        speed={800} // Smoother transition
        pagination={{ 
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'w-2 h-2 mx-1 rounded-full bg-white opacity-50 inline-block cursor-pointer transition-opacity',
          bulletActiveClass: '!opacity-100' // Only changes opacity now
        }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
        onAutoplayTimeLeft={(_blank, _, percentage) => {
          setProgress(1 - percentage);
        }}
        // className="md:h-[98%] md:w-[98%] h-full w-full"
        className=" h-full w-full"
      >
        {mediaItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full bg-black">
              {item.type === 'image' ? (
                <Image 
                  src={item.src} 
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <video 
                preload="auto"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full"
                >
                  {/* <source src={item.src} type="video/mp4"/> */}
                </video>
              )}
              {/* <div className="absolute inset-0 bg-black/20 flex items-center justify-center"> */}
                {/* <h2 className="text-white text-5xl font-bold">Nike Campaign {index + 1}</h2> */}
              {/* </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="custom-pagination flex justify-center"></div>
      </div>
       {/* <div className='absolute botom-[10%] left-[10%] bg-amber-700 h-20 w-12'>
            <h2>NEW COLLECTION</h2>
            <button>EXPLORE</button>
        </div> */}

      <div className="absolute bottom-7 right-10 z-10 flex items-center space-x-4">
        {/* Previous Arrow (New) */}
        <button className="hidden md:block custom-prev text-white p-2 rounded-full hover:bg-white/10">
          <FiChevronLeft size={24} />
        </button>

        {/* Play/Pause with Circular Progress */}
        <div className="relative hidden md:block">
          <svg className="w-10 h-10 transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="9"
              fill="transparent"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <motion.circle
              cx="20"
              cy="20"
              r="9"
              fill="transparent"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 56.5487 }}
              animate={{ strokeDashoffset: 56.5487 * (1 - progress) }}
              transition={{ duration: 0.1 }}
              strokeDasharray="56.5487"
            />
          </svg>
          <button 
            onClick={togglePlayPause}
            className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
          >
            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
          </button>
        </div>

        {/* Next Arrow */}
        <button className="custom-next text-white p-2 rounded-full hover:bg-white/10">
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;