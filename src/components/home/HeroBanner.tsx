import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const banners = [
  {
    id: 1,
    title: "MEGA SALE",
    subtitle: "Up to 70% OFF on thousands of items",
    image: "https://placehold.co/1200x400/FF6B6B/FFF?text=MEGA+SALE",
    color: "from-orange-500 to-red-500",
    cta: "Shop Now"
  },
  // ... other banners
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{marginTop: "-1px"}}>
      {/* Container with minimum height that will expand with content */}
      <div className="relative w-full min-h-[200px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image container that maintains aspect ratio */}
            <div className="w-full h-full">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex items-center justify-center flex-col text-white text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{banner.title}</h2>
              <p className="text-sm sm:text-base mt-2">{banner.subtitle}</p>
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                {banner.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`rounded-full transition-all ${
              activeIndex === index ? 'bg-orange-500 w-4 h-1' : 'bg-gray-300 w-2 h-1'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
