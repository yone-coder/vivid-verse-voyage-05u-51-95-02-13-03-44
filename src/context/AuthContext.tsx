
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, User, Session } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      const { data } = await authService.getSession();
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      setIsLoading(false);
    };

    // Set up auth state change listener
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const { data, error } = await authService.signIn(email, password);
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      if (data.session) {
        navigate("/for-you");
        toast.success("Signed in successfully!");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await authService.signUp(email, password);
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      if (data.user) {
        navigate("/for-you");
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const signOut = async () => {
    try {
      const { error } = await authService.signOut();
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      navigate("/auth");
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error during sign out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut }}>
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
