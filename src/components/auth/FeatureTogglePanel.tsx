
import { Coffee, Sliders } from 'lucide-react';

interface FeatureTogglePanelProps {
  theme: string;
  toggleTheme: () => void;
  showFeaturePanel: boolean;
  setShowFeaturePanel: (show: boolean) => void;
}

export function FeatureTogglePanel({ theme, toggleTheme, showFeaturePanel, setShowFeaturePanel }: FeatureTogglePanelProps) {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-3">
      <button 
        onClick={toggleTheme} 
        className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-gray-600'}`}
      >
        <Coffee className="h-5 w-5" />
      </button>
      <button 
        onClick={() => setShowFeaturePanel(!showFeaturePanel)}
        className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-gray-600'}`}
      >
        <Sliders className="h-5 w-5" />
      </button>
    </div>
  );
}
