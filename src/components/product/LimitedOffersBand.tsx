
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
    <div className="bg-red-600 w-full py-1 px-2 text-white flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-1">
        <span className="font-bold text-xs">LIMITED OFFERS</span>
        <span className="bg-yellow-400 text-red-600 text-xs px-1 py-0.5 rounded-full font-bold animate-pulse">HOT</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <Clock size={14} />
        <span className="text-xs font-medium">Ends:</span>
        <div className="flex items-center space-x-1">
          <div className="bg-black bg-opacity-30 px-1 py-0.5 rounded">
            <span className="text-xs">{formatTime(timeLeft.hours)}</span>
          </div>
          <span className="text-xs">:</span>
          <div className="bg-black bg-opacity-30 px-1 py-0.5 rounded">
            <span className="text-xs">{formatTime(timeLeft.minutes)}</span>
          </div>
          <span className="text-xs">:</span>
          <div className="bg-black bg-opacity-30 px-1 py-0.5 rounded">
            <span className="text-xs">{formatTime(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
