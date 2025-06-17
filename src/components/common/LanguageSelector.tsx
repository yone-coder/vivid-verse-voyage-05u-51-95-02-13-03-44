
import React from 'react';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, supportedLanguages } from '@/context/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'default' }) => {
  const { currentLanguage, setLanguage } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    const selectedLanguage = supportedLanguages.find(lang => lang.code === languageCode);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  const getFlagEmoji = (flagCode: string) => {
    const flagMap: Record<string, string> = {
      'ht': '🇭🇹',
      'us': '🇺🇸', 
      'es': '🇪🇸',
      'fr': '🇫🇷',
    };
    return flagMap[flagCode] || '🌐';
  };

  if (variant === 'compact') {
    return (
      <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-16 h-8 px-2 border-0 bg-transparent hover:bg-gray-100">
          <div className="flex items-center space-x-1">
            <span className="text-sm">{getFlagEmoji(currentLanguage.flag)}</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center space-x-2">
                <span>{getFlagEmoji(language.flag)}</span>
                <span className="text-sm">{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-40 h-9">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{getFlagEmoji(currentLanguage.flag)}</span>
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {supportedLanguages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center space-x-2">
              <span>{getFlagEmoji(language.flag)}</span>
              <span className="text-sm">{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
