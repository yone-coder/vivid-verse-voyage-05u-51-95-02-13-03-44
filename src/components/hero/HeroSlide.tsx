
import React from "react";

interface HeroSlideProps {
  image: string;
  isActive: boolean;
  title: string;
  subtitle: string;
  action: string;
  onActionClick?: () => void;
  renderSearch?: boolean;
}

const HeroSlide: React.FC<HeroSlideProps> = ({
  image,
  isActive,
  title,
  subtitle,
  action,
  onActionClick,
  renderSearch
}) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      } bg-cover bg-center`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight animate-fadeIn">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-md mx-auto animate-fadeUp opacity-90">
          {subtitle}
        </p>
        {!renderSearch && (
          <button
            onClick={onActionClick}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-2 px-6 rounded-full hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 animate-fadeUp"
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroSlide;
