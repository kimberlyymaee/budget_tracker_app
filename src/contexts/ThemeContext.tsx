"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

// Helper to get theme from localStorage safely
const getThemeFromStorage = (): Theme => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      return savedTheme;
    }
  }
  return "light";
};

// Default context value for SSR safety
const defaultContextValue: ThemeContextType = {
  theme: "light",
  effectiveTheme: "light",
  setTheme: (newTheme: Theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from localStorage synchronously to prevent flash
  const getInitialTheme = (): Theme => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        return savedTheme;
      }
    }
    return "light";
  };

  // Calculate initial effective theme for SSR safety
  const getInitialEffectiveTheme = (themeValue: Theme): "light" | "dark" => {
    if (typeof window !== "undefined") {
      if (themeValue === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      return themeValue === "dark" ? "dark" : "light";
    }
    return "light";
  };

  const initialTheme = getInitialTheme();
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(getInitialEffectiveTheme(initialTheme));
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate effective theme based on system preference
  useEffect(() => {
    const calculateEffectiveTheme = (): "light" | "dark" => {
      if (theme === "system" && typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      return theme === "dark" ? "dark" : "light";
    };

    const calculatedTheme = calculateEffectiveTheme();
    setEffectiveTheme(calculatedTheme);

    // Apply theme immediately to prevent flash
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (calculatedTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    // Listen for system theme changes
    if (theme === "system" && typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const newTheme = mediaQuery.matches ? "dark" : "light";
        setEffectiveTheme(newTheme);
        if (typeof document !== "undefined") {
          const root = document.documentElement;
          if (newTheme === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Apply theme changes after mount
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (effectiveTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [effectiveTheme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Context will always have a value (either from provider or default)
  // This way the hook never throws and works even during SSR
  return context;
}

