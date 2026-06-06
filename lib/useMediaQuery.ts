"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media-query hook. Defaults to `false` and updates on mount.
 * Used to render the rich React Flow canvas only where there's room for it.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
