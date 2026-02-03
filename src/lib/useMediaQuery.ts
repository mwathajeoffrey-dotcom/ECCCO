import { useState, useEffect } from "react";

// Simple hook to subscribe to a media query and return whether it matches
export function useMediaQuery(query: string) {
  // initial state based on window (safe for SSR)
  const getInitial = () => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia(query).matches;
    } catch {
      return false;
    }
  };

  const [matches, setMatches] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    const handler = (ev: MediaQueryListEvent) => setMatches(ev.matches);
    // add listener
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler as EventListener);
    } else if (typeof mq.addListener === "function") {
      // legacy
      (mq as MediaQueryList).addListener(handler);
    }
    // cleanup
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handler as EventListener);
      } else if (typeof mq.removeListener === "function") {
        (mq as MediaQueryList).removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
