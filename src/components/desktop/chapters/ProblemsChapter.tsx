
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import slide components
import ProblemsSlide1 from './slides/ProblemsSlide1';
import ProblemsSlide2 from './slides/ProblemsSlide2';
import ProblemsSlide3 from './slides/ProblemsSlide3';
import ProblemsSlide4 from './slides/ProblemsSlide4';

const slides = [
  { component: ProblemsSlide1, title: "Overview of Community Challenges" },
  { component: ProblemsSlide2, title: "Absence of Local Transfer Offices" },
  { component: ProblemsSlide3, title: "Limited MonCash/NatCash Capacity" },
  { component: ProblemsSlide4, title: "Expensive and Tiring Travel" }
];

export default function ProblemsChapter() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const CurrentSlideComponent = slides[currentSlide].component;
  
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Slide Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{slides[currentSlide].title}</h2>
          <p className="text-sm text-gray-600">Slide {currentSlide + 1} of {slides.length}</p>
        </div>
        
        {/* Slide Progress */}
        <div className="flex space-x-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-600 scale-125' 
                  : index < currentSlide 
                    ? 'bg-green-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <div className="animate-fade-in">
        <CurrentSlideComponent />
      </div>

      {/* Slide Navigation */}
      <div className="flex justify-between items-center pt-4">
        <Button
          onClick={goToPreviousSlide}
          disabled={currentSlide === 0}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>
        
        <div className="text-center">
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        <Button
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
          size="sm"
          className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
