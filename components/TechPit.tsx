"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import Reveal from "./Reveal";
import { TECH_ICONS } from "./tech-icons";

const TILE = 64;
// how bouncy the tiles are off walls/floor/each other — high = "football kick" rebound
const RESTITUTION = 0.72;

type TileState = { x: number; y: number; angle: number };

export default function TechPit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [tiles, setTiles] = useState<TileState[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    let cancelled = false;
    let runner: Matter.Runner | null = null;
    let engine: Matter.Engine | null = null;
    let io: IntersectionObserver | null = null;

    function setup() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width < 10 || height < 10) return;

      engine = Matter.Engine.create();
      engine.gravity.y = 0.85;
      engineRef.current = engine;
      const { world } = engine;

      // walls are bouncy too, so tiles rebound off them like a kicked ball
      const wallOpts = { isStatic: true, restitution: RESTITUTION, render: { visible: false } };
      const floor = Matter.Bodies.rectangle(width / 2, height + 20, width * 2, 40, wallOpts);
      const leftWall = Matter.Bodies.rectangle(-20, height / 2, 40, height * 2, wallOpts);
      const rightWall = Matter.Bodies.rectangle(width + 20, height / 2, 40, height * 2, wallOpts);
      const ceiling = Matter.Bodies.rectangle(width / 2, -120, width * 2, 40, wallOpts);
      Matter.World.add(world, [floor, leftWall, rightWall, ceiling]);

      const tileBodies = TECH_ICONS.map((_, i) => {
        const col = i % 5;
        const startX = (width / 5) * col + width / 10 + (Math.random() * 20 - 10);
        const startY = -200 - i * 60;
        return Matter.Bodies.rectangle(startX, startY, TILE, TILE, {
          chamfer: { radius: 18 },
          restitution: RESTITUTION,
          friction: 0.12,
          frictionAir: 0.012,
          density: 0.0009,
          angle: Math.random() * 0.6 - 0.3,
        });
      });
      Matter.World.add(world, tileBodies);

      const mouse = Matter.Mouse.create(container);
      // Matter scales mouse coords for devicePixelRatio by default in some setups; keep 1:1 with CSS px
      mouse.pixelRatio = 1;
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        // low damping + decent stiffness = a quick drag-release launches the
        // tile with real velocity, like flicking/kicking it away
        constraint: { stiffness: 0.35, damping: 0.05, render: { visible: false } },
      });
      Matter.World.add(world, mouseConstraint);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      function tick() {
        if (cancelled) return;
        setTiles(
          tileBodies.map((b) => ({
            x: b.position.x - TILE / 2,
            y: b.position.y - TILE / 2,
            angle: b.angle,
          }))
        );
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
      setReady(true);
    }

    // only run the simulation while the section is in view
    io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        if (visible && !engine) {
          setup();
        } else if (!visible && runner && engine) {
          Matter.Runner.stop(runner);
        } else if (visible && runner) {
          Matter.Runner.run(runner, engine!);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(container);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      if (runner && engine) Matter.Runner.stop(runner);
      if (engine) {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
      engineRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <section className="mx-auto w-[92%] max-w-3xl py-10">
      {/* static sign — inspired by open-design.ai, never moves */}
      <Reveal delay={0}>
        <div className="mb-8 flex justify-center">
          <div
            className="tools-sign inline-flex select-none items-center px-7 py-4"
            style={{ transform: "rotate(-3deg)" }}
          >
            <span className="corner-dot" style={{ left: -4, top: -4 }} />
            <span className="corner-dot" style={{ right: -4, top: -4 }} />
            <span className="corner-dot" style={{ left: -4, bottom: -4 }} />
            <span className="corner-dot" style={{ right: -4, bottom: -4 }} />
            <span
              className="text-2xl sm:text-3xl"
              style={{ fontFamily: '"Permanent Marker", cursive', color: "var(--text)" }}
            >
              17+ tools I build with
            </span>
          </div>
        </div>
      </Reveal>

      {/* physics pit — only the tool logos tumble, bounce & get kicked around here */}
      <Reveal delay={0.1}>
        <div
          ref={containerRef}
          className="relative h-[320px] w-full overflow-hidden sm:h-[280px]"
          style={{ touchAction: "none" }}
        >
          {reducedMotion ? (
            <div className="grid h-full grid-cols-5 place-items-center gap-3 p-6">
              {TECH_ICONS.map((icon) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={icon.name}
                  src={`/tools/${icon.file}`}
                  alt={icon.name}
                  title={icon.name}
                  width={TILE}
                  height={TILE}
                  draggable={false}
                />
              ))}
            </div>
          ) : (
            TECH_ICONS.map((icon, i) => {
              const t = tiles[i];
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={icon.name}
                  src={`/tools/${icon.file}`}
                  alt={icon.name}
                  title={icon.name}
                  draggable={false}
                  className="absolute cursor-grab select-none active:cursor-grabbing"
                  style={{
                    width: TILE,
                    height: TILE,
                    opacity: ready && t ? 1 : 0,
                    transform: t
                      ? `translate(${t.x}px, ${t.y}px) rotate(${t.angle}rad)`
                      : undefined,
                    transition: "opacity 0.3s ease",
                  }}
                />
              );
            })
          )}
        </div>
      </Reveal>
    </section>
  );
}
