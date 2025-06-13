import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Custom hook to check if an email exists in the Supabase auth system
 * This improves email verification reliability by handling various edge cases
 */
export const useEmailCheck = () => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  // Added explicit Promise<boolean> return type to fix type instantiation issue
  const checkEmailExists = useCallback(async (email: string): Promise<boolean> => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      return false;
    }
    
    setIsCheckingEmail(true);
    setEmailVerified(null);
    
    try {
      console.log("Checking if email exists:", email);
      
      // First try: Check profiles table - most reliable if user exists
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .ilike('email', email) // Use case-insensitive comparison
          .maybeSingle();
        
        // If profile exists, user definitely exists
        if (!error && data) {
          console.log("Email found in profiles table:", email);
          setEmailVerified(true);
          setIsCheckingEmail(false);
          return true;
        }
      } catch (err) {
        console.error("Profile check error:", err);
        // Continue to other methods if this fails
      }

      // Second try: Use signInWithPassword with a dummy password
      // This will give us clear feedback about whether the user exists
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: "dummy_password_for_check_" + Math.random().toString(36).substring(7)
        });
        
        if (error) {
          // Check the specific error message
          if (error.message.includes("Invalid login credentials") || 
              error.message.includes("Email not confirmed") ||
              error.message.includes("Too many requests")) {
            // User exists but wrong password or other auth issue
            console.log("Email exists (invalid credentials):", email);
            setEmailVerified(true);
            setIsCheckingEmail(false);
            return true;
          }
          
          if (error.message.includes("User not found") ||
              error.message.includes("Invalid email")) {
            // User definitely doesn't exist
            console.log("Email does not exist:", email);
            setEmailVerified(false);
            setIsCheckingEmail(false);
            return false;
          }
        }
      } catch (err) {
        console.error("Login check error:", err);
      }

      // If we reach here, verification was inconclusive
      // For security, assume user doesn't exist (safer for new signups)
      console.log("Email verification inconclusive, assuming new user:", email);
      setEmailVerified(false);
      setIsCheckingEmail(false);
      return false;
      
    } catch (error) {
      console.error("Error checking email:", error);
      // On error, assume user doesn't exist (safer for new signups)
      setEmailVerified(false);
      setIsCheckingEmail(false);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  }, []);

  return { 
    checkEmailExists, 
    isCheckingEmail,
    emailVerified,
    setEmailVerified
  };
};
