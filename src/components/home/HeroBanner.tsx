
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight, ArrowRight } from "lucide-react";

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
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[180px] md:h-[250px] lg:h-[300px] overflow-hidden rounded-lg mx-4 mt-4">
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-30`}></div>
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6">
                    <div className="max-w-lg">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1 md:mb-2 drop-shadow-md">{banner.title}</h2>
                      <p className="text-white text-sm md:text-base mb-3 md:mb-4 max-w-md drop-shadow-md font-medium">{banner.subtitle}</p>
                      <Button className="bg-white text-black hover:bg-gray-100 font-medium text-sm rounded-full">
                        {banner.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 bg-white/80 hover:bg-white" />
        <CarouselNext className="right-6 bg-white/80 hover:bg-white" />
      </Carousel>
      
      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index ? "bg-orange-500 w-6" : "bg-gray-300 w-3"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
