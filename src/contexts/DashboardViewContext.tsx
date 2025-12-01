"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type DashboardView = "compact" | "detailed";

type DashboardViewContextValue = {
  view: DashboardView;
  setView: (view: DashboardView) => void;
};

const DashboardViewContext = createContext<DashboardViewContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "dashboardViewPreference";

export function DashboardViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<DashboardView>("detailed");

  // Load initial value from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "compact" || stored === "detailed") {
        setViewState(stored);
      }
    } catch {
      // ignore storage errors and keep default
    }
  }, []);

  const setView = (next: DashboardView) => {
    setViewState(next);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      // ignore storage errors
    }
  };

  return (
    <DashboardViewContext.Provider value={{ view, setView }}>
      {children}
    </DashboardViewContext.Provider>
  );
}

export function useDashboardView(): DashboardViewContextValue {
  const ctx = useContext(DashboardViewContext);
  if (!ctx) {
    throw new Error(
      "useDashboardView must be used within a DashboardViewProvider"
    );
  }
  return ctx;
}


