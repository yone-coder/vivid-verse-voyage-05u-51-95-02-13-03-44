
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Custom hook to check if an email exists in the system
 * This improves email verification reliability by handling various edge cases
 */
export const useEmailCheck = () => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  // Added explicit Promise<boolean> return type to fix type instantiation issue
  const checkEmailExists = async (email: string): Promise<boolean> => {
    setIsCheckingEmail(true);
    setEmailVerified(null);
    
    try {
      console.log("Checking if email exists:", email);
      
      // Method 1: Check profiles table first
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .ilike('email', email) // Use case-insensitive comparison
          .maybeSingle();
        
        if (!error && data) {
          console.log("Email found in profiles table:", email);
          setEmailVerified(true);
          setIsCheckingEmail(false);
          return true;
        }
      } catch (err) {
        console.error("Profile check error:", err);
      }
      
      // Method 2: Try using OTP method to check if email exists
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: false }
        });
        
        if (!error) {
          console.log("Email exists (OTP method):", email);
          setEmailVerified(true);
          setIsCheckingEmail(false);
          return true;
        }

        if (error?.message) {
          // Look for specific error messages that indicate the user exists
          if (error.message.includes("Email not confirmed")) {
            console.log("Email exists but not confirmed:", email);
            setEmailVerified(true);
            setIsCheckingEmail(false);
            return true;
          }
          
          // Messages that clearly indicate the user doesn't exist
          if (error.message.includes("User not found") || 
              error.message.includes("Invalid login credentials")) {
            console.log("User not found in auth system:", email);
            setEmailVerified(false);
            setIsCheckingEmail(false);
            return false;
          }
        }
      } catch (err) {
        console.error("OTP check error:", err);
      }
      
      // Method 3: Final fallback - try auth API with invalid password
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: "check_if_email_exists_" + Math.random().toString(36)
        });
        
        if (error?.message) {
          // "Invalid login credentials" means the user exists but password is wrong
          if (error.message.includes("Invalid login credentials")) {
            console.log("Email exists (password method):", email);
            setEmailVerified(true);
            setIsCheckingEmail(false);
            return true;
          } 
          
          // "Email not confirmed" means user exists but hasn't confirmed email
          if (error.message.includes("Email not confirmed")) {
            console.log("Email exists but not confirmed:", email);
            setEmailVerified(true);
            setIsCheckingEmail(false);
            return true;
          }
          
          // For other error messages, assume user doesn't exist
          console.log("Other auth error for email:", email, error.message);
          setEmailVerified(false);
          setIsCheckingEmail(false);
          return false;
        }
      } catch (err) {
        console.error("Login check error:", err);
      }
      
      // If we've reached this point with no conclusive result,
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
  };

  return { 
    checkEmailExists, 
    isCheckingEmail,
    emailVerified
  };
};
