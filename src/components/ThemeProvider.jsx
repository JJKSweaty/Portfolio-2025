import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'cyber-green',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const themes = {
  'arctic': {
    primary: '#94a3b8',
    secondary: '#60a5fa',
    bg: '#0a0a0f',
    text: '#f1f5f9',
    accent: 'rgba(148, 163, 184, 0.08)',
  },
  'lavender': {
    primary: '#a78bfa',
    secondary: '#c084fc',
    bg: '#0c0a14',
    text: '#f1f5f9',
    accent: 'rgba(167, 139, 250, 0.08)',
  },
  'ember': {
    primary: '#fb923c',
    secondary: '#f97316',
    bg: '#0f0a06',
    text: '#f1f5f9',
    accent: 'rgba(251, 146, 60, 0.08)',
  },
  'ocean': {
    primary: '#38bdf8',
    secondary: '#22d3ee',
    bg: '#060d14',
    text: '#f1f5f9',
    accent: 'rgba(56, 189, 248, 0.08)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('arctic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'arctic';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const colors = themes[theme];
    document.documentElement.style.setProperty('--theme-primary', colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', colors.secondary);
    document.documentElement.style.setProperty('--theme-bg', colors.bg);
    document.documentElement.style.setProperty('--theme-text', colors.text);
    document.documentElement.style.setProperty('--theme-accent', colors.accent);
    
    // Calculate additional theme variables based on primary color
    const primaryRgb = hexToRgb(colors.primary);
    document.documentElement.style.setProperty('--theme-primary-muted', `rgba(${primaryRgb}, 0.3)`);
    document.documentElement.style.setProperty('--theme-border', `rgba(${primaryRgb}, 0.2)`);
    document.documentElement.style.setProperty('--theme-bg-card', `rgba(${primaryRgb}, 0.1)`);
    document.documentElement.style.setProperty('--theme-bg-card-hover', `rgba(${primaryRgb}, 0.15)`);
    document.documentElement.style.setProperty('--theme-glow', `rgba(${primaryRgb}, 0.5)`);
    
    const secondaryRgb = hexToRgb(colors.secondary);
    document.documentElement.style.setProperty('--theme-secondary-muted', `rgba(${secondaryRgb}, 0.05)`);
    
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '100, 255, 218';
}
