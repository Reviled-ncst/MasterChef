'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  currentRoute: string;
  visitedPages: Set<string>;
  startLoading: (route: string) => void;
  stopLoading: (route: string) => void;
  isPageCached: (route: string) => boolean;
  shouldShowSkeleton: (route: string) => boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('');
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());

  // Load visited pages from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('mc:visited_pages');
    if (stored) {
      try {
        const pages = JSON.parse(stored);
        setVisitedPages(new Set(pages));
      } catch (e) {
        // Handle parsing error silently
      }
    }
  }, []);

  // Persist visited pages to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('mc:visited_pages', JSON.stringify(Array.from(visitedPages)));
  }, [visitedPages]);

  const startLoading = (route: string) => {
    setIsLoading(true);
    setCurrentRoute(route);
  };

  const stopLoading = (route: string) => {
    // Mark page as visited when loading completes
    setVisitedPages(prev => new Set([...Array.from(prev), route]));
    setIsLoading(false);
  };

  const isPageCached = (route: string): boolean => {
    return visitedPages.has(route);
  };

  const shouldShowSkeleton = (route: string): boolean => {
    // Only show skeleton for routes that haven't been visited yet
    return !visitedPages.has(route);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        currentRoute,
        visitedPages,
        startLoading,
        stopLoading,
        isPageCached,
        shouldShowSkeleton,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
