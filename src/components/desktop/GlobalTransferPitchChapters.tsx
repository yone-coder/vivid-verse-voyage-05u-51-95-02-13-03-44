
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

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
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const CurrentChapterComponent = chapters[currentChapter].component;
  
  const goToNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else if (isAutoPlay) {
      setCurrentChapter(0);
    }
  };
  
  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const resetPresentation = () => {
    setCurrentChapter(0);
    setIsAutoPlay(false);
  };

  // Auto-advance chapters when autoplay is enabled
  React.useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setTimeout(() => {
      goToNextChapter();
    }, 15000); // 15 seconds per slide for professional pacing
    
    return () => clearTimeout(timer);
  }, [currentChapter, isAutoPlay]);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      <div className={`${isFullscreen ? 'w-full h-full flex flex-col' : 'max-w-7xl mx-auto'} px-6 py-8`}>
        {/* Clean Professional Header */}
        <div className="relative mb-12">
          <div className={`${isFullscreen ? 'bg-white/10' : 'bg-white/95'} backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30`}>
            {/* Top Row: Business Identity */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <img 
                  src="https://3b76ccfb-2ab0-403f-93bf-2c691d2456e0.lovableproject.com/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                  alt="Global Transfer Logo" 
                  className="w-12 h-12 rounded-xl shadow-lg"
                />
                <div>
                  <h1 className={`text-3xl font-bold ${isFullscreen ? 'text-white' : 'text-gray-900'}`}>
                    Global Transfer
                  </h1>
                  <p className={`text-lg ${isFullscreen ? 'text-white/90' : 'text-gray-600'} font-medium`}>
                    Fasil, Rapid e Sekirize
                  </p>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  variant={isAutoPlay ? "default" : "outline"}
                  size="sm"
                  className={`${isFullscreen ? 'bg-white/20 border-white/30 text-white hover:bg-white/30' : ''}`}
                >
                  {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={resetPresentation}
                  variant="outline"
                  size="sm"
                  className={`${isFullscreen ? 'bg-white/20 border-white/30 text-white hover:bg-white/30' : ''}`}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  variant="outline"
                  size="sm"
                  className={`${isFullscreen ? 'bg-white/20 border-white/30 text-white hover:bg-white/30' : ''}`}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            {/* Current Chapter */}
            <div className="text-center mb-6">
              <div className={`text-sm font-semibold ${isFullscreen ? 'text-white/80' : 'text-gray-500'} mb-2`}>
                Chapter {currentChapter + 1} of {chapters.length}
              </div>
              <h2 className={`text-2xl font-bold ${isFullscreen ? 'text-white' : 'text-gray-900'}`}>
                {chapters[currentChapter].title}
              </h2>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-center space-x-2">
                {chapters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentChapter(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentChapter 
                        ? 'bg-blue-600 scale-125' 
                        : index < currentChapter 
                          ? 'bg-green-500' 
                          : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Content */}
        <div className={`${isFullscreen ? 'flex-1' : ''} ${isFullscreen ? 'bg-white/10' : 'bg-white/98'} backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-8 ${isFullscreen ? 'min-h-0' : 'min-h-[600px]'} border border-white/30`}>
          <div className="h-full animate-fade-in">
            <CurrentChapterComponent />
          </div>
        </div>

        {/* Navigation */}
        <div className={`flex justify-between items-center ${isFullscreen ? 'bg-white/10' : 'bg-white/90'} backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/30`}>
          <Button
            onClick={goToPreviousChapter}
            disabled={currentChapter === 0}
            variant="outline"
            size="lg"
            className={`flex items-center space-x-2 ${isFullscreen ? 'bg-white/20 border-white/30 text-white hover:bg-white/30' : ''} disabled:opacity-40`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </Button>
          
          <div className={`text-center ${isFullscreen ? 'bg-white/20' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white px-6 py-2 rounded-lg`}>
            <span className="font-semibold">
              {currentChapter + 1} / {chapters.length}
            </span>
          </div>

          <Button
            onClick={goToNextChapter}
            disabled={currentChapter === chapters.length - 1 && !isAutoPlay}
            size="lg"
            className={`flex items-center space-x-2 ${isFullscreen ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'} disabled:opacity-40`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Chapter Grid - Only show when not in fullscreen */}
        {!isFullscreen && (
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
        )}
      </div>
    </div>
  );
}
