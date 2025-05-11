import { useState, useEffect, useCallback } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchHeroBanners } from "@/integrations/supabase/hero";
import { setupStorageBuckets } from "@/integrations/supabase/setupStorage";
import { ChevronLeft, ChevronRight, AlertCircle, TrendingUp, Clock, Newspaper } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import BannerImage from "@/components/hero/BannerImage";

// News items for the ticker
const newsItems = [
  { id: 1, icon: <AlertCircle className="w-3 h-3 text-white" />, text: "EXTRA 10% OFF WITH CODE: SUMMER10" },
  { id: 2, icon: <TrendingUp className="w-3 h-3 text-white" />, text: "FREE SHIPPING ON ORDERS OVER ¥99" },
  { id: 3, icon: <Clock className="w-3 h-3 text-white" />, text: "LIMITED TIME: BUY 2 GET 1 FREE" },
  { id: 4, icon: <Newspaper className="w-3 h-3 text-white" />, text: "NEW SEASON ITEMS JUST ARRIVED" }
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [showNews, setShowNews] = useState(true);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [previousNewsIndex, setPreviousNewsIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const slideDuration = 5000;
  const newsDuration = 4000;

  // Initialize storage buckets if needed
  useEffect(() => {
    const initStorage = async () => {
      await setupStorageBuckets();
      console.log('Storage buckets initialized');
    };
    initStorage();
  }, []);

  // Fetch banners from Supabase with a shorter cache time for testing
  const { data: banners = [], isLoading, error, refetch } = useQuery({
    queryKey: ["hero-banners"],
    queryFn: fetchHeroBanners,
    staleTime: 5000, // 5 seconds - reduced for testing
    refetchInterval: 10000, // 10 seconds - reduced for testing
  });

  // Show error if we failed to fetch banners
  useEffect(() => {
    if (error) {
      toast.error("Failed to load banner images");
      console.error("Banner fetch error:", error);
    }
  }, [error]);

  // Log banners whenever they change
  useEffect(() => {
    if (banners) {
      console.log("Banners loaded from query:", banners);
      
      // Force image preloading
      banners.forEach(banner => {
        if (banner.image) {
          const img = new Image();
          img.src = banner.image;
          img.onload = () => console.log(`Preloaded image successfully: ${banner.image}`);
          img.onerror = (e) => console.error(`Failed to preload image ${banner.image}:`, e);
        }
      });
    }
  }, [banners]);

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
        setActiveIndex(current => (current + 1) % (banners.length || 1));
      }, slideDuration);
    };

    if (banners.length > 0) {
      startSlideTimer();
    }
    
    return () => {
      if (intervalRef) clearInterval(intervalRef);
      if (progressIntervalRef) clearInterval(progressIntervalRef);
    };
  }, [activeIndex, banners.length]);

  // Set up interval for news ticker
  useEffect(() => {
    let newsIntervalRef: ReturnType<typeof setInterval> | null = null;

    const startNewsTimer = () => {
      clearInterval(newsIntervalRef as ReturnType<typeof setInterval>);
      newsIntervalRef = setInterval(() => {
        setPreviousNewsIndex(activeNewsIndex);
        setActiveNewsIndex(current => (current + 1) % newsItems.length);
      }, newsDuration);
    };

    startNewsTimer();

    return () => {
      if (newsIntervalRef) clearInterval(newsIntervalRef);
    };
  }, [activeNewsIndex]);

  const handleDotClick = (index: number) => {
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
  };

  // Manual refetch button for debugging
  const debugRefetch = () => {
    console.log("Manual refetch triggered");
    refetch();
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] bg-gray-200 animate-pulse mt-[44px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400">Loading banners...</span>
        </div>
      </div>
    );
  }

  // If no banners are available from Supabase, show a placeholder
  if (!banners || banners.length === 0) {
    return (
      <div className="relative mt-[44px] bg-gray-100 h-[60vh] min-h-[400px] max-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-2">No banner images found</div>
          <button
            onClick={debugRefetch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
          >
            Refresh Banners
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative mt-[44px] overflow-hidden">
        {/* Debug button for development */}
        <button 
          onClick={debugRefetch}
          className="absolute top-0 right-0 z-50 bg-blue-500 text-white px-2 py-1 text-xs"
        >
          Refresh Banners
        </button>
        
        <div className="relative h-[180px] md:h-[250px] lg:h-[300px]">
          {/* Banner Images - Only showing images from Supabase */}
          {banners.map((banner, index) => {
            const isActive = index === activeIndex;
            const isPrevious = index === previousIndex;
            
            return (
              <div
                key={banner.id}
                className={`absolute inset-0 w-full transition-transform duration-500 ease-out ${
                  isActive ? "translate-y-0 z-10" : 
                  isPrevious ? "-translate-y-full z-0" : "translate-y-full z-0"
                }`}
              >
                <BannerImage
                  src={banner.image} 
                  alt={banner.alt || "Banner image"}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        {!isMobile && banners.length > 1 && (
          <>
            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/80 hover:bg-white hidden md:flex items-center justify-center z-20"
              onClick={() => {
                setPreviousIndex(activeIndex);
                setActiveIndex((current) => (current - 1 + banners.length) % banners.length);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/80 hover:bg-white hidden md:flex items-center justify-center z-20"
              onClick={() => {
                setPreviousIndex(activeIndex);
                setActiveIndex((current) => (current + 1) % banners.length);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Animated Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {banners.map((_, index) => (
              <button
                key={index}
                className="relative h-1 rounded-full bg-gray-300 w-5 overflow-hidden"
                onClick={() => handleDotClick(index)}
              >
                <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
                {activeIndex === index && (
                  <div
                    className="absolute inset-0 bg-orange-500 rounded-full origin-left"
                    style={{
                      width: `${progress}%`,
                      transition: 'width 0.05s linear'
                    }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Smooth Vertical Sliding News Banner */}
      {showNews && (
        <div className="bg-red-50">
          <div className="max-w-screen-xl mx-auto">
            <div className="relative overflow-hidden h-7">
              {newsItems.map((item, index) => {
                const bgColors = [
                  "bg-red-600", "bg-orange-500", "bg-blue-600", "bg-purple-600"
                ];
                const bgColor = bgColors[index % bgColors.length];
                const isActive = index === activeNewsIndex;
                const isPrevious = index === previousNewsIndex;

                return (
                  <div
                    key={item.id}
                    className={`absolute top-0 left-0 w-full h-7 flex items-center px-2 transform transition-transform duration-500 ease-in-out ${bgColor} ${
                      isActive ? "translate-y-0 z-10" : 
                      isPrevious ? "-translate-y-full z-0" : "translate-y-full z-0"
                    }`}
                  >
                    <span className="flex-shrink-0 mr-1">{item.icon}</span>
                    <span className="text-xs font-medium text-white truncate">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
