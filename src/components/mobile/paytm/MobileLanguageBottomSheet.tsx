
import React from 'react';
import { Check, X } from 'lucide-react';
import { useLanguage, supportedLanguages } from '@/context/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileLanguageBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function MobileLanguageBottomSheet({ 
  isOpen, 
  onOpenChange, 
  children 
}: MobileLanguageBottomSheetProps) {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageSelect = (language: any) => {
    setLanguage(language);
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[60vh] rounded-t-2xl border-0 p-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-gray-200 relative">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <SheetTitle className="text-lg font-semibold text-center">
              {t('header.selectLanguage')}
            </SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </SheetHeader>

          {/* Language List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {supportedLanguages.map((language) => (
                <button
                  key={language.code}
                  className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  onClick={() => handleLanguageSelect(language)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://flagcdn.com/${language.flag.toLowerCase()}.svg`}
                      alt={language.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{language.nativeName}</p>
                      <p className="text-sm text-gray-500">{language.name}</p>
                    </div>
                  </div>
                  {currentLanguage.code === language.code && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
