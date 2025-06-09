
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import chapter components
import ProjectOverviewChapter from './chapters/ProjectOverviewChapter';
import ProblemsChapter from './chapters/ProblemsChapter';
import RevenueModelChapter from './chapters/RevenueModelChapter';
import PitchDeckChapter from './chapters/PitchDeckChapter';
import CommunicationStrategyChapter from './chapters/CommunicationStrategyChapter';
import OperationsPlanChapter from './chapters/OperationsPlanChapter';
import RisksChapter from './chapters/RisksChapter';
import EvaluationChapter from './chapters/EvaluationChapter';
import ConclusionChapter from './chapters/ConclusionChapter';

const chapters = [
  {
    id: 1,
    title: "Kisa Pwojè a Ye?",
    subtitle: "Vision & Mission",
    component: ProjectOverviewChapter,
    color: "blue",
    gradient: "from-blue-600 via-blue-700 to-indigo-800"
  },
  {
    id: 2,
    title: "Ki Pwoblèm Nou Vle Rezoud?",
    subtitle: "Market Pain Points",
    component: ProblemsChapter,
    color: "red",
    gradient: "from-red-600 via-red-700 to-pink-800"
  },
  {
    id: 3,
    title: "Plan Finansman",
    subtitle: "Revenue Streams",
    component: RevenueModelChapter,
    color: "green",
    gradient: "from-green-600 via-green-700 to-emerald-800"
  },
  {
    id: 4,
    title: "Pitch Deck",
    subtitle: "Business Strategy",
    component: PitchDeckChapter,
    color: "purple",
    gradient: "from-purple-600 via-purple-700 to-violet-800"
  },
  {
    id: 5,
    title: "Estrateji Kominikasyon",
    subtitle: "Marketing & Outreach",
    component: CommunicationStrategyChapter,
    color: "indigo",
    gradient: "from-indigo-600 via-indigo-700 to-blue-800"
  },
  {
    id: 6,
    title: "Plan Operasyon",
    subtitle: "Operations Framework",
    component: OperationsPlanChapter,
    color: "teal",
    gradient: "from-teal-600 via-teal-700 to-cyan-800"
  },
  {
    id: 7,
    title: "Risk ak Solisyon",
    subtitle: "Risk Management",
    component: RisksChapter,
    color: "orange",
    gradient: "from-orange-600 via-orange-700 to-red-800"
  },
  {
    id: 8,
    title: "Evalyasyon ak Suivi",
    subtitle: "KPIs & Metrics",
    component: EvaluationChapter,
    color: "emerald",
    gradient: "from-emerald-600 via-emerald-700 to-green-800"
  },
  {
    id: 9,
    title: "Konklizyon",
    subtitle: "Next Steps",
    component: ConclusionChapter,
    color: "blue",
    gradient: "from-blue-600 via-purple-700 to-indigo-800"
  }
];

export default function GlobalTransferPitchChapters() {
  const [currentChapter, setCurrentChapter] = useState(0);
  
  const CurrentChapterComponent = chapters[currentChapter].component;
  
  const goToNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };
  
  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Clean Single-Line Header */}
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
                  <h2 className="text-xl font-bold text-gray-900">{chapters[currentChapter].title}</h2>
                  <p className="text-sm text-gray-600">{chapters[currentChapter].subtitle}</p>
                </div>
              </div>
            </div>
            
            {/* Right: Progress Indicator */}
            <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg">
              <span className="font-semibold">{currentChapter + 1} / {chapters.length}</span>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-8 min-h-[600px] border border-white/30">
          <div className="h-full animate-fade-in">
            <CurrentChapterComponent />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white/90 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/30">
          <Button
            onClick={goToPreviousChapter}
            disabled={currentChapter === 0}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </Button>
          
          <div className="flex space-x-2">
            {chapters.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentChapter(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentChapter 
                    ? 'bg-blue-600 scale-125' 
                    : index < currentChapter 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={goToNextChapter}
            disabled={currentChapter === chapters.length - 1}
            size="lg"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Chapter Grid */}
        <div className="mt-12 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/30">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Presentation Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter, index) => (
              <Button
                key={chapter.id}
                onClick={() => setCurrentChapter(index)}
                variant={index === currentChapter ? "default" : "outline"}
                className={`text-left justify-start p-4 h-auto transition-all duration-300 ${
                  index === currentChapter 
                    ? `bg-gradient-to-r ${chapter.gradient} text-white shadow-lg scale-105 border-0` 
                    : 'hover:scale-105 hover:shadow-md bg-white/80 hover:bg-white'
                }`}
              >
                <div className="flex flex-col w-full">
                  <span className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                    index === currentChapter ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    Chapter {index + 1}
                  </span>
                  <span className="font-semibold text-base mb-1">{chapter.title}</span>
                  <span className={`text-sm ${
                    index === currentChapter ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {chapter.subtitle}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
