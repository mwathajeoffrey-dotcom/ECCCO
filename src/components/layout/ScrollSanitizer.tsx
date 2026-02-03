"use client";

import { useEffect } from "react";

export default function ScrollSanitizer() {
  useEffect(() => {
    // Reset any body-level overflow/position that may have been left set
    try {
      if (typeof document !== "undefined") {
        const docEl = document.documentElement;
        const body = document.body;

        // Reset global scroll/touch styles
        docEl.style.overflow = "auto";
        docEl.style.touchAction = "";
        body.style.overflow = "auto";
        body.style.position = "";
        body.style.height = "";
        body.style.touchAction = "";

        // Remove known overlay elements that may block scrolling
        const selectors = [
          "#mobile-menu-drawer",
          ".sidebar-scroll-container",
          "[data-nav-drawer]",
          "[class*='-menu-drawer']",
          "[class*='sidebar']",
          ".removed-nav-drawer",
        ];

        selectors.forEach((sel) => {
          document.querySelectorAll(sel).forEach((el) => {
            if (el && el.parentNode) {
              (el as HTMLElement).style.pointerEvents = "none";
              (el as HTMLElement).style.display = "none";
            }
          });
        });

        // Heuristic: hide any fixed/sticky element that covers most of the viewport
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        Array.from(document.body.children).forEach((child) => {
          try {
            const el = child as HTMLElement;
            const cs = window.getComputedStyle(el);
            if (cs.position === "fixed" || cs.position === "sticky") {
              const rect = el.getBoundingClientRect();
              const coversWidth = rect.width >= vw * 0.5 || (rect.left <= 0 && rect.right >= vw * 0.5);
              const coversHeight = rect.height >= vh * 0.5 || (rect.top <= 0 && rect.bottom >= vh * 0.5);
              const z = parseInt(cs.zIndex || "0", 10) || 0;
              if ((coversWidth && coversHeight) && z >= 0) {
                // avoid hiding root containers (next root) by skipping known ids
                if (el.id === "__next" || el.id === "next") return;
                el.style.pointerEvents = "none";
                el.style.display = "none";
              }
            }
          } catch (_err) {
            // ignore per-element errors
          }
        });
      }
    } catch (err) {
      // swallow errors - this is best-effort hygiene
      console.warn("ScrollSanitizer failed:", err);
    }
  }, []);

  return null;
}
