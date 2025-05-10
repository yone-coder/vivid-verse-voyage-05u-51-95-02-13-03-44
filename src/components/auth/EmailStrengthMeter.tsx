
import React from 'react';
import { motion } from 'framer-motion';

interface EmailStrengthProps {
  strength: number;
  messages?: {text: string, positive: boolean}[];
}

const EmailStrengthMeter = ({ strength }: EmailStrengthProps) => {
  // Helper functions for styling based on score
  const getStrengthColor = (strength: number) => {
    if (strength < 0) return 'bg-red-500';
    if (strength < 3) return 'bg-orange-400';
    if (strength < 5) return 'bg-yellow-400';
    if (strength < 7) return 'bg-green-400';
    return 'bg-emerald-500';
  };

  const getStrengthWidth = (strength: number) => {
    const baseScore = Math.max(0, Math.min(strength, 10));
    return `${(baseScore / 10) * 100}%`;
  };

  const getStrengthLabel = (strength: number) => {
    if (strength < 0) return 'Poor';
    if (strength < 3) return 'Weak';
    if (strength < 5) return 'Fair';
    if (strength < 7) return 'Good';
    return 'Excellent';
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-1.5 space-y-1.5 overflow-hidden"
    >
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1">
          <span className="font-medium">Email security: {getStrengthLabel(strength)}</span>
        </div>
        <span className="text-muted-foreground">{Math.max(0, Math.min(strength, 10))}/10</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${getStrengthColor(strength)} transition-all duration-500 ease-out`}
          style={{ width: getStrengthWidth(strength) }}
        ></div>
      </div>
    </motion.div>
  );
};

export default EmailStrengthMeter;
