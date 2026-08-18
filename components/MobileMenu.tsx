"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col p-6"
          style={{ background: "var(--bg)" }}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between">
            <span className="mono-tag">menu</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-full"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <motion.nav
            initial="closed"
            animate="open"
            className="mt-16 flex flex-1 flex-col gap-2"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
                className="font-display border-b py-4 text-3xl font-medium tracking-tight"
                style={{ borderColor: "var(--border)" }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
