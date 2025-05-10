
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Custom hook to check if an email exists in the system
 * This is extracted to solve the type instantiation error
 */
export const useEmailCheck = () => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // Added explicit Promise<boolean> return type to fix type instantiation issue
  const checkEmailExists = async (email: string): Promise<boolean> => {
    setIsCheckingEmail(true);
    
    try {
      console.log("Checking if email exists:", email);
      
      // Method 1: Try using OTP method to check if email exists
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: false }
        });
        
        if (!error) {
          console.log("Email exists (OTP method):", email);
          return true;
        }

        if (error?.message?.includes("Email not confirmed")) {
          console.log("Email exists but not confirmed:", email);
          return true;
        }
      } catch (err) {
        console.error("OTP check error:", err);
      }
      
      // Method 2: Check profiles table
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', email)
          .maybeSingle();
        
        if (!error) {
          const exists = !!data;
          console.log("Email lookup result:", data, "Exists:", exists);
          return exists;
        }
        
        // Check if profiles table exists
        const { error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
          
        if (!profileError) {
          // Table exists but email wasn't found
          return false;
        }
      } catch (err) {
        console.error("Profile check error:", err);
      }
      
      // Method 3: Final fallback - try auth API with invalid password
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: "check_if_email_exists_" + Math.random().toString(36)
        });
        
        if (error?.message?.includes("Invalid login credentials")) {
          console.log("Email exists (fallback):", email);
          return true;
        } 
        
        if (error?.message?.includes("Email not confirmed")) {
          console.log("Email exists but not confirmed:", email);
          return true;
        }
      } catch (err) {
        console.error("Login check error:", err);
      }
      
      console.log("Email doesn't exist:", email);
      return false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  return { 
    checkEmailExists, 
    isCheckingEmail 
  };
};
