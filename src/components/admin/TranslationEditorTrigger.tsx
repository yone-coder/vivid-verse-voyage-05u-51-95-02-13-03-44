
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import KreyolTranslationEditor from './KreyolTranslationEditor';

const TranslationEditorTrigger: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsEditorOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-40 bg-white shadow-lg"
      >
        <Languages className="h-4 w-4 mr-2" />
        Edit Kreyòl
      </Button>
      
      <KreyolTranslationEditor 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  );
};

export default TranslationEditorTrigger;
