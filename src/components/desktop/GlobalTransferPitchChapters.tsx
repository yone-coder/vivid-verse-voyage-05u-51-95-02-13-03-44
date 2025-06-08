
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, Play, Pause, RotateCcw } from 'lucide-react';

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
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Ki Pwoblèm Nou Vle Rezoud?",
    subtitle: "Market Pain Points",
    component: ProblemsChapter,
    color: "red",
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: 3,
    title: "Plan Finansman",
    subtitle: "Revenue Streams",
    component: RevenueModelChapter,
    color: "green",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: 4,
    title: "Pitch Deck",
    subtitle: "Business Strategy",
    component: PitchDeckChapter,
    color: "purple",
    gradient: "from-purple-500 to-violet-600"
  },
  {
    id: 5,
    title: "Estrateji Kominikasyon",
    subtitle: "Marketing & Outreach",
    component: CommunicationStrategyChapter,
    color: "indigo",
    gradient: "from-indigo-500 to-blue-600"
  },
  {
    id: 6,
    title: "Plan Operasyon",
    subtitle: "Operations Framework",
    component: OperationsPlanChapter,
    color: "teal",
    gradient: "from-teal-500 to-cyan-600"
  },
  {
    id: 7,
    title: "Risk ak Solisyon",
    subtitle: "Risk Management",
    component: RisksChapter,
    color: "orange",
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 8,
    title: "Evalyasyon ak Suivi",
    subtitle: "KPIs & Metrics",
    component: EvaluationChapter,
    color: "emerald",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    id: 9,
    title: "Konklizyon",
    subtitle: "Next Steps",
    component: ConclusionChapter,
    color: "blue",
    gradient: "from-blue-500 to-purple-600"
  }
];

export default function GlobalTransferPitchChapters() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  
  const CurrentChapterComponent = chapters[currentChapter].component;
  
  const goToNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else if (isAutoPlay) {
      setCurrentChapter(0); // Loop back to start in autoplay
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
    }, 10000); // 10 seconds per slide
    
    return () => clearTimeout(timer);
  }, [currentChapter, isAutoPlay]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      presentationMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Enhanced Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <img 
                  src="https://3b76ccfb-2ab0-403f-93bf-2c691d2456e0.lovableproject.com/lovable-uploads/45eddf56-11aa-4191-b09a-dc6ebfe3e7cc.png" 
                  alt="Global Transfer Logo" 
                  className="w-16 h-16 mr-6 rounded-2xl shadow-lg ring-4 ring-blue-500/20"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 blur"></div>
              </div>
              <BookOpen className="w-10 h-10 text-blue-600 mr-4 animate-pulse" />
              <div className="text-left">
                <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Global Transfer
                </h1>
                <p className="text-xl font-semibold text-gray-600 mt-2">Transfè Fasil, Rapid e Sekirize</p>
              </div>
            </div>
            
            {/* Presentation Controls */}
            <div className="flex justify-center space-x-4 mb-4">
              <Button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                variant={isAutoPlay ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-2"
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isAutoPlay ? 'Pause' : 'Auto Play'}</span>
              </Button>
              <Button
                onClick={resetPresentation}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
              <Button
                onClick={() => setPresentationMode(!presentationMode)}
                variant={presentationMode ? "default" : "outline"}
                size="sm"
              >
                {presentationMode ? 'Exit Presentation' : 'Presentation Mode'}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Section */}
        <div className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                Chapit {currentChapter + 1} nan {chapters.length}
              </span>
              {isAutoPlay && (
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  Auto Playing
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              {chapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentChapter 
                      ? 'bg-blue-600 scale-125 shadow-lg' 
                      : index < currentChapter 
                        ? 'bg-green-500 hover:scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Enhanced Chapter Title */}
        <div className="text-center mb-8">
          <div className={`inline-block bg-gradient-to-r ${chapters[currentChapter].gradient} p-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105`}>
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Chapit {currentChapter + 1}: {chapters[currentChapter].title}
            </h2>
            <p className="text-xl text-white/90 font-medium">
              {chapters[currentChapter].subtitle}
            </p>
          </div>
        </div>

        {/* Enhanced Chapter Content */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 mb-8 min-h-[700px] border border-white/30 transform transition-all duration-500">
          <div className="animate-fade-in">
            <CurrentChapterComponent />
          </div>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
          <Button
            onClick={goToPreviousChapter}
            disabled={currentChapter === 0}
            variant="outline"
            size="lg"
            className="flex items-center space-x-3 px-8 py-4 bg-white/50 hover:bg-white/80 disabled:opacity-50 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="font-semibold">Chapit Anvan an</span>
          </Button>
          
          <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg">
            <span className="font-bold text-lg">
              {currentChapter + 1} / {chapters.length}
            </span>
          </div>

          <Button
            onClick={goToNextChapter}
            disabled={currentChapter === chapters.length - 1 && !isAutoPlay}
            size="lg"
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <span className="font-semibold">Chapit Apre a</span>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Enhanced Chapter Grid */}
        <div className="mt-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Navigasyon Rapid</h3>
          <div className="grid grid-cols-3 gap-4">
            {chapters.map((chapter, index) => (
              <Button
                key={chapter.id}
                onClick={() => setCurrentChapter(index)}
                variant={index === currentChapter ? "default" : "outline"}
                size="lg"
                className={`text-left justify-start p-4 h-auto transition-all duration-300 ${
                  index === currentChapter 
                    ? `bg-gradient-to-r ${chapter.gradient} text-white shadow-lg scale-105` 
                    : 'hover:scale-105 hover:shadow-md bg-white/50'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-bold text-lg mb-1">{index + 1}. {chapter.title}</span>
                  <span className="text-sm opacity-80">{chapter.subtitle}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
