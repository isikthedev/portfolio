"use client";

import { Shader, Swirl } from "shaders/react";
import { useTheme } from "@/app/theme-provider";

const THEMES = {
  dark: { a: "#0a1b12", b: "#123a24" },
  light: { a: "#eef8f1", b: "#dcefe1" },
};

export default function Footer() {
  const { theme } = useTheme();
  const t = THEMES[theme];

  return (
    <footer className="relative overflow-hidden border-t" style={{ borderColor: "var(--glass-border)" }}>
      {/* subtle shader glow behind the wordmark */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Shader
          key={theme}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        >
          <Swirl colorA={t.a} colorB={t.b} detail={1.2} speed={0.08} />
        </Shader>
      </div>

      <div className="relative mx-auto w-[92%] max-w-4xl py-16 text-center sm:py-24">
        <p
          className="mb-4 font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--text-faint)" }}
        >
          // thanks for scrolling this far
        </p>
        <h2 className="font-display font-bold leading-[0.95] tracking-tight text-[clamp(2.4rem,9vw,6rem)]">
          <span style={{ color: "#39ff88" }}>Muhammad</span>{" "}
          <span style={{ color: "#4fd1c5" }}>Zaohar</span>{" "}
          <span style={{ color: "#ffcf6b" }}>Daud</span>
        </h2>

        <div
          className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 border-t pt-8 text-sm sm:flex-row sm:justify-between"
          style={{ borderColor: "var(--glass-border)", color: "var(--text-dim)" }}
        >
          <span>© {new Date().getFullYear()} zaohar.dev</span>
          <a href="#contact" className="transition-colors hover:text-[var(--text)]">
            Let&apos;s build something →
          </a>
        </div>
      </div>
    </footer>
  );
}
