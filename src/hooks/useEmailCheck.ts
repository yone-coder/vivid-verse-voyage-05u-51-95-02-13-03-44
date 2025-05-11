
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

      // Second try: Better password login check - most reliable distinction
      try {
        // Try a fake password login - will return different errors based on if user exists
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: "check_email_exists_" + Math.random().toString(36).substring(2, 9)
        });
        
        if (error) {
          // User exists but invalid credentials
          if (error.message && (
              error.message.includes("Invalid login credentials") || 
              error.message.includes("Email not confirmed") ||
              error.message.includes("Invalid email or password")
            )) {
            console.log("Email exists (password check):", email);
            setEmailVerified(true);
            setIsCheckingEmail(false);
            return true;
          }
          
          // This is the key improvement - "User not found" indicates the email is not registered
          if (error.message && error.message.includes("User not found")) {
            console.log("Email does not exist (user not found):", email);
            setEmailVerified(false);
            setIsCheckingEmail(false);
            return false;
          }
        }
      } catch (err) {
        console.error("Login check error:", err);
        // Continue to final method
      }

      // Third try: OTP method - last resort
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: false }
        });
        
        // Error indicates OTP couldn't be sent - usually because user doesn't exist
        if (error && (
            error.message.includes("User not found") || 
            error.message.includes("Unable to validate email address")
          )) {
          console.log("Email not found (OTP method):", email);
          setEmailVerified(false);
          setIsCheckingEmail(false);
          return false;
        }
        
        // No error generally means OTP was sent - user probably exists
        if (!error) {
          console.log("Email exists (OTP sent successfully):", email);
          setEmailVerified(true);
          setIsCheckingEmail(false);
          return true;
        }
      } catch (err) {
        console.error("OTP check error:", err);
      }
      
      // If we've reached this point without a conclusive result,
      // conservatively assume the user doesn't exist
      console.log("Email verification inconclusive, assuming new user:", email);
      setEmailVerified(false);
      setIsCheckingEmail(false);
      return false;
    } catch (error) {
      console.error("Error checking email:", error);
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
