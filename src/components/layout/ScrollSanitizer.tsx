"use client";

import { useEffect } from "react";

export default function ScrollSanitizer() {
  useEffect(() => {
    // Reset any body-level overflow/position that may have been left set
    try {
      if (typeof document !== "undefined") {
        const body = document.body;
        body.style.overflow = "";
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
            // remove element to ensure it can't block pointer events
            if (el && el.parentNode) {
              (el as HTMLElement).style.pointerEvents = "none";
              (el as HTMLElement).style.display = "none";
              // do not remove from DOM to avoid side-effects, just hide
            }
          });
        });
      }
    } catch (err) {
      // swallow errors - this is best-effort hygiene
      console.warn("ScrollSanitizer failed:", err);
    }
  }, []);

  return null;
}
