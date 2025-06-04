
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DesktopBannerControlsProps {
  slidesCount: number;
  activeIndex: number;
  previousIndex: number | null;
  setActiveIndex: (index: number) => void;
  setPreviousIndex: (index: number | null) => void;
  progress: number;
}

export default function DesktopBannerControls({
  slidesCount,
  activeIndex,
  previousIndex,
  setActiveIndex,
  setPreviousIndex,
  progress
}: DesktopBannerControlsProps) {
  const handlePrevious = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((current) => (current - 1 + slidesCount) % slidesCount);
  };

  const handleNext = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((current) => (current + 1) % slidesCount);
  };

  const handleDotClick = (index: number) => {
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
  };

  return (
    <>
      {/* Navigation Arrows */}
      <button 
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 z-20"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 z-20"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {Array.from({ length: slidesCount }).map((_, index) => (
          <button
            key={index}
            className="relative h-3 w-8 rounded-full bg-white/50 overflow-hidden hover:bg-white/70 transition-colors"
            onClick={() => handleDotClick(index)}
          >
            <div className="absolute inset-0 bg-white/50 rounded-full"></div>
            {activeIndex === index && (
              <div
                className="absolute inset-0 bg-orange-500 rounded-full origin-left transition-all duration-75"
                style={{
                  width: `${progress}%`
                }}
              ></div>
            )}
          </button>
        ))}
      </div>
    </>
  );
}
