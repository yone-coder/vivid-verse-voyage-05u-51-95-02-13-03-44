
import { useState, useEffect } from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  { id: 1, color: "from-purple-600 to-indigo-600", text: "Premium Collection", description: "Exclusive products at unbeatable prices" },
  { id: 2, color: "from-emerald-600 to-teal-600", text: "Eco-Friendly", description: "Sustainable choices for a better tomorrow" },
  { id: 3, color: "from-rose-600 to-red-600", text: "Limited Edition", description: "Get them before they're gone forever" },
  { id: 4, color: "from-amber-500 to-orange-600", text: "Best Sellers", description: "Most popular items this month" }
];

export default function DesktopSecondaryHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideDuration = 6000;

  useEffect(() => {
    let intervalRef: ReturnType<typeof setInterval> | null = null;
    let progressIntervalRef: ReturnType<typeof setInterval> | null = null;

    const startSlideTimer = () => {
      clearInterval(intervalRef as ReturnType<typeof setInterval>);
      clearInterval(progressIntervalRef as ReturnType<typeof setInterval>);
      setProgress(0);
      const progressStep = (50 / slideDuration) * 100;

      progressIntervalRef = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + progressStep));
      }, 50);

      intervalRef = setInterval(() => {
        setProgress(0);
        setActiveIndex(current => (current + 1) % banners.length);
      }, slideDuration);
    };

    startSlideTimer();
    
    return () => {
      clearInterval(intervalRef as ReturnType<typeof setInterval>);
      clearInterval(progressIntervalRef as ReturnType<typeof setInterval>);
    };
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`relative bg-gradient-to-r ${banners[activeIndex].color} transition-all duration-700 overflow-hidden rounded-lg shadow-lg`}>
      <div className="relative h-64">
        {banners.map((banner, index) => {
          const isActive = index === activeIndex;
          
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full flex items-center transition-all duration-700 ease-out ${
                isActive ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-full z-0"
              }`}
            >
              <div className="container mx-auto px-8">
                <div className="max-w-2xl">
                  <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {banner.text}
                  </h2>
                  <p className="text-white text-lg mb-6 drop-shadow-md font-medium opacity-90">
                    {banner.description}
                  </p>
                  <Button className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg text-base shadow-lg">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-8 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            className="relative h-2 w-8 rounded-full bg-white/30 overflow-hidden hover:bg-white/50 transition-colors"
            onClick={() => handleDotClick(index)}
          >
            <div className="absolute inset-0 bg-white/30 rounded-full"></div>
            {activeIndex === index && (
              <div
                className="absolute inset-0 bg-white rounded-full origin-left transition-all duration-100"
                style={{
                  width: `${progress}%`
                }}
              ></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
