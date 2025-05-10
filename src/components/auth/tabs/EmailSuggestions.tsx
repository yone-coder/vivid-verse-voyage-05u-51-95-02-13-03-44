
import React from 'react';
import { Check } from 'lucide-react';

interface EmailSuggestionsProps {
  suggestions: string[];
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  selectSuggestion: (suggestion: string) => void;
  premiumDomains: string[];
}

const EmailSuggestions = ({
  suggestions,
  hoveredIndex,
  setHoveredIndex,
  selectSuggestion,
  premiumDomains
}: EmailSuggestionsProps) => {
  if (suggestions.length === 0) return null;
  
  return (
    <div className="mt-1 border border-input bg-popover shadow-md rounded-md overflow-hidden z-50">
      <ul className="max-h-56 overflow-auto p-1">
        {suggestions.map((suggestion, index) => {
          const [username, domain] = suggestion.split('@');
          const isPremium = premiumDomains.includes(domain);
          
          return (
            <li 
              key={suggestion} 
              className={`
                px-3 py-2 text-sm rounded-sm cursor-pointer flex items-center justify-between
                ${hoveredIndex === index ? 'bg-muted' : ''}
                ${hoveredIndex === index ? 'text-emphasis' : 'text-popover-foreground'}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              onClick={() => selectSuggestion(suggestion)}
            >
              <div className="flex items-center">
                <span className="font-medium">{username}</span>
                <span className="text-muted-foreground">@{domain}</span>
                {isPremium && (
                  <span className="ml-2 text-xs bg-primary/20 text-primary px-1.5 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              {hoveredIndex === index && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmailSuggestions;
