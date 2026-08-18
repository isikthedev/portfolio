"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function RgbButton({
  children,
  href,
  onClick,
  ghost = false,
  className = "",
  arrow = true,
  type,
  size = "md",
  id,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  ghost?: boolean;
  className?: string;
  arrow?: boolean;
  type?: "submit" | "button";
  size?: "sm" | "md";
  id?: string;
}) {
  const Comp = href ? "a" : "button";

  return (
    <motion.div
      id={id}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      initial="rest"
      animate="rest"
      className={`btn-rgb group ${ghost ? "btn-rgb-ghost" : ""} ${className}`}
      variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
    >
      <Comp
        href={href}
        onClick={onClick}
        type={!href ? type ?? "button" : undefined}
        className={`btn-rgb-inner ${size === "sm" ? "btn-rgb-inner--sm text-sm" : "text-sm md:text-[15px]"}`}
      >
        {children}
        {arrow && (
          <motion.span
            className="inline-flex"
            variants={{ rest: { rotate: 0 }, hover: { rotate: 360 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArrowUpRight size={16} />
          </motion.span>
        )}
      </Comp>
    </motion.div>
  );
}
