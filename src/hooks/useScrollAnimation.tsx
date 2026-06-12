"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollAnimation(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observerRef.current?.disconnect();
          }
        },
        { threshold },
      );

      observerRef.current.observe(node);
    },
    [threshold],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { ref, isVisible };
}
