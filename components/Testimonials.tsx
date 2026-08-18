"use client";

import Reveal from "./Reveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Placeholder — swap in a real client quote about the project outcome and what it was like working together.",
    name: "Client Name",
    role: "Founder, Company",
  },
  {
    quote:
      "Placeholder — swap in a real client quote about the project outcome and what it was like working together.",
    name: "Client Name",
    role: "Product Lead, Company",
  },
  {
    quote:
      "Placeholder — swap in a real client quote about the project outcome and what it was like working together.",
    name: "Client Name",
    role: "CTO, Company",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto w-[92%] max-w-3xl py-16">
      <Reveal>
        <span className="mono-tag">{"// feedback"}</span>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">
          What clients say
        </h2>
        <p className="mt-2 max-w-md text-dim">
          Placeholders for now — real testimonials going here soon.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="glass card-hover flex h-full flex-col p-6">
              <Quote size={20} color="var(--green)" className="mb-4 opacity-70" />
              <p className="flex-1 text-sm leading-relaxed text-dim">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="h-9 w-9 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, var(--green-dim), var(--surface-2))",
                    border: "1px solid var(--border-strong)",
                  }}
                />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-faint">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
