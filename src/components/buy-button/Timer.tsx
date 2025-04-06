
import React from 'react';
import { formatTime, formatMilliseconds } from './animations';

interface TimerProps {
  timeLeft: { minutes: number, seconds: number, milliseconds: number };
  highlightStock: boolean;
}

const Timer = ({ timeLeft, highlightStock }: TimerProps) => {
  return (
    <div className={`countdown-container ${timeLeft.minutes === 0 && timeLeft.seconds < 30 ? 'animate-pulse' : ''}`}>
      <div className="countdown-unit">
        <div className="countdown-value">{formatTime(timeLeft.minutes)}</div>
        <div className="countdown-label">min</div>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-unit">
        <div className="countdown-value">{formatTime(timeLeft.seconds)}</div>
        <div className="countdown-label">sec</div>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-unit">
        <div className="countdown-value milliseconds">{formatMilliseconds(timeLeft.milliseconds)}</div>
        <div className="countdown-label">mil</div>
      </div>
    </div>
  );
};

export default Timer;
