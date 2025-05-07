
import { useState, useCallback } from 'react';

type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  passwordMatch?: string;
  validate?: (value: string) => boolean | string;
};

type ValidationErrors = {
  [key: string]: string | null;
};

type ValidationState = {
  [key: string]: {
    value: string;
    touched: boolean;
    error: string | null;
  };
};

export function useFormValidation(initialState: {
  [key: string]: string;
}, validationRules: { [key: string]: ValidationRules }) {
  const initialValidationState: ValidationState = Object.keys(initialState).reduce((acc, key) => {
    acc[key] = { value: initialState[key], touched: false, error: null };
    return acc;
  }, {} as ValidationState);

  const [formState, setFormState] = useState<ValidationState>(initialValidationState);

  const validateField = useCallback((name: string, value: string): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      return `${name} is required`;
    }

    if (rules.minLength !== undefined && value.length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength !== undefined && value.length > rules.maxLength) {
      return `${name} must not exceed ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return `${name} format is invalid`;
    }

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return `Please enter a valid email address`;
    }

    if (rules.passwordMatch && value !== formState[rules.passwordMatch]?.value) {
      return `Passwords don't match`;
    }

    if (rules.validate) {
      const result = rules.validate(value);
      if (typeof result === 'string') {
        return result;
      } else if (result === false) {
        return `${name} is invalid`;
      }
    }

    return null;
  }, [formState, validationRules]);

  const handleChange = useCallback((name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        value,
        touched: true,
        error: validateField(name, value),
      },
    }));
  }, [validateField]);

  const handleBlur = useCallback((name: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value),
      },
    }));
  }, [validateField]);

  const validateAll = useCallback((): boolean => {
    let isValid = true;
    const newState = { ...formState };

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, formState[name]?.value || '');
      newState[name] = {
        ...formState[name],
        touched: true,
        error,
      };
      
      if (error) {
        isValid = false;
      }
    });

    setFormState(newState);
    return isValid;
  }, [formState, validateField, validationRules]);

  const resetForm = useCallback(() => {
    setFormState(initialValidationState);
  }, [initialValidationState]);

  const values = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].value;
    return acc;
  }, {} as { [key: string]: string });

  const errors = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].error;
    return acc;
  }, {} as ValidationErrors);

  const touched = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].touched;
    return acc;
  }, {} as { [key: string]: boolean });

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    resetForm,
  };
}
