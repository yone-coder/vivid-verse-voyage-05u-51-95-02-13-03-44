
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import slide components
import ProjectOverviewSlide1 from './slides/ProjectOverviewSlide1';
import ProjectOverviewSlide2 from './slides/ProjectOverviewSlide2';
import ProjectOverviewSlide3 from './slides/ProjectOverviewSlide3';
import ProjectOverviewSlide4 from './slides/ProjectOverviewSlide4';
import ProjectOverviewSlide5 from './slides/ProjectOverviewSlide5';
import ProjectOverviewSlide6 from './slides/ProjectOverviewSlide6';

const slides = [
  { component: ProjectOverviewSlide1, title: "Introduction" },
  { component: ProjectOverviewSlide2, title: "Step 1: Access Platform" },
  { component: ProjectOverviewSlide3, title: "Step 2: Recipient Details" },
  { component: ProjectOverviewSlide4, title: "Step 3: Payment" },
  { component: ProjectOverviewSlide5, title: "Step 4: Receipt" },
  { component: ProjectOverviewSlide6, title: "Step 5: Pickup & Security" }
];

export default function ProjectOverviewChapter() {
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
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
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
                  ? 'bg-blue-600 scale-125' 
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
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
