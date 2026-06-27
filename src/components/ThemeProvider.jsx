import { useEffect, useMemo, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeContext } from "./theme-context";

const STORAGE_KEY = "portfolio-theme";

const getSystemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    return storedTheme === "dark" || storedTheme === "light"
      ? storedTheme
      : "light";
  });
  const [systemTheme, setSystemTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return getSystemTheme();
  });

  useEffect(() => {
    const resolved = theme === "system" ? systemTheme : theme;
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.style.colorScheme = resolved;

    if (theme === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (theme !== "system" || !media) return undefined;

    const onChange = () => setSystemTheme(getSystemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme, systemTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme: theme === "system" ? systemTheme : theme,
    }),
    [systemTheme, theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
    </ThemeContext.Provider>
  );
};
