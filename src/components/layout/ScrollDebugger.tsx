"use client";

import { useEffect, useState } from "react";

export default function ScrollDebugger() {
  const [enabled, setEnabled] = useState(false);
  const [bodyOverflow, setBodyOverflow] = useState<string | null>(null);
  const [docOverflow, setDocOverflow] = useState<string | null>(null);
  type OverlayInfo = { tag: string; id: string; class: string; z: string | number };
  const [overlays, setOverlays] = useState<OverlayInfo[]>([]);
  const [lastSetter, setLastSetter] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const show = new URLSearchParams(window.location.search).has("navDebug");
      setEnabled(show);
    } catch (_e) {
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const scan = async () => {
      if (typeof document === "undefined") return;
      try {
        const body = document.body;
        const doc = document.documentElement;
        const bOverflow = body.style.overflow || window.getComputedStyle(body).overflow;
        const dOverflow = doc.style.overflow || window.getComputedStyle(doc).overflow;
        setBodyOverflow(bOverflow);
        setDocOverflow(dOverflow);

        // If overflow is hidden, force unlock
        if (bOverflow === "hidden" || dOverflow === "hidden") {
          // capture a stack so we can see who set overflow
          try {
            const err = new Error("overflow:hidden detected");
            const stack = err.stack || String(err);
            setLastSetter(stack);
            // also expose to window for easy copy from mobile console
            try {
              (window as unknown as { __lastOverflowSetter?: string }).__lastOverflowSetter = stack;
            } catch (_e) {}
            console.warn("[ScrollDebugger] overflow:hidden detected on body/doc — captured stack:\n", stack);
          } catch (_e) {}
          try {
            const mod = await import("@/lib/scrollLock");
            mod.forceUnlockAll();
          } catch (_e) {}
          try {
            body.style.overflow = "";
            document.documentElement.style.overflow = "";
          } catch (_e) {}
        }

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const found: OverlayInfo[] = [];
        Array.from(document.body.querySelectorAll("*")).forEach((el) => {
          try {
            const cs = window.getComputedStyle(el as Element);
            if (cs.position === "fixed" || cs.position === "sticky") {
              const rect = (el as HTMLElement).getBoundingClientRect();
              const coversWidth = rect.width >= vw * 0.5 || (rect.left <= 0 && rect.right >= vw * 0.5);
              const coversHeight = rect.height >= vh * 0.5 || (rect.top <= 0 && rect.bottom >= vh * 0.5);
              if (coversWidth && coversHeight) {
                found.push({
                  tag: (el as HTMLElement).tagName,
                  id: (el as HTMLElement).id,
                  class: (el as HTMLElement).className,
                  z: cs.zIndex || "0",
                });
              }
            }
          } catch (_e) {}
        });
        setOverlays(found.slice(0, 5));
        if (!cancelled && (bOverflow === "hidden" || dOverflow === "hidden" || found.length)) {
          // also hide them to allow interaction
          found.forEach((f, _idx) => {
            try {
              const sel = f.id ? `#${f.id}` : f.class ? `.${f.class.split(" ").join(".")}` : f.tag;
              document.querySelectorAll(sel).forEach((el) => {
                try {
                  (el as HTMLElement).style.pointerEvents = "auto";
                  (el as HTMLElement).style.display = "none";
                } catch (_e) {}
              });
            } catch (_e) {}
          });
        }
      } catch (_err) {
        // ignore
      }
    };

    // initial scan and periodic scans
    scan();
    const iv = window.setInterval(scan, 400);

    // observe attribute changes on body/document
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        try {
          if (m.type === "attributes" && (m.attributeName === "style" || m.attributeName === "class")) {
            // if style changed on body/doc and overflow became hidden, capture stack
            const target = m.target as HTMLElement;
            if (target === document.body || target === document.documentElement) {
              const val = (target.getAttribute && target.getAttribute("style")) || "";
              if (val && /overflow\s*:\s*hidden/.test(val)) {
                const err = new Error("overflow set (mutation observer)");
                const stack = err.stack || String(err);
                setLastSetter(stack);
                try {
                  (window as unknown as { __lastOverflowSetter?: string }).__lastOverflowSetter = stack;
                } catch (_e) {}
                console.warn("[ScrollDebugger] mutation observed overflow:hidden — stack:\n", stack);
              }
            }
            scan();
            break;
          }
          if (m.addedNodes && m.addedNodes.length) {
            scan();
            break;
          }
        } catch (_e) {}
      }
    });
    try {
      obs.observe(document.body, { attributes: true, childList: true, subtree: true });
    } catch (_e) {}

    return () => {
      cancelled = true;
      window.clearInterval(iv);
      try {
        obs.disconnect();
      } catch (_e) {}
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 8,
        top: 8,
        zIndex: 999999,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "8px 10px",
        borderRadius: 8,
        fontSize: 12,
        fontFamily: "monospace",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Scroll Debug</div>
      <div>body overflow: {String(bodyOverflow)}</div>
      <div>doc overflow: {String(docOverflow)}</div>
      <div style={{ marginTop: 6 }}>Overlays:</div>
      {overlays.length ? (
        overlays.map((o, i) => (
          <div key={i} style={{ fontSize: 11 }}>{`${o.tag} id=${o.id || "-"} class=${o.class || "-"} z=${o.z}`}</div>
        ))
      ) : (
        <div style={{ fontSize: 11 }}>none</div>
      )}
      {lastSetter ? (
        <div
          style={{
            marginTop: 8,
            fontSize: 10,
            maxWidth: 260,
            whiteSpace: "pre-wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <div style={{ fontWeight: 600 }}>Last setter (truncated):</div>
          <div>{String(lastSetter).split("\n").slice(0, 5).join("\n")}</div>
        </div>
      ) : null}
    </div>
  );
}
