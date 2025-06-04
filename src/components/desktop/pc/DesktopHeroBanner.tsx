
import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchHeroBanners } from "@/integrations/supabase/hero";
import { setupStorageBuckets } from "@/integrations/supabase/setupStorage";
import { toast } from "sonner";
import DesktopBannerSlides from './DesktopBannerSlides';
import DesktopBannerControls from './DesktopBannerControls';
import DesktopNewsTicker from './DesktopNewsTicker';
import { BannerType } from '@/components/home/hero/types';

export default function DesktopHeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [showNews, setShowNews] = useState(true);
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
    queryKey: ["hero-banners-desktop"],
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

  // Fallback banners for desktop
  const fallbackBanners: BannerType[] = [
    {
      id: "1",
      image: "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
      alt: "Desktop Banner 1",
      position: 0
    },
    {
      id: "2",
      image: "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
      alt: "Desktop Banner 2",
      position: 1
    },
    {
      id: "3",
      image: "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png",
      alt: "Desktop Banner 3",
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
      <div className="relative w-full bg-gray-200 animate-pulse h-96">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400">Loading desktop banners...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden w-full h-96 rounded-lg shadow-lg">
        <DesktopBannerSlides 
          slides={slidesToShow}
          activeIndex={activeIndex}
          previousIndex={previousIndex}
        />
        <DesktopBannerControls
          slidesCount={slidesToShow.length}
          activeIndex={activeIndex}
          previousIndex={previousIndex}
          setActiveIndex={setActiveIndex}
          setPreviousIndex={setPreviousIndex}
          progress={progress}
        />
      </div>
      {showNews && <DesktopNewsTicker />}
    </>
  );
}
