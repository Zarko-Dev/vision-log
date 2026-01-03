"use client";

import { useState, useEffect } from "react";

export default function TypewriterSlogan() {
  const text = "Descomplique seu inventário ----------------- Sem dar um nó na cabeça";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // 50ms per character

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs sm:text-sm md:text-lg text-neutral-500 dark:text-purple-400 mt-4 mb-10 h-8 text-center whitespace-nowrap">
      {displayedText}
      <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-neutral-500 dark:bg-purple-400 align-middle"></span>
    </div>
  );
}
