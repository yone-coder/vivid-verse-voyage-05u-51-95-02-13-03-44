
// List of common email domains
export const premiumDomains = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'hotmail.com',
  'aol.com',
  'icloud.com',
  'proton.me',
  'protonmail.com',
  'mail.com',
  'zoho.com'
];

// Helper to clean up email inputs
export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

// Generate email suggestions based on partial input
export const generateSuggestions = (email: string): string[] => {
  if (!email || email.length < 2) return [];
  
  // If email already has an @ symbol
  if (email.includes('@')) {
    const [username, domainPart] = email.split('@');
    
    // If domain part is empty or very short, show all suggestions
    if (!domainPart || domainPart.length === 0) {
      return premiumDomains.map(domain => `${username}@${domain}`);
    }
    
    // Filter domains that start with the entered domain part
    return premiumDomains
      .filter(domain => domain.startsWith(domainPart) && domain !== domainPart)
      .map(domain => `${username}@${domain}`);
  }
  
  // If no @ symbol, suggest adding common domains
  return premiumDomains.slice(0, 3).map(domain => `${email}@${domain}`);
};

// Validate email and provide specific error message
export const getValidationMessage = (
  email: string,
  setTypoSuggestion?: (suggestion: string | null) => void
): string | null => {
  if (!email) return "Email is required";
  
  // Basic format check
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  
  // More specific validations
  const [localPart, domain] = email.split('@');
  
  // Check local part
  if (localPart.length > 64) {
    return "The part before @ is too long";
  }
  
  // Check domain
  if (domain.length > 255) {
    return "Domain name is too long";
  }
  
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain)) {
    return "Please check the domain part of your email";
  }
  
  // Common typos in domain
  const typoPatterns: [RegExp, string][] = [
    [/gmail\.co$/, 'gmail.com'],
    [/gamil\.com$/, 'gmail.com'],
    [/gmial\.com$/, 'gmail.com'],
    [/gmal\.com$/, 'gmail.com'],
    [/hotmail\.co$/, 'hotmail.com'],
    [/homail\.com$/, 'hotmail.com'],
    [/outlook\.co$/, 'outlook.com'],
    [/yahoo\.co$/, 'yahoo.com'],
    [/yaho\.com$/, 'yahoo.com'],
    [/protonmail\.co$/, 'protonmail.com'],
    [/icloud\.co$/, 'icloud.com']
  ];
  
  for (const [pattern, correction] of typoPatterns) {
    if (pattern.test(domain)) {
      const suggestedDomain = domain.replace(pattern, correction);
      const suggestion = `${localPart}@${suggestedDomain}`;
      
      // Set typo suggestion if callback provided
      if (setTypoSuggestion) {
        setTypoSuggestion(suggestion);
      }
      
      return "Possible typo in email domain";
    }
  }
  
  // Email looks good
  return null;
};
