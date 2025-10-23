import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'cyber-green',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const themes = {
  'cyber-green': {
    primary: '#64ffda',
    secondary: '#4db8ff',
    bg: '#000000',
    text: '#ffffff',
    accent: 'rgba(100, 255, 218, 0.1)',
  },
  'neon-purple': {
    primary: '#a855f7',
    secondary: '#ec4899',
    bg: '#0f0a1e',
    text: '#ffffff',
    accent: 'rgba(168, 85, 247, 0.1)',
  },
  'sunset-orange': {
    primary: '#f97316',
    secondary: '#fb923c',
    bg: '#1a0f00',
    text: '#ffffff',
    accent: 'rgba(249, 115, 22, 0.1)',
  },
  'ocean-blue': {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    bg: '#001220',
    text: '#ffffff',
    accent: 'rgba(14, 165, 233, 0.1)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('sunset-orange');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'sunset-orange';
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
