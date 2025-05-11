
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TranslationLoadingIndicator: React.FC = () => {
  const { isTranslating } = useLanguage();
  
  if (!isTranslating) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md flex items-center gap-2 z-50">
      <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></div>
      <span>Translating...</span>
    </div>
  );
};

export default TranslationLoadingIndicator;
