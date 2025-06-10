
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import all slide components
import ProjectOverviewSlide1 from './chapters/slides/ProjectOverviewSlide1';
import ProjectOverviewSlide2 from './chapters/slides/ProjectOverviewSlide2';
import ProjectOverviewSlide3 from './chapters/slides/ProjectOverviewSlide3';
import ProjectOverviewSlide4 from './chapters/slides/ProjectOverviewSlide4';
import ProjectOverviewSlide5 from './chapters/slides/ProjectOverviewSlide5';
import ProjectOverviewSlide6 from './chapters/slides/ProjectOverviewSlide6';
import ProblemsSlide1 from './chapters/slides/ProblemsSlide1';
import ProblemsSlide2 from './chapters/slides/ProblemsSlide2';
import ProblemsSlide3 from './chapters/slides/ProblemsSlide3';
import ProblemsSlide4 from './chapters/slides/ProblemsSlide4';
import RevenueSlide1 from './chapters/slides/RevenueSlide1';
import RevenueSlide2 from './chapters/slides/RevenueSlide2';
import RevenueSlide3 from './chapters/slides/RevenueSlide3';
import PitchDeckChapter from './chapters/PitchDeckChapter';
import CommunicationStrategyChapter from './chapters/CommunicationStrategyChapter';
import OperationsPlanChapter from './chapters/OperationsPlanChapter';
import RisksChapter from './chapters/RisksChapter';
import EvaluationChapter from './chapters/EvaluationChapter';
import ConclusionChapter from './chapters/ConclusionChapter';

const allSlides = [
  // Project Overview Slides (Chapter 1)
  { component: ProjectOverviewSlide1, title: "Global Transfer Introduction", chapter: "Kisa Pwojè a Ye?", chapterColor: "blue" },
  { component: ProjectOverviewSlide2, title: "Step 1: Access Platform", chapter: "Kisa Pwojè a Ye?", chapterColor: "blue" },
  { component: ProjectOverviewSlide3, title: "Step 2: Recipient Details", chapter: "Kisa Pwojè a Ye?", chapterColor: "blue" },
  { component: ProjectOverviewSlide4, title: "Step 3: Payment", chapter: "Kisa Pwojè a Ye?", chapterColor: "blue" },
  { component: ProjectOverviewSlide5, title: "Step 4: Receipt", chapter: "Kisa Pwojè a Ye?", chapterColor: "blue" },
  { component: ProjectOverviewSlide6, title: "Step 5: Pickup & Security", chapter: "Kisa Pwojè a Ye?", chapterColor: "blue" },
  
  // Problems Slides (Chapter 2)
  { component: ProblemsSlide1, title: "Overview of Community Challenges", chapter: "Ki Pwoblèm Nou Vle Rezoud?", chapterColor: "red" },
  { component: ProblemsSlide2, title: "Absence of Local Transfer Offices", chapter: "Ki Pwoblèm Nou Vle Rezoud?", chapterColor: "red" },
  { component: ProblemsSlide3, title: "Limited MonCash/NatCash Capacity", chapter: "Ki Pwoblèm Nou Vle Rezoud?", chapterColor: "red" },
  { component: ProblemsSlide4, title: "Expensive and Tiring Travel", chapter: "Ki Pwoblèm Nou Vle Rezoud?", chapterColor: "red" },
  
  // Revenue Model Slides (Chapter 3)
  { component: RevenueSlide1, title: "Financial Planning Strategy", chapter: "Plan Finansman", chapterColor: "green" },
  { component: RevenueSlide2, title: "Primary Revenue Sources", chapter: "Plan Finansman", chapterColor: "green" },
  { component: RevenueSlide3, title: "Complementary Revenue Streams", chapter: "Plan Finansman", chapterColor: "green" },
  
  // Single Slide Chapters (Chapters 4-9)
  { component: PitchDeckChapter, title: "Business Strategy", chapter: "Pitch Deck", chapterColor: "purple" },
  { component: CommunicationStrategyChapter, title: "Marketing & Outreach", chapter: "Estrateji Kominikasyon", chapterColor: "indigo" },
  { component: OperationsPlanChapter, title: "Operations Framework", chapter: "Plan Operasyon", chapterColor: "teal" },
  { component: RisksChapter, title: "Risk Management", chapter: "Risk ak Solisyon", chapterColor: "orange" },
  { component: EvaluationChapter, title: "KPIs & Metrics", chapter: "Evalyasyon ak Suivi", chapterColor: "emerald" },
  { component: ConclusionChapter, title: "Next Steps", chapter: "Konklizyon", chapterColor: "blue" }
];

const getChapterColorClasses = (color: string) => {
  const colorMap = {
    blue: "from-blue-600 to-indigo-600",
    red: "from-red-600 to-pink-600", 
    green: "from-green-600 to-emerald-600",
    purple: "from-purple-600 to-violet-600",
    indigo: "from-indigo-600 to-blue-600",
    teal: "from-teal-600 to-cyan-600",
    orange: "from-orange-600 to-red-600",
    emerald: "from-emerald-600 to-green-600"
  };
  return colorMap[color as keyof typeof colorMap] || "from-blue-600 to-purple-600";
};

export default function GlobalTransferUnifiedSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const CurrentSlideComponent = allSlides[currentSlide].component;
  const currentSlideData = allSlides[currentSlide];
  
  const goToNextSlide = () => {
    if (currentSlide < allSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 mb-8">
          <div className="flex items-center justify-between px-8 py-6">
            {/* Left: Business Identity */}
            <div className="flex items-center space-x-6">
              <img 
                src="https://3b76ccfb-2ab0-403f-93bf-2c691d2456e0.lovableproject.com/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                alt="Global Transfer Logo" 
                className="w-12 h-12 rounded-xl shadow-lg"
              />
              <div className="flex items-center space-x-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Global Transfer</h1>
                  <p className="text-sm text-gray-600 font-medium">Fasil, Rapid e Sekirize</p>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{currentSlideData.title}</h2>
                  <p className="text-sm text-gray-600">{currentSlideData.chapter}</p>
                </div>
              </div>
            </div>
            
            {/* Right: Progress Indicator */}
            <div className={`text-center bg-gradient-to-r ${getChapterColorClasses(currentSlideData.chapterColor)} text-white px-6 py-2 rounded-lg`}>
              <span className="font-semibold">{currentSlide + 1} / {allSlides.length}</span>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-8 min-h-[600px] border border-white/30">
          <div className="h-full animate-fade-in">
            <CurrentSlideComponent />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white/90 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/30">
          <Button
            onClick={goToPreviousSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </Button>
          
          <div className="flex space-x-2 max-w-md overflow-x-auto">
            {allSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                  index === currentSlide 
                    ? `bg-gradient-to-r ${getChapterColorClasses(currentSlideData.chapterColor)} scale-125` 
                    : index < currentSlide 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={goToNextSlide}
            disabled={currentSlide === allSlides.length - 1}
            size="lg"
            className={`flex items-center space-x-2 bg-gradient-to-r ${getChapterColorClasses(currentSlideData.chapterColor)} hover:opacity-90 disabled:opacity-40`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
