"use client";

import { useState } from "react";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import Typewriter from "./Typewriter";
import ThemeToggle from "./ThemeToggle";
import RgbButton from "./RgbButton";
import MobileMenu from "./MobileMenu";
import HangingTerminal from "./HangingTerminal";
import { useTheme } from "@/app/theme-provider";
import { Code2 } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SHADER_THEMES = {
  dark: {
    swirlA: "#0a1410",
    swirlB: "#0d1c14",
    base: "#0a0f0d",
    down: "#0f7a3f",
    left: "#39ff88",
    right: "#1fae5c",
    up: "#7dffb0",
  },
  light: {
    swirlA: "#f4faf6",
    swirlB: "#e9f5ec",
    base: "#ffffff",
    down: "#0a7d44",
    left: "#0ea95c",
    right: "#3fcf82",
    up: "#7fe3ac",
  },
};

export default function ShaderHero() {
  const { theme } = useTheme();
  const [shaderReady, setShaderReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = SHADER_THEMES[theme];

  return (
    <main
      className="relative isolate flex min-h-dvh flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Shader background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Shader
          key={theme}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
          onReady={() => setShaderReady(true)}
        >
          <Swirl colorA={t.swirlA} colorB={t.swirlB} detail={1.7} />
          <ChromaFlow
            baseColor={t.base}
            downColor={t.down}
            leftColor={t.left}
            rightColor={t.right}
            upColor={t.up}
            momentum={30}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.4}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
        {/* static fallback gradient shown until/unless the shader is ready */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: shaderReady ? 0 : 1,
            background:
              "radial-gradient(circle at 30% 20%, var(--green-glow) 0%, transparent 55%), var(--bg)",
          }}
        />
      </div>

      {/* Header — pill-shaped floating nav (pattern from sophia.kitkitgo.com) */}
      <div
        className="reveal relative z-10 px-4 pt-5 sm:px-6 sm:pt-6"
        style={{ ["--reveal-delay" as string]: "0s" }}
      >
        <header className="liquid-glass mx-auto flex max-w-4xl items-center justify-between rounded-full px-3 py-2 sm:px-4">
          <a href="#" className="flex items-center gap-2 pl-1 text-base font-medium tracking-tight">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: "var(--green-glow-soft)" }}
            >
              <Code2 size={15} color="var(--green)" strokeWidth={2.2} />
            </span>
            zaohar<span style={{ color: "var(--green)" }}>.dev</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm sm:flex" style={{ color: "var(--text-dim)" }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-[var(--text)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <RgbButton id="hero-cta-button" href="#contact" className="hidden sm:inline-flex" arrow={false}>
              Start a project
            </RgbButton>
            <button
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="glass-panel flex h-10 w-10 items-center justify-center rounded-full sm:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </header>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />

      <HangingTerminal />

      {/* Headline row */}
      <section className="relative z-10 flex flex-1 flex-col justify-center gap-8 px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-16">
        <div className="max-w-4xl">
          <h1
            className="reveal font-medium tracking-tight text-balance"
            style={{ ["--reveal-delay" as string]: "0.15s" }}
          >
            <span className="flex flex-wrap items-center gap-2 text-[clamp(1.85rem,6.5vw,4.75rem)] leading-[1.06] sm:flex-nowrap sm:whitespace-nowrap sm:gap-3">
              Hi, I&apos;m
              <span
                className="inline-block h-9 w-9 shrink-0 overflow-hidden rounded-full align-middle sm:h-11 sm:w-11 lg:h-14 lg:w-14"
                style={{
                  background: "linear-gradient(135deg, var(--green-dim), var(--surface-2))",
                  border: "1px solid var(--border-strong)",
                }}
              >
                <svg viewBox="0 0 48 48" className="h-full w-full opacity-70">
                  <circle cx="24" cy="18" r="8" fill="var(--green)" opacity="0.5" />
                  <ellipse cx="24" cy="42" rx="16" ry="14" fill="var(--green)" opacity="0.35" />
                </svg>
              </span>
              <span className="font-display" style={{ color: "var(--green)" }}>
                <Typewriter words={["Muhammad", "Zaohar", "Daud"]} pause={1200} />
              </span>
            </span>
            <span className="mt-3 block text-[clamp(1.15rem,3.2vw,2.15rem)] leading-[1.25] font-normal">
              Full Stack &amp; WordPress
              <br />
              Dev —{" "}
              <em
                className="not-italic font-display"
                style={{ color: "var(--green)" }}
              >
                <Typewriter
                  words={["custom code only.", "no bloat, ever.", "clean & scalable."]}
                />
              </em>
            </span>
          </h1>

          <div
            className="reveal mt-5 flex flex-wrap items-center gap-4"
            style={{ ["--reveal-delay" as string]: "0.3s" }}
          >
            <RgbButton href="#contact">Book a call</RgbButton>
            <p className="max-w-xs text-xs sm:text-sm" style={{ color: "var(--text-dim)" }}>
              Feel free to explore my portfolio and reach out — I&apos;d love
              to connect!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
