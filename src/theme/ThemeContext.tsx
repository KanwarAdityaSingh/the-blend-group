"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeTokens = {
  bg: string;
  fg: string;
  pink: string;
  lavender: string;
  accent: string;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
  glassBg: string;
  glassBorder: string;
  shadowGlow: string;
};

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  tokens: ThemeTokens;
  setMode: (mode: ThemeMode) => void;
  setCustomTokens: (overrides: Partial<ThemeTokens>) => void;
};

const defaultTokens: Record<ThemeMode, ThemeTokens> = {
  light: {
    bg: "#fffafd",
    fg: "#1a0f1f",
    pink: "#ff7bb9",
    lavender: "#b79cff",
    accent: "#e87ac5",
    gradientStart: "#ffd6ec",
    gradientMid: "#e7d9ff",
    gradientEnd: "#ffffff",
    glassBg: "rgba(255, 255, 255, 0.18)",
    glassBorder: "rgba(255, 255, 255, 0.35)",
    shadowGlow: "0 10px 50px rgba(232, 122, 197, 0.25)",
  },
  dark: {
    bg: "#0f0a12",
    fg: "#f5ecfa",
    pink: "#ff7bb9",
    lavender: "#b79cff",
    accent: "#b79cff",
    gradientStart: "#3a203f",
    gradientMid: "#2a1f49",
    gradientEnd: "#140c18",
    glassBg: "rgba(255, 255, 255, 0.08)",
    glassBorder: "rgba(255, 255, 255, 0.18)",
    shadowGlow: "0 10px 50px rgba(183, 156, 255, 0.25)",
  },
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTokensToRoot(tokens: ThemeTokens) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--bg", tokens.bg);
  root.style.setProperty("--fg", tokens.fg);
  root.style.setProperty("--pink-500", tokens.pink);
  root.style.setProperty("--lavender-500", tokens.lavender);
  root.style.setProperty("--accent", tokens.accent);
  root.style.setProperty("--gradient-start", tokens.gradientStart);
  root.style.setProperty("--gradient-mid", tokens.gradientMid);
  root.style.setProperty("--gradient-end", tokens.gradientEnd);
  root.style.setProperty("--glass-bg", tokens.glassBg);
  root.style.setProperty("--glass-border", tokens.glassBorder);
  root.style.setProperty("--shadow-glow", tokens.shadowGlow);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [overrides, setOverrides] = useState<Partial<ThemeTokens>>({});

  const tokens = useMemo<ThemeTokens>(() => ({
    ...defaultTokens[mode],
    ...overrides,
  }), [mode, overrides]);

  useEffect(() => {
    applyTokensToRoot(tokens);
  }, [tokens]);

  const value = useMemo<ThemeContextValue>(() => ({
    mode,
    tokens,
    setMode,
    setCustomTokens: setOverrides,
  }), [mode, tokens]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}


