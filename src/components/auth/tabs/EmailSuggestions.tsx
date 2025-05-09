import React from 'react';
import { ExternalLink } from 'lucide-react';

interface EmailSuggestionsProps {
  suggestions: string[];
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  selectSuggestion: (suggestion: string) => void;
  premiumDomains: { name: string; domain: string; url: string }[];
}

const EmailSuggestions = ({ 
  suggestions, 
  hoveredIndex, 
  setHoveredIndex, 
  selectSuggestion,
  premiumDomains
}: EmailSuggestionsProps) => {
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
            onClick={() => selectSuggestion(suggestion)}
            onMouseEnter={() => setHoveredIndex(index)}
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
