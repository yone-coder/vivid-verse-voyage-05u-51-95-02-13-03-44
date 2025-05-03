
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlide from "./hero/HeroSlide";
import HeroIndicators from "./hero/HeroIndicators";
import HeroControls from "./hero/HeroControls";
import HeroSearch from "./hero/HeroSearch";

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: "/lovable-uploads/2102d3a1-ec6e-4c76-8ee0-549c3ae3d54e.png",
      title: "Discover Amazing Products",
      subtitle: "Find the perfect items for your lifestyle",
      action: "Shop Now",
      renderSearch: true
    },
    {
      image: "/lovable-uploads/4dbaee7c-2ac5-4a1b-9f9b-121275273e79.png",
      title: "Summer Collection",
      subtitle: "Hot deals on cool items",
      action: "View Collection",
    },
    {
      image: "/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png",
      title: "Limited Time Offers",
      subtitle: "Special discounts on selected products",
      action: "See Offers",
    },
  ];

  const handleNext = useCallback(() => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  }, [slides.length]);

  const handlePrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  }, [slides.length]);

  const handleSearchClick = useCallback(() => {
    navigate("/search");
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <HeroSlide
          key={index}
          image={slide.image}
          isActive={activeIndex === index}
          title={slide.title}
          subtitle={slide.subtitle}
          action={slide.action}
          onActionClick={() => navigate("/browse")}
          renderSearch={index === 0}
        />
      ))}

      <HeroControls 
        onPrevious={handlePrevious} 
        onNext={handleNext} 
      />

      <HeroIndicators 
        slides={slides} 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
      />

      {activeIndex === 0 && (
        <HeroSearch onSearchClick={handleSearchClick} />
      )}
    </div>
  );
};

export default HeroBanner;
