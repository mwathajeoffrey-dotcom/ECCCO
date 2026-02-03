"use client";

import { useEffect } from "react";

export default function TouchUnlocker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let attached = true;
    const handler = async (_ev: Event) => {
      try {
        const mod = await import("@/lib/scrollLock");
        mod.forceUnlockAll();
      } catch (_e) {
        // ignore
      }

      try {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      } catch (_e) {}

      // remove listener after first activation
      if (attached) {
        window.removeEventListener("touchstart", handler, { passive: true } as any);
        window.removeEventListener("pointerdown", handler as any);
        attached = false;
      }
    };

    // Listen for either pointer or touch start
    window.addEventListener("touchstart", handler as EventListener, { passive: true } as unknown as boolean);
    window.addEventListener("pointerdown", handler as EventListener);

    return () => {
      if (attached) {
        try {
          window.removeEventListener("touchstart", handler as EventListener);
        } catch (_e) {}
        try {
          window.removeEventListener("pointerdown", handler as EventListener);
        } catch (_e) {}
      }
    };
  }, []);

  return null;
}
