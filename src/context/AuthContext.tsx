import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkUserExists: (email: string) => Promise<boolean>;
  skipSuccessScreen: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldSkipSuccessScreen, setShouldSkipSuccessScreen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Only redirect immediately if we're explicitly skipping the success screen
        if (event === 'SIGNED_IN' && shouldSkipSuccessScreen) {
          setTimeout(() => {
            navigate('/');
            setShouldSkipSuccessScreen(false);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          // Use setTimeout to prevent React state update loops
          setTimeout(() => {
            navigate('/auth');
          }, 0);
        }
        // For normal sign-ins, let the SignInScreen component handle the success flow
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, shouldSkipSuccessScreen]);

  const skipSuccessScreen = () => {
    setShouldSkipSuccessScreen(true);
    navigate('/');
  };

  const handleAuthError = (error: any, defaultMessage: string) => {
    console.error(defaultMessage, error);
    
    // Map common error messages to user-friendly versions
    const errorMessage = error?.message || '';
    
    if (errorMessage.includes('Email not confirmed')) {
      return toast.error('Please check your email and confirm your account before signing in.');
    } else if (errorMessage.includes('Invalid login credentials')) {
      return toast.error('Incorrect email or password. Please try again.');
    } else if (errorMessage.includes('already registered')) {
      return toast.error('This email is already registered. Please try signing in instead.');
    } else if (errorMessage.includes('Password should be')) {
      return toast.error('Your password must be at least 8 characters long.');
    } else {
      return toast.error(defaultMessage);
    }
  };

  const checkUserExists = async (email: string): Promise<boolean> => {
    try {
      // First, try to sign in with a dummy password to check if user exists
      // This is a Supabase-specific approach since there's no direct "check user exists" API
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy_password_check_user_exists_12345'
      });
      
      if (error) {
        // If error message contains "Invalid login credentials", user exists but password is wrong
        if (error.message.includes('Invalid login credentials')) {
          return true;
        }
        // If error is about user not found or email not confirmed, user doesn't exist
        return false;
      }
      
      // This shouldn't happen with dummy password, but if it does, user exists
      return true;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        handleAuthError(error, 'Failed to sign in');
        throw error;
      }
      
      console.log("Signed in successfully:", data);
      toast.success("Signed in successfully!");
      return;
      
    } catch (error: any) {
      handleAuthError(error, 'Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        handleAuthError(error, 'Failed to create account');
        throw error;
      }
      
      console.log("Signed up successfully:", data);
      toast.success("Account created successfully!");
      
      // If email confirmation is enabled in Supabase settings
      if (data.session === null) {
        toast.info("Please check your email to confirm your account");
        navigate('/auth');
      }
      
      return;
      
    } catch (error: any) {
      handleAuthError(error, 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        handleAuthError(error, 'Failed to sign out');
        throw error;
      }
      
      // Auth state listener will handle the navigation
      toast.success("Signed out successfully!");
      return;
      
    } catch (error: any) {
      handleAuthError(error, 'Failed to sign out');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut, checkUserExists, skipSuccessScreen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
