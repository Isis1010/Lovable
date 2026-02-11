import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/data/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateSubscription: (isSubscribed: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'neonstream_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const persistUser = (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(user);
  };

  // Mock sign in - replace with Firebase later
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!email || !password) {
      setIsLoading(false);
      throw new Error('Email and password are required');
    }

    // Check if user exists in localStorage (from previous signup)
    const storedUsers = localStorage.getItem('neonstream_users') || '{}';
    const users = JSON.parse(storedUsers);
    const existingUser = users[email];

    if (existingUser && existingUser.password === password) {
      const userData: User = {
        id: existingUser.id,
        email: existingUser.email,
        displayName: existingUser.displayName,
        isSubscribed: existingUser.isSubscribed || false,
        subscribedAt: existingUser.subscribedAt,
      };
      persistUser(userData);
    } else {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  // Mock sign up - replace with Firebase later
  const signUp = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!email || !password || !displayName) {
      setIsLoading(false);
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Password must be at least 6 characters');
    }

    // Store in localStorage for mock persistence
    const storedUsers = localStorage.getItem('neonstream_users') || '{}';
    const users = JSON.parse(storedUsers);
    
    if (users[email]) {
      setIsLoading(false);
      throw new Error('Email already in use');
    }

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password, // In production, never store plain passwords!
      displayName,
      isSubscribed: false,
    };

    users[email] = newUser;
    localStorage.setItem('neonstream_users', JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      displayName: newUser.displayName,
      isSubscribed: false,
    };
    
    persistUser(userData);
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    persistUser(null);
    setIsLoading(false);
  };

  const resetPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock - in production, this would send an email
    console.log('Password reset email sent to:', email);
  };

  const updateSubscription = (isSubscribed: boolean) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        isSubscribed,
        subscribedAt: isSubscribed ? Date.now() : undefined,
      };
      persistUser(updatedUser);

      // Update in users storage
      const storedUsers = localStorage.getItem('neonstream_users') || '{}';
      const users = JSON.parse(storedUsers);
      if (users[user.email]) {
        users[user.email].isSubscribed = isSubscribed;
        users[user.email].subscribedAt = isSubscribed ? Date.now() : undefined;
        localStorage.setItem('neonstream_users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isSubscribed: user?.isSubscribed || false,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
