
import React from "react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-300 text-lg">—</span>}
          <div
            className={`h-1 w-4 rounded-full ${
              index + 1 <= currentStep ? "bg-gray-800" : "bg-gray-200"
            }`}
          ></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepProgress;
