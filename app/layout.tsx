import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import BodyShaderBackground from "@/components/BodyShaderBackground";

export const metadata: Metadata = {
  title: "Muhammad Zaohar Daud — Full Stack & WordPress Developer",
  description:
    "Full stack developer and WordPress developer specializing in custom coding and customization — no pre-built themes or plugins.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <BodyShaderBackground />
          <div className="grain" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
