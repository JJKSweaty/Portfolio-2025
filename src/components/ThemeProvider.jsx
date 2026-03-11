import React, { createContext, useContext, useEffect } from "react";

const FIXED_THEME = {
  key: "professional-dark",
  primary: "#8ca0b6",
  secondary: "#6f8094",
  bg: "#070b11",
  text: "#e8edf3",
  accent: "rgba(140, 160, 182, 0.08)",
};

const ThemeContext = createContext({
  theme: FIXED_THEME.key,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
export const themes = { [FIXED_THEME.key]: FIXED_THEME };

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return "140, 160, 182";
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const primaryRgb = hexToRgb(FIXED_THEME.primary);
    const secondaryRgb = hexToRgb(FIXED_THEME.secondary);

    document.documentElement.style.setProperty("--theme-primary", FIXED_THEME.primary);
    document.documentElement.style.setProperty("--theme-secondary", FIXED_THEME.secondary);
    document.documentElement.style.setProperty("--theme-bg", FIXED_THEME.bg);
    document.documentElement.style.setProperty("--theme-text", FIXED_THEME.text);
    document.documentElement.style.setProperty("--theme-accent", FIXED_THEME.accent);
    document.documentElement.style.setProperty("--theme-primary-muted", `rgba(${primaryRgb}, 0.28)`);
    document.documentElement.style.setProperty("--theme-border", `rgba(${primaryRgb}, 0.18)`);
    document.documentElement.style.setProperty("--theme-bg-card", `rgba(${primaryRgb}, 0.06)`);
    document.documentElement.style.setProperty("--theme-bg-card-hover", `rgba(${primaryRgb}, 0.11)`);
    document.documentElement.style.setProperty("--theme-glow", `rgba(${primaryRgb}, 0.22)`);
    document.documentElement.style.setProperty("--theme-secondary-muted", `rgba(${secondaryRgb}, 0.06)`);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: FIXED_THEME.key, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};
