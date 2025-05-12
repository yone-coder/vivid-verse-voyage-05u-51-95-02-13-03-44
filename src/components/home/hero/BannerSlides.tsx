
import { BannerType } from './types';
import BannerImage from "@/components/hero/BannerImage";

interface BannerSlidesProps {
  slides: BannerType[];
  activeIndex: number;
  previousIndex: number | null;
}

export default function BannerSlides({ 
  slides, 
  activeIndex, 
  previousIndex 
}: BannerSlidesProps) {
  return (
    <div className="relative w-full">
      {slides.map((banner, index) => {
        const isActive = index === activeIndex;
        const isPrevious = index === previousIndex;
        
        return (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full transition-transform duration-500 ease-out ${
              isActive ? "translate-y-0 z-10 relative" : 
              isPrevious ? "-translate-y-full z-0 hidden" : "translate-y-full z-0 hidden"
            }`}
          >
            <BannerImage
              src={banner.image} 
              alt={banner.alt || "Banner image"}
              className="w-full"
            />
          </div>
        );
      })}
    </div>
  );
}
