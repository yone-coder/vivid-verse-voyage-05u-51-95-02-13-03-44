
import React, { useState } from 'react';
import { ChevronRight, Globe, Check } from 'lucide-react';
import { useLanguage, supportedLanguages, supportedLocations } from '@/context/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const HeaderLanguage = () => {
  const { currentLanguage, setLanguage, currentLocation, setLocation } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    setIsOpen(false);
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <button 
        onClick={togglePanel} 
        className="flex items-center bg-black bg-opacity-40 px-2 py-1 rounded-full space-x-1 hover:bg-opacity-50 transition-colors"
      >
        {currentLocation.flag ? (
          <img
            src={`https://flagcdn.com/${currentLocation.flag.toLowerCase()}.svg`}
            alt={currentLocation.name}
            className="h-4 w-4 rounded-full object-cover"
          />
        ) : (
          <Globe className="h-3.5 w-3.5 text-white" />
        )}
        <span className="text-white text-xs font-medium">{currentLanguage.code.toUpperCase()}</span>
        <ChevronRight className="h-3.5 w-3.5 text-white" />
      </button>

      {/* Language Selection Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
          <Tabs defaultValue="language" className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-10">
              <TabsTrigger value="language">Language</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            
            <TabsContent value="language" className="max-h-80 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs text-gray-500 mb-2 px-2">Select your language</div>
                <div className="space-y-1">
                  {supportedLanguages.map((language) => (
                    <button
                      key={language.code}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
                      onClick={() => handleLanguageSelect(language)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/${language.flag.toLowerCase()}.svg`}
                          alt={language.name}
                          className="h-4 w-4 rounded-full object-cover"
                        />
                        <span>{language.nativeName}</span>
                      </div>
                      {currentLanguage.code === language.code && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="max-h-80 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs text-gray-500 mb-2 px-2">Select your location</div>
                <div className="space-y-1">
                  {supportedLocations.map((location) => (
                    <button
                      key={location.code}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/${location.flag.toLowerCase()}.svg`}
                          alt={location.name}
                          className="h-4 w-4 rounded-full object-cover"
                        />
                        <span>{location.name}</span>
                      </div>
                      {currentLocation.code === location.code && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default HeaderLanguage;
