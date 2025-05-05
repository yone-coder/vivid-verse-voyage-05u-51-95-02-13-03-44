
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  return (
    <div className="flex items-center justify-between mb-6 w-full max-w-xs mx-auto">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep > index + 1 
                ? 'bg-[#ff4747] text-white' 
                : currentStep === index + 1 
                  ? 'bg-[#ff4747] text-white'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {currentStep > index + 1 ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < totalSteps - 1 && (
            <div 
              className={`h-1 w-10 ${
                currentStep > index + 1 ? 'bg-[#ff4747]' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
