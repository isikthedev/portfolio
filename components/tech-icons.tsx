export type IconDef = {
  name: string;
  file: string; // filename inside /public/tools
};

// These are pre-rendered 160x160 cards (rounded box + soft shadow + logo)
// exported from Canva — see /public/tools/*.svg. Keep this list and the
// "N+ tools I build with" sign text in TechPit.tsx in sync.
export const TECH_ICONS: IconDef[] = [
  { name: "React", file: "react.svg" },
  { name: "Next.js", file: "nextjs.svg" },
  { name: "Tailwind CSS", file: "tailwind.svg" },
  { name: "TypeScript", file: "typescript.svg" },
  { name: "Supabase", file: "supabase.svg" },
  { name: "PostgreSQL", file: "postgresql.svg" },
  { name: "WordPress", file: "wordpress.svg" },
  { name: "HTML5", file: "html5.svg" },
  { name: "PHP", file: "php.svg" },
  { name: "Framer", file: "framer.svg" },
  { name: "Elementor", file: "elementor.svg" },
  { name: "Python", file: "python.svg" },
  { name: "Google Antigravity", file: "antigravity.svg" },
  { name: "Divi", file: "divi.svg" },
  { name: "Laravel", file: "laravel.svg" },
  { name: "Shaders", file: "shaders.svg" },
  { name: "Claude", file: "claude.svg" },
];
