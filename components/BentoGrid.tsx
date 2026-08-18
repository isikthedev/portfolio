"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { Code2, Database, Server, Palette, MapPin } from "lucide-react";

const experience = [
  { role: "Freelance Full Stack Dev", time: "2024 – Present · Remote", active: true },
  { role: "WordPress Developer", time: "2022 – 2024 · Contract", active: false },
  { role: "Frontend Developer", time: "2021 – 2022 · Full time", active: false },
];

const stack = [
  { icon: Code2, label: "Next.js / React" },
  { icon: Server, label: "Node.js / PHP" },
  { icon: Database, label: "MySQL / MongoDB" },
  { icon: Palette, label: "Tailwind / Custom CSS" },
];

const projects = [
  { title: "Project One", tag: "SaaS Dashboard" },
  { title: "Project Two", tag: "WordPress Build" },
];

const steps = [
  {
    label: "Discovery",
    title: "01 Discovery Call",
    desc: "We'll have a discovery call to discuss your goals, needs, and project requirements. This helps us align our vision and set the foundation for a successful collaboration.",
  },
  {
    label: "Plan",
    title: "02 Scope & Plan",
    desc: "I break the work into a clear roadmap — stack decisions, timeline, and milestones so there are no surprises later.",
  },
  {
    label: "Build",
    title: "03 Build",
    desc: "Hand-coded development with regular check-ins. No page builders, no bloated plugins — just clean, purpose-built code.",
  },
  {
    label: "Review",
    title: "04 Review & Refine",
    desc: "We test together, fix edge cases, and polish every detail before anything goes live.",
  },
  {
    label: "Launch",
    title: "05 Launch & Support",
    desc: "Deployment, handover, and ongoing support afterward if you need it.",
  },
];

export default function BentoGrid() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  function goToStep(i: number) {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  }

  return (
    <section id="experience" className="mx-auto w-[92%] max-w-3xl pt-16 pb-24 sm:pt-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Experience timeline card */}
        <Reveal delay={0.02} className="sm:col-span-1">
          <div className="glass card-hover h-full p-5">
            <p className="mb-5 text-xs text-faint">My Experience</p>
            <ul className="space-y-4">
              {experience.map((exp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 flex flex-col items-center">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: exp.active ? "var(--green)" : "var(--text-faint)",
                        boxShadow: exp.active ? "0 0 10px var(--green-glow)" : "none",
                      }}
                    />
                    {i < experience.length - 1 && (
                      <span className="mt-1 h-8 w-px" style={{ background: "var(--border)" }} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight">{exp.role}</p>
                    <p className="text-xs text-faint">{exp.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Tech stack card */}
        <Reveal delay={0.08} className="sm:col-span-1">
          <div className="glass card-hover flex h-full flex-col p-5">
            <p className="mb-4 text-xs text-faint">My tech stack</p>
            <div className="flex flex-1 flex-col justify-center gap-2.5">
              {stack.map((s, i) => (
                <div key={i} className="glass-panel flex items-center gap-2.5 px-3 py-2.5">
                  <s.icon size={14} color="var(--green)" />
                  <span className="text-xs">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Projects preview card */}
        <Reveal delay={0.14} className="sm:col-span-1">
          <a href="#work" className="glass card-hover flex h-full flex-col p-5">
            <p className="mb-1 text-xs text-faint">What I&apos;m building</p>
            <div className="relative mt-3 flex flex-1 items-end justify-center gap-2 overflow-hidden">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="glass-panel flex h-20 w-16 items-center justify-center text-center text-[10px] leading-tight text-dim"
                  style={{ transform: i === 0 ? "rotate(-6deg) translateY(4px)" : "rotate(5deg)" }}
                >
                  {p.tag}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm font-medium">Featured Projects</p>
            <p className="text-xs text-faint">View case studies</p>
          </a>
        </Reveal>

        {/* Map card */}
        <Reveal delay={0.02} className="sm:col-span-1">
          <div className="glass card-hover relative flex h-full min-h-[220px] flex-col overflow-hidden p-0">
            <span className="glass-panel absolute left-4 top-4 z-10 flex items-center gap-1.5 px-2.5 py-1 text-[11px]">
              <MapPin size={11} color="var(--green)" />
              Location
            </span>
            <iframe
              title="Map — Bhitarbanda, Nageshwari, Kurigram, Bangladesh"
              src="https://maps.google.com/maps?q=Bhitarbanda%2C%20Nageshwari%2C%20Kurigram%2C%20Bangladesh&z=11&output=embed"
              className="h-full min-h-[220px] w-full flex-1 grayscale"
              style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--surface) 0%, transparent 35%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="font-display text-sm font-medium tracking-[0.08em]">
                BHITARBANDA, NAGESHWARI
              </p>
              <p className="text-[10px] tracking-[0.2em] text-faint">
                KURIGRAM, BANGLADESH
              </p>
            </div>
          </div>
        </Reveal>

        {/* Process card — wide */}
        <Reveal delay={0.08} className="sm:col-span-2">
          <div id="process" className="glass card-hover h-full scroll-mt-24 overflow-hidden p-5 sm:p-6">
            <p className="mb-4 text-xs text-faint">How I work</p>
            <div className="relative min-h-[74px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-medium">{steps[active].title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-dim">
                    {steps[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-5 flex flex-wrap gap-2">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className="glass-panel relative px-3.5 py-1.5 text-xs transition-colors"
                  style={{ color: active === i ? "var(--bg)" : "var(--text-dim)" }}
                >
                  {active === i && (
                    <motion.span
                      layoutId="step-pill-bento"
                      className="absolute inset-0 rounded-[var(--radius-sm)]"
                      style={{ background: "var(--green)" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative z-10">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
