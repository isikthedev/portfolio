"use client";

import { Shader, Swirl, FilmGrain } from "shaders/react";
import { useTheme } from "@/app/theme-provider";

// Deliberately minimal: one soft swirl + a touch of grain, but with enough
// contrast against the page background to actually read as texture/depth
// instead of just looking like flat black/white.
const THEMES = {
  dark: { a: "#070b09", b: "#14351f" },
  light: { a: "#f6faf7", b: "#d9efe0" },
};

export default function BodyShaderBackground() {
  const { theme } = useTheme();
  const t = THEMES[theme];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Shader
        key={theme}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <Swirl colorA={t.a} colorB={t.b} detail={1.3} speed={0.09} />
        <FilmGrain strength={0.045} />
      </Shader>
    </div>
  );
}
