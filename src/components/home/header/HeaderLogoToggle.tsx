
import { ChevronDown } from 'lucide-react';
import Logo from '../Logo';

interface HeaderLogoToggleProps {
  progress: number;
  togglePanel: () => void;
  isOpen: boolean;
  activeTab: string;
}

const HeaderLogoToggle = ({ 
  progress, 
  togglePanel, 
  isOpen, 
  activeTab 
}: HeaderLogoToggleProps) => {
  return (
    <div
      className="flex items-center space-x-1 cursor-pointer"
      onClick={togglePanel}
    >
      {progress < 0.5 ? (
        <>
          <span className="text-white text-sm">{activeTab}</span>
          <ChevronDown
            className={`w-4 h-4 text-white transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </>
      ) : (
        <Logo />
      )}
    </div>
  );
};

export default HeaderLogoToggle;
