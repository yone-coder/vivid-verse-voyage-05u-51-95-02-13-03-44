
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function LimitedOffersBand() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours < 0 ? 0 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time digits to always show two digits
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="bg-pink-600 w-full py-1 px-2 text-white flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-1.5">
        <span className="font-bold text-xs">LIMITED OFFERS</span>
        <span className="bg-yellow-400 text-pink-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">HOT</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Clock size={14} className="text-pink-100" />
        <span className="text-xs font-medium">Ends in:</span>
        <div className="flex items-center">
          <div className="bg-pink-800/50 px-1.5 py-0.5 rounded text-center min-w-[22px]">
            <span className="text-xs font-mono font-semibold">{formatTime(timeLeft.hours)}</span>
          </div>
          <span className="text-xs mx-0.5 font-bold">:</span>
          <div className="bg-pink-800/50 px-1.5 py-0.5 rounded text-center min-w-[22px]">
            <span className="text-xs font-mono font-semibold">{formatTime(timeLeft.minutes)}</span>
          </div>
          <span className="text-xs mx-0.5 font-bold">:</span>
          <div className="bg-pink-800/50 px-1.5 py-0.5 rounded text-center min-w-[22px]">
            <span className="text-xs font-mono font-semibold">{formatTime(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
