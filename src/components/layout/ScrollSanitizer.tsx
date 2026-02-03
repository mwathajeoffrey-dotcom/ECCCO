"use client";

import { useEffect } from "react";

export default function ScrollSanitizer() {
  useEffect(() => {
    // More aggressive: force unlock any scroll locks and poll briefly to
    // clear overflow and hide overlays in case other code re-applies them.
    let cancelled = false;
    (async () => {
      try {
        if (typeof window === "undefined") return;

        // Force clear any ref-counted locks
        try {
          const mod = await import("@/lib/scrollLock");
          mod.forceUnlockAll();
        } catch (e) {
          // ignore
        }

        const selectors = [
          "#mobile-menu-drawer",
          ".sidebar-scroll-container",
          "[data-nav-drawer]",
          "[class*='-menu-drawer']",
          "[class*='sidebar']",
          ".removed-nav-drawer",
        ];

        const cleanupOnce = () => {
          try {
            const docEl = document.documentElement;
            const body = document.body;

            // Reset global scroll styles
            docEl.style.overflow = "auto";
            body.style.overflow = "auto";
            body.style.position = "";
            body.style.height = "";

            // Hide known overlay selectors
            selectors.forEach((sel) => {
              document.querySelectorAll(sel).forEach((el) => {
                try {
                  const h = el as HTMLElement;
                  h.style.pointerEvents = "none";
                  h.style.display = "none";
                } catch (_e) {}
              });
            });

            // Heuristic: hide any fixed/sticky child that covers most of viewport
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
                  if (coversWidth && coversHeight && z >= 0) {
                    if (el.id === "__next" || el.id === "next") return;
                    el.style.pointerEvents = "none";
                    el.style.display = "none";
                  }
                }
              } catch (_e) {
                // ignore
              }
            });
          } catch (_err) {
            // swallow - best effort
          }
        };

        // Run cleanup repeatedly for the first 3 seconds to catch re-applies
        const start = Date.now();
        const interval = window.setInterval(() => {
          if (cancelled) return;
          cleanupOnce();
          if (Date.now() - start > 3000) {
            window.clearInterval(interval);
          }
        }, 150);
        // run once immediately as well
        cleanupOnce();

        // Observe DOM mutations for a short period and run cleanup when new nodes are added
        const mo = new MutationObserver((mutations) => {
          if (cancelled) return;
          for (const m of mutations) {
            if (m.addedNodes && m.addedNodes.length) {
              cleanupOnce();
              break;
            }
          }
        });
        try {
          mo.observe(document.body, { childList: true, subtree: true });
        } catch (_err) {}
        // Stop observing after 5s
        const moTimeout = window.setTimeout(() => {
          try {
            mo.disconnect();
          } catch (_e) {}
        }, 5000);

        // Also run cleanup when page becomes visible or window regains focus
        const onVisibility = () => cleanupOnce();
        const onFocus = () => cleanupOnce();
        window.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("focus", onFocus);

        // Cleanup listeners when effect ends
        const finalCleanup = () => {
          try {
            mo.disconnect();
          } catch (_e) {}
          try {
            window.clearTimeout(moTimeout);
          } catch (_e) {}
          window.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("focus", onFocus);
        };

        // Ensure final cleanup after the polling period
        window.setTimeout(finalCleanup, 6000);

        // end
      } catch (err) {
        console.warn("ScrollSanitizer failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
