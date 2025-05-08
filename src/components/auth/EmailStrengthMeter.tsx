
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, X } from 'lucide-react';

interface EmailStrengthProps {
  score: number;
  messages: {text: string, positive: boolean}[];
}

const EmailStrengthMeter = ({ score, messages }: EmailStrengthProps) => {
  // Helper functions for styling based on score
  const getStrengthColor = (score: number) => {
    if (score < 0) return 'bg-red-500';
    if (score < 3) return 'bg-orange-400';
    if (score < 5) return 'bg-yellow-400';
    if (score < 7) return 'bg-green-400';
    return 'bg-emerald-500';
  };

  const getStrengthWidth = (score: number) => {
    const baseScore = Math.max(0, Math.min(score, 10));
    return `${(baseScore / 10) * 100}%`;
  };

  const getStrengthLabel = (score: number) => {
    if (score < 0) return 'Poor';
    if (score < 3) return 'Weak';
    if (score < 5) return 'Fair';
    if (score < 7) return 'Good';
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
          <Shield className={`h-3.5 w-3.5 ${score < 3 ? 'text-orange-400' : score < 7 ? 'text-yellow-500' : 'text-green-500'}`} />
          <span className="font-medium">Email security: {getStrengthLabel(score)}</span>
        </div>
        <span className="text-muted-foreground">{Math.max(0, Math.min(score, 10))}/10</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${getStrengthColor(score)} transition-all duration-500 ease-out`}
          style={{ width: getStrengthWidth(score) }}
        ></div>
      </div>
      
      {/* Email Strength Feedback Messages */}
      <div className="space-y-1">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-1.5 text-xs">
            {msg.positive ? (
              <Check className="h-3 w-3 text-green-500 mt-0.5" />
            ) : (
              <X className="h-3 w-3 text-destructive mt-0.5" />
            )}
            <span className={msg.positive ? 'text-green-600 dark:text-green-400' : 'text-destructive'}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmailStrengthMeter;
