
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

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
    component: ProjectOverviewChapter,
    color: "blue"
  },
  {
    id: 2,
    title: "Ki Pwoblèm Nou Vle Rezoud?",
    component: ProblemsChapter,
    color: "red"
  },
  {
    id: 3,
    title: "Plan Finansman",
    component: RevenueModelChapter,
    color: "green"
  },
  {
    id: 4,
    title: "Pitch Deck",
    component: PitchDeckChapter,
    color: "purple"
  },
  {
    id: 5,
    title: "Estrateji Kominikasyon",
    component: CommunicationStrategyChapter,
    color: "indigo"
  },
  {
    id: 6,
    title: "Plan Operasyon",
    component: OperationsPlanChapter,
    color: "teal"
  },
  {
    id: 7,
    title: "Risk ak Solisyon",
    component: RisksChapter,
    color: "red"
  },
  {
    id: 8,
    title: "Evalyasyon ak Suivi",
    component: EvaluationChapter,
    color: "green"
  },
  {
    id: 9,
    title: "Konklizyon",
    component: ConclusionChapter,
    color: "blue"
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
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-5xl font-bold text-blue-600">Global Transfer</h1>
          </div>
          <p className="text-2xl font-semibold text-gray-700">Transfè Fasil, Rapid e Sekirize</p>
        </div>

        {/* Chapter Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">
              Chapit {currentChapter + 1} nan {chapters.length}
            </span>
            <div className="flex space-x-2">
              {chapters.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentChapter ? 'bg-blue-600' : 
                    index < currentChapter ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Chapter Title */}
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold text-${chapters[currentChapter].color}-600 mb-2`}>
            Chapit {currentChapter + 1}: {chapters[currentChapter].title}
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 min-h-[600px]">
          <CurrentChapterComponent />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={goToPreviousChapter}
            disabled={currentChapter === 0}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Chapit Anvan an</span>
          </Button>
          
          <div className="text-center">
            <span className="text-gray-600">
              {currentChapter + 1} / {chapters.length}
            </span>
          </div>

          <Button
            onClick={goToNextChapter}
            disabled={currentChapter === chapters.length - 1}
            size="lg"
            className="flex items-center space-x-2"
          >
            <span>Chapit Apre a</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Chapter List (Quick Navigation) */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Navigasyon Rapid</h3>
          <div className="grid grid-cols-3 gap-3">
            {chapters.map((chapter, index) => (
              <Button
                key={chapter.id}
                onClick={() => setCurrentChapter(index)}
                variant={index === currentChapter ? "default" : "outline"}
                size="sm"
                className="text-left justify-start"
              >
                <span className="mr-2">{index + 1}.</span>
                <span className="truncate">{chapter.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
