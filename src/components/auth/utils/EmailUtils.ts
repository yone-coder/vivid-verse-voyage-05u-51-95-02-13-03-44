
interface PremiumDomain {
  name: string;
  domain: string;
  url: string;
}

export const premiumDomains: PremiumDomain[] = [
  { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com' },
  { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com' },
  { name: 'Yahoo', domain: 'yahoo.com', url: 'https://mail.yahoo.com' },
  { name: 'iCloud', domain: 'icloud.com', url: 'https://www.icloud.com' },
  { name: 'Proton Mail', domain: 'proton.me', url: 'https://proton.me' },
  { name: 'Zoho', domain: 'zoho.com', url: 'https://www.zoho.com/mail/' },
];

// Common email domains to suggest
const commonDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'me.com',
  'mail.com',
];

// Normalize email input by trimming and converting to lowercase
export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

// Generate email suggestions based on input
export const generateSuggestions = (email: string): string[] => {
  if (!email || email.length < 2) return [];

  const normalizedEmail = normalizeEmail(email);
  
  // If email already contains @ and a domain part
  if (normalizedEmail.includes('@')) {
    const [username, domainPart] = normalizedEmail.split('@');
    
    if (!domainPart) {
      // If there's just a @ with no domain yet, suggest all common domains
      return commonDomains.map(domain => `${username}@${domain}`);
    } else if (domainPart.length > 0) {
      // If there's a partial domain, filter matching domains
      return commonDomains
        .filter(domain => domain.startsWith(domainPart))
        .map(domain => `${username}@${domain}`);
    }
  }
  
  // No @ yet, don't suggest
  return [];
};

// Simple email validation with typo detection
export const getValidationMessage = (
  email: string, 
  setTypoSuggestion?: (suggestion: string | null) => void
): string | null => {
  // Empty validation
  if (!email) return null;
  
  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Check for common typos
    if (email.includes('@')) {
      const [username, domain] = email.split('@');
      
      // Missing or incorrect domain end
      if (domain && !domain.includes('.')) {
        // Check if it's a common domain without the .com/.net/etc
        const commonDomainBase = commonDomains.find(d => {
          const parts = d.split('.');
          return domain === parts[0];
        });
        
        if (commonDomainBase) {
          const suggestion = `${username}@${commonDomainBase}`;
          if (setTypoSuggestion) setTypoSuggestion(suggestion);
          return "Please include a valid domain (like .com, .net)";
        }
      }
      
      // Check for common typos in domain names
      const commonTypos: Record<string, string> = {
        'gmial': 'gmail',
        'gmaii': 'gmail',
        'gmai': 'gmail',
        'yahooo': 'yahoo',
        'yaho': 'yahoo',
        'hotnail': 'hotmail',
        'hotmal': 'hotmail',
        'outllok': 'outlook',
        'outlok': 'outlook',
      };
      
      if (domain) {
        const domainParts = domain.split('.');
        const domainBase = domainParts[0];
        
        if (commonTypos[domainBase]) {
          const correctedDomain = domain.replace(domainBase, commonTypos[domainBase]);
          const suggestion = `${username}@${correctedDomain}`;
          if (setTypoSuggestion) setTypoSuggestion(suggestion);
          return "There may be a typo in your email domain";
        }
      }
      
      return "Please enter a valid email address";
    }
    
    return "Email should be in the format name@example.com";
  }
  
  return null;
};
