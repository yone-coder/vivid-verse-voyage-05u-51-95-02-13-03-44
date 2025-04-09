
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Summer Sale Up to 70% OFF",
    subtitle: "Amazing deals on electronics, fashion, home goods and more!",
    image: "https://placehold.co/1200x400/FF6B6B/FFF?text=Summer+Sale",
    color: "from-pink-500 to-red-500",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Check out the latest tech gadgets and accessories",
    image: "https://placehold.co/1200x400/4ECDC4/FFF?text=New+Tech+Arrivals",
    color: "from-teal-500 to-blue-500",
    cta: "Discover"
  },
  {
    id: 3,
    title: "Flash Deals",
    subtitle: "Limited time offers - up to 50% off top brands",
    image: "https://placehold.co/1200x400/FF9A8B/FFF?text=Flash+Deals",
    color: "from-orange-500 to-red-500",
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
              <div className="relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-30`}></div>
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6">
                    <div className="max-w-lg">
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 drop-shadow-md">{banner.title}</h2>
                      <p className="text-white mb-4 md:mb-6 max-w-md drop-shadow-md hidden md:block">{banner.subtitle}</p>
                      <Button className="bg-white text-black hover:bg-gray-100 font-medium">
                        {banner.cta} <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === index ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
