
import React from 'react';
import { Award } from 'lucide-react';

interface ToastNotificationProps {
  show: boolean;
  message: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ show, message }) => {
  if (!show) return null;
  
  return (
    <div className="absolute top-0 left-0 right-0 transform -translate-y-full p-0.5">
      <div className="bg-orange-500 text-white p-0.5 rounded shadow-md text-center text-sm flex items-center justify-center">
        <Award size={16} className="mr-1" />
        {message}
      </div>
    </div>
  );
};

export default ToastNotification;
