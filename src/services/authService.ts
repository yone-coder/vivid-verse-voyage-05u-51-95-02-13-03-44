
// Local auth service to replace Supabase
import { toast } from "sonner";

export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface Session {
  user: User | null;
}

// Mock storage for local development without Supabase
const LOCAL_STORAGE_KEY = 'app_auth_session';

class AuthService {
  private session: Session | null = null;
  private listeners: Array<(session: Session | null) => void> = [];
  
  constructor() {
    // Try to restore session from localStorage
    this.loadSession();
  }

  private loadSession() {
    try {
      const savedSession = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedSession) {
        this.session = JSON.parse(savedSession);
        console.log("Restored session:", this.session);
      }
    } catch (error) {
      console.error("Failed to restore session:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  private saveSession() {
    if (this.session) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.session));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
  
  // Simulate sign in
  async signIn(email: string, password: string): Promise<{ data: { session: Session | null; user: User | null }, error: Error | null }> {
    // Simple validation
    if (!email || !password) {
      return { 
        data: { session: null, user: null },
        error: new Error('Email and password are required') 
      };
    }
    
    if (password.length < 6) {
      return { 
        data: { session: null, user: null },
        error: new Error('Password must be at least 6 characters') 
      };
    }
    
    try {
      // Create a mock user based on the email
      const user: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email: email,
        username: email.split('@')[0],
      };
      
      // Create a session
      const newSession: Session = { user };
      this.session = newSession;
      this.saveSession();
      this.notifyListeners();
      
      return {
        data: { session: newSession, user },
        error: null
      };
    } catch (error) {
      return {
        data: { session: null, user: null },
        error: error instanceof Error ? error : new Error('Unknown error during sign in')
      };
    }
  }
  
  // Simulate sign up
  async signUp(email: string, password: string): Promise<{ data: { user: User | null }, error: Error | null }> {
    // Simple validation 
    if (!email || !password) {
      return { 
        data: { user: null },
        error: new Error('Email and password are required') 
      };
    }
    
    if (password.length < 6) {
      return { 
        data: { user: null },
        error: new Error('Password must be at least 6 characters') 
      };
    }
    
    try {
      // Create a mock user
      const user: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email: email,
        username: email.split('@')[0],
      };
      
      // Sign in the user immediately
      const newSession: Session = { user };
      this.session = newSession;
      this.saveSession();
      this.notifyListeners();
      
      return {
        data: { user },
        error: null
      };
    } catch (error) {
      return {
        data: { user: null },
        error: error instanceof Error ? error : new Error('Unknown error during sign up')
      };
    }
  }
  
  // Simulate sign out
  async signOut(): Promise<{ error: Error | null }> {
    try {
      this.session = null;
      this.saveSession();
      this.notifyListeners();
      
      return { error: null };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error('Unknown error during sign out')
      };
    }
  }
  
  // Get current session
  async getSession(): Promise<{ data: { session: Session | null }, error: Error | null }> {
    return {
      data: { session: this.session },
      error: null
    };
  }
  
  // Listen for auth changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    const listener = (session: Session | null) => {
      // Determine event type
      const event = session ? 'SIGNED_IN' : 'SIGNED_OUT';
      callback(event, session);
    };
    
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners = this.listeners.filter(l => l !== listener);
          }
        }
      }
    };
  }
  
  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.session));
  }
}

export const authService = new AuthService();
