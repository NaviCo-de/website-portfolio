"use client";

import { useEffect, useMemo, useState } from "react";

export type TypewriterOptions = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
};

export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetweenWords = 1300,
}: TypewriterOptions) {
  const safeWords = useMemo(() => (words.length > 0 ? words : ["Fullstack Engineer"]), [words]);
  const [wordIndex, setWordIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = safeWords[wordIndex % safeWords.length] || "";
    const isComplete = visibleText === currentWord;
    const isEmpty = visibleText.length === 0;
    const delay = isComplete && !isDeleting ? delayBetweenWords : isDeleting ? deletingSpeed : typingSpeed;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % safeWords.length);
        return;
      }

      setVisibleText((current) =>
        isDeleting ? current.slice(0, Math.max(0, current.length - 1)) : currentWord.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [delayBetweenWords, deletingSpeed, isDeleting, safeWords, typingSpeed, visibleText, wordIndex]);

  return visibleText;
}
