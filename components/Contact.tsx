"use client";

import { useState } from "react";
import { Shader, ChromaFlow } from "shaders/react";
import Reveal from "./Reveal";
import RgbButton from "./RgbButton";
import { useTheme } from "@/app/theme-provider";
import { Mail } from "lucide-react";

const FOOTER_SHADER = {
  dark: { base: "#050a07", down: "#0f7a3f", left: "#39ff88", right: "#7c3aed", up: "#22d3ee" },
  light: { base: "#f3f8f4", down: "#0a7d44", left: "#0ea95c", right: "#7c3aed", up: "#22d3ee" },
};

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.06-.02-2.08-3.34.75-4.04-1.66-4.04-1.66-.55-1.43-1.34-1.82-1.34-1.82-1.09-.77.08-.75.08-.75 1.21.09 1.85 1.28 1.85 1.28 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.37-5.47-6.1 0-1.35.47-2.45 1.24-3.31-.12-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.27a11.3 11.3 0 0 1 6 0c2.29-1.6 3.3-1.27 3.3-1.27.66 1.71.24 2.97.12 3.28.77.86 1.24 1.96 1.24 3.31 0 4.74-2.81 5.79-5.49 6.09.43.38.81 1.13.81 2.28 0 1.65-.02 2.98-.02 3.38 0 .33.22.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const { theme } = useTheme();
  const ft = FOOTER_SHADER[theme];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Hook this up to your backend/email service of choice (e.g. Resend, Formspree).
    setStatus("sent");
  }

  return (
    <section id="contact" className="mx-auto w-[92%] max-w-3xl py-16">
      <Reveal>
        <div className="glass relative overflow-hidden p-8 md:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, var(--green-glow-soft), transparent 60%)",
            }}
          />
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <span className="mono-tag">{"// let's build something"}</span>
              <h2 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
                Got a project in mind?
              </h2>
              <p className="mt-4 max-w-sm text-dim">
                I&apos;d love to hear about it. Send a message or book a call
                — I usually reply within a day.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <RgbButton href="mailto:hey@zaohar.dev">Book a call</RgbButton>
                <RgbButton href="mailto:hey@zaohar.dev" ghost arrow={false}>
                  <Mail size={16} /> Email me
                </RgbButton>
              </div>
            </div>

            {status === "sent" ? (
              <div className="glass-panel flex flex-col items-center justify-center gap-2 p-8 text-center">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "var(--green-glow-soft)" }}
                >
                  <Mail size={18} color="var(--green)" />
                </span>
                <p className="font-medium">Message sent</p>
                <p className="text-sm text-dim">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="glass-panel px-4 py-3 text-sm outline-none placeholder:text-faint"
                  style={{ color: "var(--text)" }}
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="glass-panel px-4 py-3 text-sm outline-none placeholder:text-faint"
                  style={{ color: "var(--text)" }}
                />
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project"
                  className="glass-panel resize-none px-4 py-3 text-sm outline-none placeholder:text-faint"
                  style={{ color: "var(--text)" }}
                />
                <RgbButton type="submit" size="sm" className="mt-1 self-start" arrow={false}>
                  Send message
                </RgbButton>
              </form>
            )}
          </div>
        </div>
      </Reveal>

      {/* big open-design-style name, shader glow behind it */}
      <Reveal delay={0.1}>
        <div className="relative mt-14 overflow-hidden rounded-[var(--radius-lg)]">
          <div className="absolute inset-0" aria-hidden="true">
            <Shader
              key={theme}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
            >
              <ChromaFlow
                baseColor={ft.base}
                downColor={ft.down}
                leftColor={ft.left}
                rightColor={ft.right}
                upColor={ft.up}
                momentum={22}
                radius={2.6}
              />
            </Shader>
          </div>
          <div className="relative flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-16 text-center sm:py-20">
            <span
              className="font-display text-[clamp(2.5rem,9vw,6rem)] font-bold leading-none tracking-tight"
              style={{ color: "var(--green)" }}
            >
              Muhammad
            </span>
            <span
              className="font-display text-[clamp(2.5rem,9vw,6rem)] font-bold leading-none tracking-tight"
              style={{ color: "var(--text)" }}
            >
              Zaohar
            </span>
            <span
              className="font-display text-[clamp(2.5rem,9vw,6rem)] font-bold leading-none tracking-tight"
              style={{ color: "#a78bfa" }}
            >
              Daud
            </span>
          </div>
        </div>
      </Reveal>

      <footer className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-faint md:flex-row">
        <span>© 2026 Muhammad Zaohar Daud. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="GitHub" className="transition-colors hover:text-[var(--green)]">
            <GithubIcon />
          </a>
          <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-[var(--green)]">
            <LinkedinIcon />
          </a>
          <a href="mailto:hello@zaohar.dev" aria-label="Email" className="transition-colors hover:text-[var(--green)]">
            <Mail size={17} />
          </a>
        </div>
      </footer>
    </section>
  );
}
