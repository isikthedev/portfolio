"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  words,
  typingSpeed = 130,
  deletingSpeed = 75,
  pause = 1800,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => i + 1);
      }, typingSpeed);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className="inline-flex items-center">
      {text}
      <span className="tw-cursor h-[1em]" />
    </span>
  );
}
