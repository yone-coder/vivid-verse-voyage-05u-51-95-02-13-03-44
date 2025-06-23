
import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, Mail, Info, X, Sparkles, Globe, Shield } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {
  showValidation?: boolean
  validationState?: 'valid' | 'invalid' | 'pending' | 'warning' | null
  validationMessage?: string
  showEmailSuggestions?: boolean
  onEmailSuggestionSelect?: (suggestion: string) => void
  showEmailInsights?: boolean
  enableSmartCorrection?: boolean
  showSecurityIndicator?: boolean
  enableRealTimeValidation?: boolean
}

interface EmailInsight {
  type: 'business' | 'personal' | 'educational' | 'temporary' | 'suspicious'
  confidence: number
  message: string
  icon: React.ElementType
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    showValidation = false,
    validationState = null,
    validationMessage = '',
    showEmailSuggestions = false,
    onEmailSuggestionSelect,
    showEmailInsights = false,
    enableSmartCorrection = false,
    showSecurityIndicator = false,
    enableRealTimeValidation = true,
    value,
    onChange,
    onBlur,
    onFocus,
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState(value || '')
    const [emailSuggestions, setEmailSuggestions] = React.useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const [emailInsights, setEmailInsights] = React.useState<EmailInsight[]>([])
    const [showInsights, setShowInsights] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasBeenTouched, setHasBeenTouched] = React.useState(false)
    const [typingTimer, setTypingTimer] = React.useState<NodeJS.Timeout | null>(null)
    
    const commonDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
      'icloud.com', 'aol.com', 'protonmail.com', 'live.com',
      'msn.com', 'yandex.com', 'mail.com', 'zoho.com'
    ]

    const businessDomains = [
      'company.com', 'business.org', 'enterprise.net', 'corp.com'
    ]

    const educationalDomains = [
      'edu', 'ac.uk', 'university.edu', 'college.edu'
    ]

    const temporaryDomains = [
      '10minutemail.com', 'tempmail.org', 'guerrillamail.com'
    ]

    // Enhanced email validation with more comprehensive checks
    const validateEmailAdvanced = React.useCallback((email: string) => {
      if (!email || !enableRealTimeValidation) return null

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const isValidFormat = emailRegex.test(email)
      
      if (!isValidFormat) {
        return {
          state: 'invalid' as const,
          message: 'Please enter a valid email format'
        }
      }

      const [username, domain] = email.split('@')
      
      // Check for suspicious patterns
      if (username.length < 2) {
        return {
          state: 'warning' as const,
          message: 'Username seems unusually short'
        }
      }

      if (username.includes('..') || username.startsWith('.') || username.endsWith('.')) {
        return {
          state: 'invalid' as const,
          message: 'Invalid username format'
        }
      }

      // Check for temporary email domains
      if (temporaryDomains.some(temp => domain.toLowerCase().includes(temp))) {
        return {
          state: 'warning' as const,
          message: 'Temporary email detected - consider using a permanent address'
        }
      }

      // All good!
      return {
        state: 'valid' as const,
        message: 'Email looks great!'
      }
    }, [enableRealTimeValidation])

    // Generate smart email suggestions
    const generateEmailSuggestions = React.useCallback((value: string) => {
      if (!value.includes('@') || !showEmailSuggestions) return []
      
      const [username, domain] = value.split('@')
      if (!domain || domain.length === 0) return []
      
      const suggestions = commonDomains
        .filter(d => d.toLowerCase().startsWith(domain.toLowerCase()) && d !== domain.toLowerCase())
        .slice(0, 4)
        .map(d => `${username}@${d}`)

      // Add smart corrections for common typos
      const commonTypos: Record<string, string> = {
        'gmail.co': 'gmail.com',
        'gmail.cm': 'gmail.com',
        'gmai.com': 'gmail.com',
        'gmial.com': 'gmail.com',
        'yahoo.co': 'yahoo.com',
        'yahoo.cm': 'yahoo.com',
        'hotmail.co': 'hotmail.com',
        'outlook.co': 'outlook.com',
        'outlok.com': 'outlook.com'
      }

      if (commonTypos[domain.toLowerCase()]) {
        suggestions.unshift(`${username}@${commonTypos[domain.toLowerCase()]}`)
      }

      return [...new Set(suggestions)] // Remove duplicates
    }, [showEmailSuggestions])

    // Generate email insights
    const generateEmailInsights = React.useCallback((email: string) => {
      if (!email.includes('@') || !showEmailInsights) return []

      const [, domain] = email.split('@')
      const insights: EmailInsight[] = []

      // Business email detection
      if (!commonDomains.includes(domain.toLowerCase())) {
        insights.push({
          type: 'business',
          confidence: 0.8,
          message: 'Business email detected',
          icon: Globe
        })
      }

      // Educational email detection
      if (educationalDomains.some(edu => domain.toLowerCase().includes(edu))) {
        insights.push({
          type: 'educational',
          confidence: 0.9,
          message: 'Educational institution email',
          icon: Sparkles
        })
      }

      // Security assessment
      if (domain.includes('.') && !domain.includes('..')) {
        insights.push({
          type: 'personal',
          confidence: 0.7,
          message: 'Standard email provider',
          icon: Shield
        })
      }

      return insights
    }, [showEmailInsights])

    // Handle input changes with debouncing
    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      setHasBeenTouched(true)

      // Clear existing timer
      if (typingTimer) {
        clearTimeout(typingTimer)
      }

      // Set new timer for debounced operations
      const newTimer = setTimeout(() => {
        if (type === 'email') {
          const suggestions = generateEmailSuggestions(newValue)
          setEmailSuggestions(suggestions)
          setShowSuggestions(suggestions.length > 0 && isFocused)

          const insights = generateEmailInsights(newValue)
          setEmailInsights(insights)
          setShowInsights(insights.length > 0 && isFocused)
        }
      }, 300)

      setTypingTimer(newTimer)
      
      if (onChange) {
        onChange(e)
      }
    }, [onChange, type, generateEmailSuggestions, generateEmailInsights, typingTimer, isFocused])

    // Handle suggestion selection
    const handleSuggestionClick = React.useCallback((suggestion: string) => {
      setInputValue(suggestion)
      setShowSuggestions(false)
      setEmailSuggestions([])
      
      if (onEmailSuggestionSelect) {
        onEmailSuggestionSelect(suggestion)
      }
      
      // Trigger onChange event
      const syntheticEvent = {
        target: { value: suggestion },
        currentTarget: { value: suggestion }
      } as React.ChangeEvent<HTMLInputElement>
      
      if (onChange) {
        onChange(syntheticEvent)
      }
    }, [onEmailSuggestionSelect, onChange])

    // Handle focus events
    const handleFocus = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      if (type === 'email' && inputValue) {
        const suggestions = generateEmailSuggestions(inputValue)
        setShowSuggestions(suggestions.length > 0)
        
        const insights = generateEmailInsights(inputValue)
        setShowInsights(insights.length > 0)
      }
      if (onFocus) {
        onFocus(e)
      }
    }, [onFocus, type, inputValue, generateEmailSuggestions, generateEmailInsights])

    // Handle blur events
    const handleBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setTimeout(() => {
        setShowSuggestions(false)
        setShowInsights(false)
      }, 150) // Delay to allow clicking on suggestions
      if (onBlur) {
        onBlur(e)
      }
    }, [onBlur])

    // Clean up timer on unmount
    React.useEffect(() => {
      return () => {
        if (typingTimer) {
          clearTimeout(typingTimer)
        }
      }
    }, [typingTimer])

    // Sync external value changes
    React.useEffect(() => {
      if (value !== undefined && value !== inputValue) {
        setInputValue(value)
      }
    }, [value, inputValue])

    const getValidationIcon = () => {
      switch (validationState) {
        case 'valid':
          return <CheckCircle className="w-4 h-4 text-green-500" />
        case 'invalid':
          return <AlertCircle className="w-4 h-4 text-red-500" />
        case 'warning':
          return <Info className="w-4 h-4 text-yellow-500" />
        case 'pending':
          return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        default:
          return null
      }
    }

    const getBorderColor = () => {
      if (!hasBeenTouched && !isFocused) {
        return 'border-input focus-visible:ring-ring'
      }
      
      switch (validationState) {
        case 'valid':
          return 'border-green-300 focus-visible:ring-green-500'
        case 'invalid':
          return 'border-red-300 focus-visible:ring-red-500'
        case 'warning':
          return 'border-yellow-300 focus-visible:ring-yellow-500'
        case 'pending':
          return 'border-blue-300 focus-visible:ring-blue-500'
        default:
          return 'border-input focus-visible:ring-ring'
      }
    }

    const getBackgroundColor = () => {
      if (!isFocused) return 'bg-background'
      
      switch (validationState) {
        case 'valid':
          return 'bg-green-50'
        case 'invalid':
          return 'bg-red-50'
        case 'warning':
          return 'bg-yellow-50'
        case 'pending':
          return 'bg-blue-50'
        default:
          return 'bg-background'
      }
    }

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-md border px-4 py-2 text-sm shadow-sm transition-all duration-200",
            "placeholder:text-muted-foreground/60 placeholder:text-sm",
            "focus-visible:outline-none focus-visible:ring-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-0 file:bg-transparent file:text-foreground file:font-medium",
            getBorderColor(),
            getBackgroundColor(),
            showValidation && validationState && "pr-10",
            isFocused && "shadow-md",
            className
          )}
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {/* Validation Icon */}
        {showValidation && validationState && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {getValidationIcon()}
          </div>
        )}
        
        {/* Email Suggestions Dropdown */}
        {showSuggestions && emailSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg animate-fade-in">
            <div className="p-2 text-xs text-gray-500 border-b border-gray-100 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Smart suggestions</span>
            </div>
            {emailSuggestions.map((suggestion, index) => (
              <button
                key={`${suggestion}-${index}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 transition-colors group"
              >
                <Mail className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="flex-1">{suggestion}</span>
                <div className="text-xs text-gray-400">↵</div>
              </button>
            ))}
          </div>
        )}

        {/* Email Insights Panel */}
        {showInsights && emailInsights.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-40 mt-16 bg-white border border-gray-200 rounded-md shadow-lg animate-fade-in">
            <div className="p-2 text-xs text-gray-500 border-b border-gray-100 flex items-center space-x-1">
              <Info className="w-3 h-3" />
              <span>Email insights</span>
            </div>
            {emailInsights.map((insight, index) => (
              <div key={index} className="px-3 py-2 text-sm flex items-center space-x-2">
                <insight.icon className="w-3 h-3 text-blue-500" />
                <span className="flex-1">{insight.message}</span>
                <div className="text-xs text-gray-400">
                  {Math.round(insight.confidence * 100)}%
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Security Indicator */}
        {showSecurityIndicator && type === 'email' && inputValue && validationState === 'valid' && (
          <div className="absolute top-full left-0 mt-1 flex items-center space-x-1 text-xs text-green-600">
            <Shield className="w-3 h-3" />
            <span>Secure email format</span>
          </div>
        )}
        
        {/* Validation Message */}
        {showValidation && validationMessage && (
          <div className={cn(
            "mt-1 text-xs transition-all duration-200 flex items-center space-x-1",
            validationState === 'valid' && "text-green-600",
            validationState === 'invalid' && "text-red-600",
            validationState === 'warning' && "text-yellow-600",
            validationState === 'pending' && "text-blue-600"
          )}>
            {validationState === 'valid' && <CheckCircle className="w-3 h-3" />}
            {validationState === 'invalid' && <X className="w-3 h-3" />}
            {validationState === 'warning' && <Info className="w-3 h-3" />}
            <span>{validationMessage}</span>
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
