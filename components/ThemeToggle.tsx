"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/theme-provider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="glass-panel relative flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
      style={{ borderColor: "var(--glass-border)" }}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={2} color="var(--green)" />
      ) : (
        <Moon size={17} strokeWidth={2} color="var(--green-dim)" />
      )}
    </button>
  );
}
