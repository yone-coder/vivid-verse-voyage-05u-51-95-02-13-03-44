
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const totalSteps = 6;
  const progressValue = (currentStep / totalSteps) * 100;
  
  const stepTitles = [
    'Send Money', 
    'Transfer Details', 
    'Recipient Details', 
    'Review', 
    'Payment Method', 
    'Transfer Complete'
  ];

  return (
    <div className="bg-white px-4 pt-4 pb-3">
      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={progressValue} 
            className="h-2" 
            indicatorClassName="bg-red-600 transition-all duration-500 ease-in-out"
          />
          
          {/* Current Step Info */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="font-medium text-red-600">
              {stepTitles[currentStep - 1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
