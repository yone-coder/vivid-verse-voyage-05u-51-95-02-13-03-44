
import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchHeroBanners } from "@/integrations/supabase/hero";
import { setupStorageBuckets } from "@/integrations/supabase/setupStorage";
import { toast } from "sonner";
import { BannerType } from '@/components/home/hero/types';

export default function PaytmHeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const slideDuration = 5000;

  // Initialize storage buckets if needed
  useEffect(() => {
    const initStorage = async () => {
      await setupStorageBuckets();
      console.log('Storage buckets initialized');
    };
    initStorage();
  }, []);

  // Fetch banners from Supabase
  const { data: banners, isLoading, error } = useQuery({
    queryKey: ["paytm-hero-banners"],
    queryFn: fetchHeroBanners,
    staleTime: 5000,
    refetchInterval: 10000,
  });

  // Show error if we failed to fetch banners
  useEffect(() => {
    if (error) {
      toast.error("Failed to load banner images");
      console.error("Banner fetch error:", error);
    }
  }, [error]);

  // Fallback banners for Paytm
  const fallbackBanners: BannerType[] = [
    {
      id: "1",
      image: "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
      alt: "Paytm Banner 1",
      position: 0
    },
    {
      id: "2", 
      image: "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
      alt: "Paytm Banner 2",
      position: 1
    },
    {
      id: "3",
      image: "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png",
      alt: "Paytm Banner 3", 
      position: 2
    }
  ];

  const slidesToShow = banners?.length > 0 ? banners : fallbackBanners;

  // Set up intervals for banner rotation and progress tracking
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
        setPreviousIndex(activeIndex);
        setActiveIndex(current => (current + 1) % slidesToShow.length);
      }, slideDuration);
    };

    startSlideTimer();
    
    return () => {
      clearInterval(intervalRef as ReturnType<typeof setInterval>);
      clearInterval(progressIntervalRef as ReturnType<typeof setInterval>);
    };
  }, [activeIndex, slidesToShow.length]);

  if (isLoading) {
    return (
      <div className="w-full mb-4">
        <div className="relative w-full bg-gray-200 animate-pulse aspect-[16/9]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Loading banners...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-4">
      <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
        {/* Image slides container */}
        <div className="absolute inset-0 w-full h-full">
          {slidesToShow.map((banner, index) => {
            const isActive = index === activeIndex;
            const isPrevious = index === previousIndex;
            
            return (
              <div
                key={banner.id}
                className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-out ${
                  isActive ? "translate-x-0 z-10" : 
                  isPrevious ? "-translate-x-full z-0" : "translate-x-full z-0"
                }`}
              >
                <img
                  src={banner.image} 
                  alt={banner.alt || "Banner image"}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
        
        {/* Progress dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
          {slidesToShow.map((_, index) => (
            <button
              key={index}
              className="relative h-1.5 rounded-full bg-white/40 w-6 overflow-hidden"
              onClick={() => {
                setPreviousIndex(activeIndex);
                setActiveIndex(index);
              }}
            >
              <div className="absolute inset-0 bg-white/40 rounded-full"></div>
              {activeIndex === index && (
                <div
                  className="absolute inset-0 bg-white rounded-full origin-left"
                  style={{
                    width: `${progress}%`,
                    transition: 'width 0.05s linear'
                  }}
                ></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
