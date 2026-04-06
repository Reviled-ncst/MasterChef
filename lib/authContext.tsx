'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { User } from './auth';

type AuthContextType = {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('mc:auth_user');
      if (stored) {
        const user = JSON.parse(stored) as User;
        setCurrentUser(user);
      }
    } catch (err) {
      // Silently fail if localStorage is corrupted
      localStorage.removeItem('mc:auth_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mc:auth_user', JSON.stringify(user));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mc:auth_user');
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
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
