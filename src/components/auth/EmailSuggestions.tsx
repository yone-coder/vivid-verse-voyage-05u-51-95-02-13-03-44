
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface EmailSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  premiumDomains?: { name: string; domain: string; url: string }[];
}

const EmailSuggestions = ({ 
  suggestions, 
  onSelect
}: EmailSuggestionsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  
  // Use the imported premium domains from EmailUtils
  const premiumDomains = [
    { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com' },
    { name: 'Yahoo', domain: 'yahoo.com', url: 'https://yahoo.com' },
    { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com' },
    { name: 'iCloud', domain: 'icloud.com', url: 'https://icloud.com' },
    { name: 'ProtonMail', domain: 'protonmail.com', url: 'https://protonmail.com' },
    { name: 'AOL', domain: 'aol.com', url: 'https://aol.com' },
    { name: 'Zoho', domain: 'zoho.com', url: 'https://zoho.com' },
    { name: 'Tutanota', domain: 'tutanota.com', url: 'https://tutanota.com' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2 animate-fadeIn">
      {suggestions.map((suggestion, index) => {
        const parts = suggestion.split('@');
        if (parts.length !== 2) return null;
        
        const domain = parts[1];
        const provider = premiumDomains.find(pd => pd.domain === domain);
        
        return (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            className={`flex items-center text-xs px-3 py-1.5 rounded-full transition-all duration-150 ${
              hoveredIndex === index
                ? 'bg-primary/10 text-primary shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-primary/5 hover:text-primary/90'
            }`}
          >
            @{domain}
            {provider && (
              <a 
                href={provider.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="ml-1.5 text-muted-foreground hover:text-foreground"
                title={`Visit ${provider.name}`}
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default EmailSuggestions;
