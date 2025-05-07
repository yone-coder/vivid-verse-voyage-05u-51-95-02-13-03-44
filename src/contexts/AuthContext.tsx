
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  validationErrors: Record<string, string | null>;
  setValidationError: (field: string, message: string | null) => void;
  clearValidationErrors: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string | null>>({});
  const { toast } = useToast();

  const setValidationError = (field: string, message: string | null) => {
    setValidationErrors(prev => ({ ...prev, [field]: message }));
  };

  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  // Clean up auth state to prevent issues
  const cleanupAuthState = () => {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Show toast notifications for auth events
        if (session?.user && event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: `Welcome ${session.user.email || 'back'}!`,
            variant: "default",
            className: "bg-green-100 border-green-400 text-green-800",
          });

          // Defer data fetching to prevent deadlocks
          setTimeout(() => {
            // You could fetch user profile data here if needed
            console.log('User is signed in, fetching additional data');
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out successfully",
            description: "You have been signed out",
            variant: "default",
            className: "bg-blue-100 border-blue-400 text-blue-800",
          });
        } else if (event === 'USER_UPDATED') {
          toast({
            title: "Account updated",
            description: "Your account has been updated successfully",
            variant: "default",
            className: "bg-green-100 border-green-400 text-green-800",
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      setIsLoading(true);
      clearValidationErrors();
      
      // Validate form fields
      if (!email.trim()) {
        setValidationError('email', 'Email is required');
        throw new Error('Email is required');
      }
      
      if (!password) {
        setValidationError('password', 'Password is required');
        throw new Error('Password is required');
      }
      
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes('email')) {
          setValidationError('email', error.message);
        } else if (error.message.includes('password')) {
          setValidationError('password', error.message);
        } else {
          // Generic error
          setValidationError('form', error.message);
        }
        throw error;
      }
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('auth_remember_me', 'true');
      } else {
        localStorage.removeItem('auth_remember_me');
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "default",
        className: "bg-green-100 border-green-400 text-green-800 animate-fade-in",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
        className: "animate-shake",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      clearValidationErrors();
      
      // Validate email
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setValidationError('email', 'Please enter a valid email address');
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password
      if (!password) {
        setValidationError('password', 'Password is required');
        throw new Error('Password is required');
      }
      
      if (password.length < 8) {
        setValidationError('password', 'Password must be at least 8 characters');
        throw new Error('Password must be at least 8 characters');
      }
      
      if (!/[A-Z]/.test(password)) {
        setValidationError('password', 'Password must contain at least one uppercase letter');
        throw new Error('Password must contain at least one uppercase letter');
      }
      
      if (!/[0-9]/.test(password)) {
        setValidationError('password', 'Password must contain at least one number');
        throw new Error('Password must contain at least one number');
      }
      
      // Clean up existing state
      cleanupAuthState();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        if (error.message.includes('email')) {
          setValidationError('email', error.message);
        } else if (error.message.includes('password')) {
          setValidationError('password', error.message);
        } else {
          setValidationError('form', error.message);
        }
        throw error;
      }
      
      toast({
        title: "Sign up successful",
        description: "Please check your email for verification instructions",
        className: "bg-green-100 border-green-400 text-green-800 animate-fade-in",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
        className: "animate-shake",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast({
        title: "Signed out successfully",
        className: "bg-blue-100 border-blue-400 text-blue-800 animate-fade-in",
      });
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
        className: "animate-shake",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for the reset link",
      });
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message || "An error occurred sending reset email",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated successfully",
        description: "You can now log in with your new password",
      });
    } catch (error: any) {
      toast({
        title: "Password update failed",
        description: error.message || "An error occurred updating your password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    validationErrors,
    setValidationError,
    clearValidationErrors,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
