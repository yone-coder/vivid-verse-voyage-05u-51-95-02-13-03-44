
import { BannerType } from '@/components/home/hero/types';

interface DesktopBannerSlidesProps {
  slides: BannerType[];
  activeIndex: number;
  previousIndex: number | null;
}

export default function DesktopBannerSlides({ 
  slides, 
  activeIndex, 
  previousIndex 
}: DesktopBannerSlidesProps) {
  return (
    <div className="relative h-full w-full">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const isPrevious = index === previousIndex;
        
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              isActive 
                ? "opacity-100 scale-100 z-10" 
                : isPrevious 
                ? "opacity-0 scale-105 z-0" 
                : "opacity-0 scale-95 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            
            {/* Desktop-specific overlay content */}
            <div className="absolute bottom-8 left-8 text-white max-w-md">
              <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">
                Special Offers
              </h2>
              <p className="text-lg mb-4 drop-shadow-md">
                Discover amazing deals on thousands of products
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
