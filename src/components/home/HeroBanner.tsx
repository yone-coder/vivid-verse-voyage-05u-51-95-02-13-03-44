import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "MEGA SALE",
    subtitle: "Up to 70% OFF on thousands of items",
    image: "https://placehold.co/1200x400/FF6B6B/FFF?text=MEGA+SALE",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    subtitle: "Fresh tech and trending products",
    image: "https://placehold.co/1200x400/4ECDC4/FFF?text=NEW+ARRIVALS", 
    cta: "Discover"
  },
  {
    id: 3,
    title: "FLASH DEALS",
    subtitle: "Time-limited offers - Hurry!",
    image: "https://placehold.co/1200x400/FF9A8B/FFF?text=FLASH+DEALS",
    cta: "Grab Deals"
  }
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/1' }}>
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Image container */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {banner.title}
            </h2>
            <p className="text-sm sm:text-base mt-2 text-white">
              {banner.subtitle}
            </p>
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
              {banner.cta}
            </Button>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index ? 'bg-orange-500 w-6' : 'bg-white/50 w-3'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}