
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, User, Receipt, CreditCard, DollarSign, Settings, FileText } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const stepTitles = ['Send Money', 'Transfer Details', 'Recipient Details', 'Review', 'Payment Method', 'Transfer Complete'];

  const stepVariants = {
    inactive: {
      scale: 1,
      backgroundColor: '#E5E7EB',
      color: '#6B7280'
    },
    active: {
      scale: 1.05,
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    completed: {
      scale: 1,
      backgroundColor: '#10B981',
      color: '#FFFFFF',
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const lineVariants = {
    inactive: {
      backgroundColor: '#E5E7EB',
      scaleX: 1
    },
    active: {
      backgroundColor: '#10B981',
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-white px-4 pt-3 pb-3">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5, 6].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <motion.div
                className={`rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 shadow-sm ${
                  step === currentStep
                    ? 'w-auto h-7 px-2 bg-red-600 text-white'
                    : 'w-7 h-7 bg-gray-200 text-gray-600'
                }`}
                variants={stepVariants}
                initial="inactive"
                animate={
                  step === currentStep ? 'active' :
                    step < currentStep ? 'completed' :
                      'inactive'
                }
                whileTap={{ scale: 0.95 }}
              >
                {step < currentStep ? (
                  <CheckCircle className="h-3 w-3" />
                ) : step === currentStep ? (
                  <div className="flex items-center space-x-1">
                    {step === 1 ? (
                      <DollarSign className="h-3 w-3" />
                    ) : step === 2 ? (
                      <Settings className="h-3 w-3" />
                    ) : step === 3 ? (
                      <User className="h-3 w-3" />
                    ) : step === 4 ? (
                      <FileText className="h-3 w-3" />
                    ) : step === 5 ? (
                      <CreditCard className="h-3 w-3" />
                    ) : (
                      <Receipt className="h-3 w-3" />
                    )}
                    <span className="font-medium whitespace-nowrap text-xs">
                      {stepTitles[index].split(' ')[0]}
                    </span>
                  </div>
                ) : (
                  step
                )}
              </motion.div>
            </div>
            {index < 5 && (
              <motion.div
                className="flex-1 h-0.5 mx-2 rounded-full origin-left"
                variants={lineVariants}
                initial="inactive"
                animate={step < currentStep ? 'active' : 'inactive'}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
