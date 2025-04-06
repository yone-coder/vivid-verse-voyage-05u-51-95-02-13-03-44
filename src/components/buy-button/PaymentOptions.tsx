
import React from 'react';
import { RefreshCw, Gift } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentOptionsProps {
  rotateIcons: boolean;
  setSparkleEffect: React.Dispatch<React.SetStateAction<boolean>>;
  rainbowBorder: boolean;
  colorCycle: boolean;
  hueRotate: number;
}

const PaymentOptions = ({
  rotateIcons,
  setSparkleEffect,
  rainbowBorder,
  colorCycle,
  hueRotate
}: PaymentOptionsProps) => {
  return (
    <div className={`bg-gray-50 py-0.5 px-4 flex items-center justify-between border-t border-gray-200 ${rainbowBorder ? 'animate-pulse bg-gray-100' : ''}`}
         style={colorCycle ? { filter: `hue-rotate(${hueRotate}deg)`, transition: 'filter 1s ease-in-out' } : {}}>
      <div className="flex items-center space-x-1">
        <div className="flex space-x-1">
          <div className={`w-6 h-4 bg-white rounded flex items-center justify-center ${rotateIcons ? 'animate-pulse' : ''}`} style={{ border: "1px solid #ddd" }}>
            <img 
              src="/lovable-uploads/f3efe2eb-c3db-48bd-abc7-c65456fdc028.png" 
              alt="Visa" 
              className="h-3 w-5 object-contain"
            />
          </div>
          <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="10" className={rotateIcons ? 'animate-spin' : ''}>
              <circle fill="#EA001B" cx="8" cy="12" r="5"/>
              <circle fill="#F79E1B" cx="16" cy="12" r="5"/>
              <path fill="#FF5F00" d="M12 7.5v9a5 5 0 0 0 0-9z"/>
            </svg>
          </div>
          <div className={`w-6 h-4 bg-white rounded flex items-center justify-center ${rotateIcons ? 'animate-pulse' : ''}`} style={{ border: "1px solid #ddd" }}>
            <img 
              src="/lovable-uploads/dd1cad7b-c3b6-43a6-9bc6-deb38a120604.png" 
              alt="Venmo" 
              className="h-3 w-5 object-contain"
            />
          </div>
          <div className="w-6 h-4 bg-white rounded flex items-center justify-center" style={{ border: "1px solid #ddd" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="10" className={rotateIcons ? 'animate-spin' : ''}>
              <path fill="#253B80" d="M7 7h2c1.4 0 1.9 1 1.9 1.5 0 1.8-2 1.8-2.5 1.8H7.3L7 7z"/>
              <path fill="#179BD7" d="M19 7.8C18.7 5.8 16.9 5 14.7 5H9.2c-.3 0-.5.2-.6.5l-1.7 11c0 .2.1.4.4.4h2.9l.7-4.7v.3c.1-.3.3-.5.6-.5h1.3c2.5 0 4.4-1 5-3.9V8c-.1-.2-.1-.2-.1-.2H19z"/>
              <path fill="#253B80" d="M8.3 11.5l-.3 2.1-.2 1h-3c-.2 0-.4-.2-.3-.4L6.1 5.9c.1-.3.3-.5.6-.5h5.5c1.5 0 2.6.3 3.2 1 .3.3.5.7.6 1.1.1.3.1.7.1 1.1-1-.6-2-.8-3.3-.8L8.3 11.5z"/>
            </svg>
          </div>
        </div>
        <span className="text-[10px] text-gray-500">Secure payment</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div 
          className="text-[10px] text-gray-500 flex items-center group transition-all duration-300 cursor-pointer"
          onClick={() => {
            toast.info("Free 30-day returns on all orders!", { 
              description: "No questions asked return policy" 
            });
            setSparkleEffect(true);
            setTimeout(() => setSparkleEffect(false), 1000);
          }}
        >
          <RefreshCw size={8} className={`mr-1 ${rotateIcons ? 'animate-spin' : 'group-hover:animate-spin'}`} />
          <span>30-day returns</span>
        </div>
        
        <div 
          className="text-[10px] text-gray-500 flex items-center group transition-all duration-300 cursor-pointer"
          onClick={() => {
            toast.info("Gift wrapping available", { 
              description: "Add a personal touch to your gift" 
            });
            setSparkleEffect(true);
            setTimeout(() => setSparkleEffect(false), 1000);
          }}
        >
          <Gift size={8} className={`mr-1 ${rotateIcons ? 'animate-pulse' : 'group-hover:animate-pulse'}`} />
          <span>Gift options</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
