
import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle, Mail } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {
  showValidation?: boolean
  validationState?: 'valid' | 'invalid' | 'pending' | null
  validationMessage?: string
  showEmailSuggestions?: boolean
  onEmailSuggestionSelect?: (suggestion: string) => void
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
    ...props 
  }, ref) => {
    const [emailSuggestions, setEmailSuggestions] = React.useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')
    
    const commonDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
      'icloud.com', 'aol.com', 'protonmail.com', 'live.com'
    ]

    const generateEmailSuggestions = (value: string) => {
      if (!value.includes('@') || !showEmailSuggestions) return []
      
      const [username, domain] = value.split('@')
      if (!domain || domain.length === 0) return []
      
      return commonDomains
        .filter(d => d.toLowerCase().startsWith(domain.toLowerCase()) && d !== domain.toLowerCase())
        .slice(0, 3)
        .map(d => `${username}@${d}`)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      
      if (type === 'email' && showEmailSuggestions) {
        const suggestions = generateEmailSuggestions(value)
        setEmailSuggestions(suggestions)
        setShowSuggestions(suggestions.length > 0)
      }
      
      if (props.onChange) {
        props.onChange(e)
      }
    }

    const handleSuggestionClick = (suggestion: string) => {
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
      
      if (props.onChange) {
        props.onChange(syntheticEvent)
      }
    }

    const getValidationIcon = () => {
      switch (validationState) {
        case 'valid':
          return <CheckCircle className="w-4 h-4 text-green-500" />
        case 'invalid':
          return <AlertCircle className="w-4 h-4 text-red-500" />
        case 'pending':
          return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        default:
          return null
      }
    }

    const getBorderColor = () => {
      switch (validationState) {
        case 'valid':
          return 'border-green-300 focus-visible:ring-green-500'
        case 'invalid':
          return 'border-red-300 focus-visible:ring-red-500'
        case 'pending':
          return 'border-blue-300 focus-visible:ring-blue-500'
        default:
          return 'border-input focus-visible:ring-ring'
      }
    }

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-md border bg-background px-4 py-2 text-sm shadow-sm transition-all duration-200",
            "placeholder:text-muted-foreground/60 placeholder:text-sm",
            "focus-visible:outline-none focus-visible:ring-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-0 file:bg-transparent file:text-foreground file:font-medium",
            getBorderColor(),
            showValidation && validationState && "pr-10",
            className
          )}
          ref={ref}
          value={inputValue || props.value || ''}
          onChange={handleInputChange}
          onBlur={() => setShowSuggestions(false)}
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
            {emailSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onMouseDown={(e) => e.preventDefault()} // Prevent blur
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 first:rounded-t-md last:rounded-b-md transition-colors"
              >
                <Mail className="w-3 h-3 text-gray-400" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
        
        {/* Validation Message */}
        {showValidation && validationMessage && (
          <div className={cn(
            "mt-1 text-xs transition-all duration-200",
            validationState === 'valid' && "text-green-600",
            validationState === 'invalid' && "text-red-600",
            validationState === 'pending' && "text-blue-600"
          )}>
            {validationMessage}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
