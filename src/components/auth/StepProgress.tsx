
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle, CircleEllipsis } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="w-full mb-8 space-y-2">
      {/* Sleek progress bar */}
      <Progress 
        value={progressPercentage} 
        className="h-1.5 w-full bg-gray-100" 
        indicatorClassName="bg-[#ff4747]"
      />
      
      {/* Step indicators with animations */}
      <div className="flex items-center justify-between w-full relative">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;
          
          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Step indicator dot */}
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted 
                    ? 'bg-[#ff4747] text-white' 
                    : isActive 
                      ? 'border-2 border-[#ff4747] bg-white' 
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : isActive ? (
                  <CircleEllipsis className="h-5 w-5 text-[#ff4747]" />
                ) : (
                  <span className="text-sm">{stepNumber}</span>
                )}
              </div>
              
              {/* Step label */}
              <span 
                className={`
                  text-xs mt-1.5 font-medium transition-all duration-300
                  ${isActive ? 'text-[#ff4747]' : isCompleted ? 'text-gray-700' : 'text-gray-400'}
                `}
              >
                {stepNumber === 1 ? 'Login Method' : stepNumber === 2 ? 'Password' : 'Verify'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
