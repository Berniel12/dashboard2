"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    document.documentElement.classList.add('transition-theme', 'duration-250', 'ease-theme');
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.classList.add('transition-theme', 'duration-250', 'ease-theme');
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.classList.remove('transition-theme', 'duration-250', 'ease-theme');
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      <div className={`${isTransitioning ? 'transition-theme duration-250 ease-theme' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 