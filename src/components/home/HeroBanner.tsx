import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Ensure your Button component is available
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming you have a mobile hook for responsiveness

const banners = [
  {
    id: 1,
    title: "MEGA SALE",
    subtitle: "Up to 70% OFF on thousands of items",
    image: "https://placehold.co/1200x400/FF6B6B/FFF?text=MEGA+SALE",
    color: "from-orange-500 to-red-500",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    subtitle: "Fresh tech and trending products",
    image: "https://placehold.co/1200x400/4ECDC4/FFF?text=NEW+ARRIVALS",
    color: "from-cyan-500 to-blue-500",
    cta: "Discover"
  },
  {
    id: 3,
    title: "FLASH DEALS",
    subtitle: "Time-limited offers - Hurry!",
    image: "https://placehold.co/1200x400/FF9A8B/FFF?text=FLASH+DEALS",
    color: "from-orange-400 to-red-400",
    cta: "Grab Deals"
  }
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000); // 5 seconds transition time for banner change
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

          {/* Banner Content */}
          <div className="relative z-10 h-full flex items-center justify-center flex-col text-white text-center px-4">
            <h2 className="text-2xl md:text-4xl font-bold">{banner.title}</h2>
            <p className="text-sm md:text-base mt-2">{banner.subtitle}</p>
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
              {banner.cta}
            </Button>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full transition-all ${
              activeIndex === index ? 'bg-orange-500 w-5' : 'bg-gray-300 w-2.5'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}