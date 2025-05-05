
import { Zap } from 'lucide-react';

interface FeatureOptionsProps {
  theme: string;
  showFeaturePanel: boolean;
}

export function FeatureOptions({ theme, showFeaturePanel }: FeatureOptionsProps) {
  if (!showFeaturePanel) return null;
  
  return (
    <div className={`absolute right-4 top-16 z-10 p-4 rounded-lg shadow-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} w-64`}>
      <h3 className="font-medium mb-2 flex items-center">
        <Zap className="w-4 h-4 mr-2" />
        Features
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Save login info</span>
          <div className="relative inline-block w-10 align-middle select-none">
            <input type="checkbox" className="absolute opacity-0 w-0 h-0" />
            <div className={`block w-10 h-6 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Biometric login</span>
          <div className="relative inline-block w-10 align-middle select-none">
            <input type="checkbox" className="absolute opacity-0 w-0 h-0" />
            <div className={`block w-10 h-6 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">2FA</span>
          <div className="relative inline-block w-10 align-middle select-none">
            <input type="checkbox" checked readOnly className="absolute opacity-0 w-0 h-0" />
            <div className={`block w-10 h-6 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-blue-700' : 'bg-orange-500'}`}></div>
            <div className="absolute left-5 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
