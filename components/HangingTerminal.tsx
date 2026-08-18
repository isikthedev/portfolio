"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const LINES = [
  { prompt: "$", text: "whoami", color: "var(--text-dim)" },
  { prompt: ">", text: "zaohar — full stack dev", color: "var(--green)" },
  { prompt: "$", text: "cat stack.json", color: "var(--text-dim)" },
  { prompt: ">", text: '["Next.js", "PHP", "WordPress"]', color: "var(--text)" },
  { prompt: "$", text: "npm run build", color: "var(--text-dim)" },
  { prompt: ">", text: "✓ compiled, 0 errors", color: "var(--green)" },
  { prompt: "$", text: "git commit -m \"ship it\"", color: "var(--text-dim)" },
  { prompt: ">", text: "✓ 1 file changed, 0 bugs", color: "var(--green)" },
  { prompt: "$", text: "curl status.zaohar.dev", color: "var(--text-dim)" },
  { prompt: ">", text: "200 OK — available for work", color: "var(--green)" },
];

const TERMINAL_W = 340;
const BASE_TOP = 190;
const BASE_RIGHT = 40;
const ROPE_SEGMENTS = 14;
const GRAVITY = 0.55;
const ROPE_DAMPING = 0.985;
const SLACK = 1.18; // >1 = thread sags at rest, like a real hanging cord

type Pt = { x: number; y: number; px: number; py: number };

export default function HangingTerminal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPolylineElement>(null);
  const buttonElRef = useRef<HTMLElement | null>(null);

  const [baseLeft, setBaseLeft] = useState<number | null>(null);

  // drag offset from the resting position — plain motion values, updated by
  // our own pointer handlers (no framer `drag` gesture involved at all)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(6);

  const draggingRef = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const ropeRef = useRef<Pt[] | null>(null);
  const ropeLenRef = useRef(0);

  // resolve the resting left position (from the right edge) once we know the
  // wrapper's width, and again on resize
  useEffect(() => {
    buttonElRef.current = document.getElementById("hero-cta-button");
    function measure() {
      if (!wrapRef.current) return;
      const w = wrapRef.current.getBoundingClientRect().width;
      setBaseLeft(w - BASE_RIGHT - TERMINAL_W);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // single rAF loop: spring the card back toward rest, then simulate the
  // rope every frame so it always visually connects the header button to
  // wherever the card currently is
  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    function step() {
      if (cancelled) return;

      // --- card spring-back physics (skipped while actively dragging) ---
      if (!draggingRef.current) {
        const k = 0.1;
        const damping = 0.86;
        const ax = -x.get() * k;
        const ay = -y.get() * k;
        velocity.current.x = (velocity.current.x + ax) * damping;
        velocity.current.y = (velocity.current.y + ay) * damping;
        x.set(x.get() + velocity.current.x);
        y.set(y.get() + velocity.current.y);
      }
      const tilt = Math.max(-16, Math.min(26, 6 + x.get() * 0.09 + velocity.current.x * 0.6));
      rotate.set(tilt);

      // --- rope simulation ---
      const wrap = wrapRef.current;
      const card = cardRef.current;
      const btn = buttonElRef.current;
      const path = svgPathRef.current;
      if (wrap && card && btn && path) {
        const wrapRect = wrap.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const anchor = {
          x: btnRect.left + btnRect.width / 2 - wrapRect.left,
          y: btnRect.bottom - wrapRect.top - 2,
        };
        const attach = {
          x: cardRect.left + cardRect.width / 2 - wrapRect.left,
          y: cardRect.top - wrapRect.top + 2,
        };

        let rope = ropeRef.current;
        if (!rope) {
          const restLen = Math.hypot(attach.x - anchor.x, attach.y - anchor.y) || 1;
          ropeLenRef.current = restLen * SLACK;
          rope = Array.from({ length: ROPE_SEGMENTS + 1 }, (_, i) => {
            const t = i / ROPE_SEGMENTS;
            const px = anchor.x + (attach.x - anchor.x) * t;
            const py = anchor.y + (attach.y - anchor.y) * t;
            return { x: px, y: py, px, py };
          });
          ropeRef.current = rope;
        }

        // verlet integrate free points
        for (let i = 1; i < rope.length - 1; i++) {
          const p = rope[i];
          const vx = (p.x - p.px) * ROPE_DAMPING;
          const vy = (p.y - p.py) * ROPE_DAMPING;
          p.px = p.x;
          p.py = p.y;
          p.x += vx;
          p.y += vy + GRAVITY;
        }
        // pin endpoints live
        rope[0].x = anchor.x;
        rope[0].y = anchor.y;
        rope[rope.length - 1].x = attach.x;
        rope[rope.length - 1].y = attach.y;

        // satisfy distance constraints
        const segLen = ropeLenRef.current / ROPE_SEGMENTS;
        for (let iter = 0; iter < 6; iter++) {
          for (let i = 0; i < rope.length - 1; i++) {
            const p1 = rope[i];
            const p2 = rope[i + 1];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy) || 0.0001;
            const diff = (dist - segLen) / dist;
            const offX = dx * 0.5 * diff;
            const offY = dy * 0.5 * diff;
            if (i !== 0) {
              p1.x += offX;
              p1.y += offY;
            }
            if (i + 1 !== rope.length - 1) {
              p2.x -= offX;
              p2.y -= offY;
            }
          }
          rope[0].x = anchor.x;
          rope[0].y = anchor.y;
          rope[rope.length - 1].x = attach.x;
          rope[rope.length - 1].y = attach.y;
        }

        path.setAttribute("points", rope.map((p) => `${p.x},${p.y}`).join(" "));
      }

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [rotate, x, y]);

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    draggingRef.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    velocity.current = { x: 0, y: 0 };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastPointer.current.t, 8);
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    x.set(x.get() + dx);
    y.set(y.get() + dy);
    velocity.current = { x: (dx / dt) * 16, y: (dy / dt) * 16 };
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  }

  function onPointerUp(e: React.PointerEvent) {
    draggingRef.current = false;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  }

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      aria-hidden="true"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <polyline
          ref={svgPathRef}
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      </svg>

      {baseLeft !== null && (
        <motion.div
          ref={cardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            position: "absolute",
            top: BASE_TOP,
            left: baseLeft,
            x,
            y,
            rotate,
            width: TERMINAL_W,
            touchAction: "none",
          }}
          className="liquid-glass pointer-events-auto cursor-grab select-none overflow-hidden rounded-[var(--radius-lg)] active:cursor-grabbing"
        >
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid var(--glass-border)" }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="space-y-2 px-4 py-4 font-mono text-[13px] leading-relaxed">
            {LINES.map((l, i) => (
              <p key={i} style={{ color: l.color }}>
                <span style={{ color: "var(--text-faint)" }}>{l.prompt} </span>
                {l.text}
              </p>
            ))}
            <p className="pt-1" style={{ color: "var(--text-faint)" }}>
              <span>$ </span>
              <span className="terminal-caret">▍</span>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
