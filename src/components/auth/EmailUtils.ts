
// Email validation utilities

export const premiumDomains = [
  { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com', icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico' },
  { name: 'Yahoo', domain: 'yahoo.com', url: 'https://yahoo.com', icon: 'https://s.yimg.com/nq/fav/y.ico' },
  { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com', icon: 'https://outlook.live.com/favicon.ico' },
  { name: 'iCloud', domain: 'icloud.com', url: 'https://icloud.com', icon: 'https://www.icloud.com/favicon.ico' },
  { name: 'ProtonMail', domain: 'protonmail.com', url: 'https://protonmail.com', icon: 'https://protonmail.com/favicon.ico' },
  { name: 'AOL', domain: 'aol.com', url: 'https://aol.com', icon: 'https://s.yimg.com/nq/fav/y.ico' },
  { name: 'Zoho', domain: 'zoho.com', url: 'https://zoho.com', icon: 'https://www.zoho.com/favicon.ico' },
  { name: 'Tutanota', domain: 'tutanota.com', url: 'https://tutanota.com', icon: 'https://tutanota.com/favicon.ico' },
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

// Check for typos in domain part and return corrected email if a typo is found
export const checkForTypos = (emailValue: string): string | null => {
  if (!emailValue || !emailValue.includes('@')) return null;
  
  const parts = emailValue.split('@');
  if (parts.length !== 2) return null;
  
  const [localPart, domainPart] = parts;
  
  // Check for common typos in domain
  for (const typo in commonTypos) {
    if (domainPart === typo) {
      return `${localPart}@${commonTypos[typo]}`;
    }
  }
  
  return null;
};

// Find email provider info based on domain
export const findEmailProvider = (email: string) => {
  if (!email || !email.includes('@')) return null;
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return null;
  
  return premiumDomains.find(provider => domain === provider.domain || domain.endsWith(`.${provider.domain}`));
};

// Validate email and provide suggestions
export const validateEmail = (email: string) => {
  const typoSuggestion = checkForTypos(email);
  let message = '';
  let isValid = false;
  let suggestions: string[] = [];
  
  // First handle blank cases
  if (!email) {
    return { isValid: false, message: '', suggestions: [] };
  }
  
  if (email.length < 4) {
    message = 'Enter at least 4 characters.';
    return { isValid, message, suggestions };
  }
  
  if (!email.includes('@')) {
    message = 'Missing "@" symbol. Example: name@example.com';
    return { isValid, message, suggestions };
  }
  
  const parts = email.split('@');
  if (parts.length !== 2) {
    message = 'Invalid email format. Example: name@example.com';
    return { isValid, message, suggestions };
  }
  
  const [localPart, domainPart] = parts;
  if (!localPart) {
    message = 'Please enter your email username (before @)';
    return { isValid, message, suggestions };
  }
  
  if (!domainPart) {
    message = 'Please enter a domain (after @)';
    // Generate domain suggestions
    suggestions = generateSuggestions(email);
    return { isValid, message, suggestions };
  }
  
  if (domainPart.length < 5) {
    message = 'Incomplete domain. Example: gmail.com';
    // Generate domain suggestions if partial domain entered
    suggestions = generateSuggestions(email);
    return { isValid, message, suggestions };
  }
  
  if (domainPart.split('.').length < 2 || domainPart.endsWith('.')) {
    message = 'Invalid domain format. Example: example.com';
    return { isValid, message, suggestions };
  }
  
  if (isDisposableDomain(domainPart)) {
    message = 'Please use a permanent, non-disposable email.';
    return { isValid, message, suggestions };
  }
  
  if (typoSuggestion) {
    const domain = typoSuggestion.split('@')[1];
    message = `Did you mean ${domain}?`;
    suggestions = [typoSuggestion];
    return { isValid, message, suggestions };
  }
  
  // Stricter validation
  const strictRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!strictRegex.test(normalizeEmail(email))) {
    message = 'Please enter a valid email address';
    return { isValid, message, suggestions };
  }
  
  // If we got here, email is valid
  isValid = true;
  return { isValid, message, suggestions };
};
