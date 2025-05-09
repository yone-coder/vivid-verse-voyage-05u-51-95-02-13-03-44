
// Email validation utilities

export const premiumDomains = [
  { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com' },
  { name: 'Yahoo', domain: 'yahoo.com', url: 'https://yahoo.com' },
  { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com' },
  { name: 'iCloud', domain: 'icloud.com', url: 'https://icloud.com' },
  { name: 'ProtonMail', domain: 'protonmail.com', url: 'https://protonmail.com' },
  { name: 'AOL', domain: 'aol.com', url: 'https://aol.com' },
  { name: 'Zoho', domain: 'zoho.com', url: 'https://zoho.com' },
  { name: 'Tutanota', domain: 'tutanota.com', url: 'https://tutanota.com' },
];

export const disposableDomainPatterns = [
  /10minutemail/, /mailinator/, /tempmail/, /guerrillamail/, /yopmail/, /throwawaymail/,
  /tempinbox/, /fakeinbox/, /mailnesia/, /dispostable/, /mailnull/, /spamgourmet/,
  /mytemp.email/, /sharklasers/, /trashmail/, /mailcatch/, /discard.email/, /temp-mail/
];

// Common email typos to suggest corrections for
export const commonTypos: Record<string, string> = {
  'gmail.co': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'hotmail.co': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'yahoomail.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'ymail.co': 'ymail.com',
  'outloo.com': 'outlook.com',
  'outlok.com': 'outlook.com',
  'iclod.com': 'icloud.com',
  'icoud.com': 'icloud.com'
};

// Helper functions for email validation

// Normalize and lowercase domain
export const normalizeEmail = (val: string) => {
  const atIndex = val.indexOf('@');
  if (atIndex === -1) return val; // no @ yet, return raw input
  const local = val.slice(0, atIndex);
  const domain = val.slice(atIndex + 1).toLowerCase();
  return `${local}@${domain}`;
};

// Detect disposable provider
export const isDisposableDomain = (domain: string) =>
  disposableDomainPatterns.some((pattern) => pattern.test(domain));

// Generate email suggestions
export const generateSuggestions = (input: string): string[] => {
  const trimmed = input.trim();
  if (trimmed.length < 3) return [];

  let partialDomain = '';
  let username = trimmed;

  if (trimmed.includes('@')) {
    const parts = trimmed.split('@');
    if (parts.length !== 2) return [];
    
    username = parts[0];
    partialDomain = parts[1];
    
    // If domain includes dot, assume complete — don't show suggestions
    if (partialDomain && partialDomain.includes('.')) return [];
  }

  if (!username) return [];

  const lowerPartial = partialDomain?.toLowerCase() || '';
  return premiumDomains
    .filter(({ domain }) => domain.startsWith(lowerPartial))
    .slice(0, 6)
    .map(({ domain }) => `${username}@${domain}`);
};

// Email strength criteria
export const getEmailStrength = (email: string): {
  score: number;
  messages: {text: string, positive: boolean}[];
} => {
  if (!email || !email.includes('@')) return { score: 0, messages: [] };
  
  const parts = email.split('@');
  if (parts.length !== 2) return { score: 0, messages: [] };
  
  const [localPart, domain] = parts;
  if (!localPart || !domain) return { score: 0, messages: [] };
  
  let score = 0;
  const messages: {text: string, positive: boolean}[] = [];
  
  // Domain checks
  if (domain && domain.includes('.')) {
    score += 2;
    
    // Check for premium domain
    const isPremium = premiumDomains.some(pd => pd.domain === domain.toLowerCase());
    if (isPremium) {
      score += 1;
      messages.push({text: 'Using a recognized email provider', positive: true});
    }
    
    // Check for typos
    const potentialTypo = Object.keys(commonTypos).find(typo => domain.toLowerCase() === typo);
    if (potentialTypo) {
      score -= 1;
      messages.push({text: `Did you mean ${commonTypos[potentialTypo]}?`, positive: false});
    }
    
    // Check for disposable domain
    const isDisposable = disposableDomainPatterns.some(pattern => pattern.test(domain.toLowerCase()));
    if (isDisposable) {
      score -= 3;
      messages.push({text: 'Temporary email addresses are not accepted', positive: false});
    }
  }
  
  // Local part checks
  if (localPart) {
    // Length
    if (localPart.length > 5) {
      score += 1;
    }
    
    // Contains numbers
    if (/\d/.test(localPart)) {
      score += 1;
    }
    
    // Contains special chars
    if (/[._-]/.test(localPart)) {
      score += 1;
      messages.push({text: 'Email contains special characters', positive: true});
    }
    
    // Contains both letters and numbers
    if (/[a-zA-Z]/.test(localPart) && /\d/.test(localPart)) {
      score += 1;
      messages.push({text: 'Good mix of letters and numbers', positive: true});
    }
  }
  
  // Email format validation
  const strictRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (strictRegex.test(email)) {
    score += 2;
  } else {
    score -= 2;
    messages.push({text: 'Invalid email format', positive: false});
  }
  
  return { score, messages };
};

// Fixed: Changed the function signature to avoid infinite type instantiation
// The issue was that setTypoSuggestion's type was involving the return type of this function
export const getValidationMessage = (emailValue: string, setTypoSuggestionFn: (suggestion: string | null) => void): string | null => {
  if (!emailValue) return null;
  if (emailValue.length < 4) return 'Enter at least 4 characters.';
  if (!emailValue.includes('@')) return 'Missing "@" symbol. Example: name@example.com';
  
  const parts = emailValue.split('@');
  if (parts.length !== 2) return 'Invalid email format. Example: name@example.com';
  
  const [localPart, domainPart] = parts;
  if (!localPart) return 'Please enter your email username (before @)';
  if (!domainPart) return 'Please enter a domain (after @)';
  if (domainPart.length < 5) return 'Incomplete domain. Example: gmail.com';
  if (domainPart.split('.').length < 2 || domainPart.endsWith('.'))
    return 'Invalid domain format. Example: example.com';
  if (isDisposableDomain(domainPart)) 
    return 'Please use a permanent, non-disposable email.';
  
  // Check for common typos in domain
  for (const typo in commonTypos) {
    if (domainPart === typo) {
      setTypoSuggestionFn(`${localPart}@${commonTypos[typo]}`);
      return `Did you mean ${commonTypos[typo]}? (Click to correct)`;
    }
  }
  
  setTypoSuggestionFn(null);
  
  // Stricter validation
  const strictRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!strictRegex.test(normalizeEmail(emailValue))) 
    return 'Please enter a valid email address';
    
  return null;
};
