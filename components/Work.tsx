"use client";

import Reveal from "./Reveal";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Project One",
    tag: "Full Stack · SaaS",
    desc: "Placeholder description — swap with your real project summary.",
  },
  {
    title: "Project Two",
    tag: "WordPress · Custom Theme-less Build",
    desc: "Placeholder description — swap with your real project summary.",
  },
  {
    title: "Project Three",
    tag: "Full Stack · Dashboard",
    desc: "Placeholder description — swap with your real project summary.",
  },
];

export default function Work() {
  return (
    <section id="work" className="mx-auto w-[92%] max-w-3xl py-16">
      <Reveal>
        <span className="mono-tag">{"// featured work"}</span>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">
          Selected projects
        </h2>
        <p className="mt-2 max-w-lg text-dim">
          Placeholders for now — real case studies going here soon.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <a
              href="#"
              className="glass card-hover group flex h-full flex-col justify-between p-6 md:p-7"
            >
              <div>
                <div
                  className="mb-6 flex h-28 items-center justify-center rounded-[var(--radius-md)]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--green-glow-soft), transparent)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span className="mono-tag opacity-60">preview</span>
                </div>
                <p className="mono-tag mb-1">{p.tag}</p>
                <h3 className="text-base font-medium">{p.title}</h3>
                <p className="mt-1.5 text-sm text-dim">{p.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-medium transition-transform group-hover:translate-x-1">
                View project <ArrowUpRight size={15} />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
