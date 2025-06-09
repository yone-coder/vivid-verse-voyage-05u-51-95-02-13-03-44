
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/translations';

interface KreyolTranslationEditorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const KreyolTranslationEditor: React.FC<KreyolTranslationEditorProps> = ({ isOpen = true, onClose }) => {
  const [customTranslations, setCustomTranslations] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();

  // Load custom translations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('customKreyolTranslations');
    if (saved) {
      try {
        setCustomTranslations(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading custom translations:', error);
      }
    }
  }, []);

  // Get the current translation value (custom or default)
  const getCurrentTranslation = (section: string, key: string) => {
    return customTranslations[section]?.[key] || translations.ht[section]?.[key] || '';
  };

  // Update a translation
  const updateTranslation = (section: string, key: string, value: string) => {
    const updated = {
      ...customTranslations,
      [section]: {
        ...customTranslations[section],
        [key]: value
      }
    };
    setCustomTranslations(updated);
  };

  // Save all custom translations to localStorage
  const saveTranslations = () => {
    try {
      localStorage.setItem('customKreyolTranslations', JSON.stringify(customTranslations));
      toast({
        title: "Translations Saved",
        description: "Your Kreyol translations have been saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error Saving",
        description: "Failed to save translations. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Reset to default translations
  const resetTranslations = () => {
    setCustomTranslations({});
    localStorage.removeItem('customKreyolTranslations');
    toast({
      title: "Translations Reset",
      description: "All custom translations have been reset to defaults.",
    });
  };

  // Filter translations based on search term
  const filterTranslations = (section: any) => {
    if (!searchTerm) return section;
    
    const filtered: any = {};
    Object.keys(section).forEach(key => {
      const value = section[key];
      if (
        key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        value.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        filtered[key] = value;
      }
    });
    return filtered;
  };

  const sections = Object.keys(translations.ht);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Kreyòl Translation Editor</CardTitle>
              <CardDescription>
                Edit Haitian Creole translations. Changes are saved locally and will override the default translations.
              </CardDescription>
            </div>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
          
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search translations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={saveTranslations} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={resetTranslations}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="h-full flex flex-col">
            <TabsList className="grid grid-cols-6 w-full flex-shrink-0">
              {sections.slice(0, 6).map((section) => (
                <TabsTrigger key={section} value={section} className="capitalize">
                  {section}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {sections.slice(6).length > 0 && (
              <TabsList className="grid grid-cols-4 w-full flex-shrink-0 mt-2">
                {sections.slice(6).map((section) => (
                  <TabsTrigger key={section} value={section} className="capitalize">
                    {section}
                  </TabsTrigger>
                ))}
              </TabsList>
            )}

            {sections.map((section) => (
              <TabsContent key={section} value={section} className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-4 pr-4">
                    {Object.entries(filterTranslations(translations.ht[section])).map(([key, defaultValue]) => (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={`${section}-${key}`} className="text-sm font-medium">
                          {key}
                        </Label>
                        <div className="grid grid-cols-1 gap-2">
                          <div>
                            <Label className="text-xs text-gray-500">Default (Original):</Label>
                            <div className="p-2 bg-gray-50 rounded text-sm">{defaultValue}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">Your Translation:</Label>
                            <Textarea
                              id={`${section}-${key}`}
                              value={getCurrentTranslation(section, key)}
                              onChange={(e) => updateTranslation(section, key, e.target.value)}
                              placeholder="Enter your Kreyol translation..."
                              className="min-h-[60px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KreyolTranslationEditor;
