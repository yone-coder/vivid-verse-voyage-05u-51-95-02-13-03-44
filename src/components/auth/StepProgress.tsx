import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  return (
    <div className="w-full mb-4 flex items-center">
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        
        return (
          <React.Fragment key={index}>
            {/* Step indicator */}
            <div 
              className={`h-0.5 w-4 ${isActive ? 'bg-[#ff4747]' : 'bg-gray-200'}`}
            />
            
            {/* Add connecting line between steps (except after the last step) */}
            {index < totalSteps - 1 && (
              <div 
                className={`h-0.5 flex-1 ${stepNumber < currentStep ? 'bg-[#ff4747]' : 'bg-gray-200'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepProgress;