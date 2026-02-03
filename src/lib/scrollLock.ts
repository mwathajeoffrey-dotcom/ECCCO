// Ref-counted scroll lock utility to avoid leaking document/body style changes
// Use lockScroll() when a component needs to disable scroll, and unlockScroll()
// when it's no longer needed. Internally keeps a counter and restores previous
// inline styles only when the last locker releases.
let lockCount = 0;
let savedBodyOverflow: string | null = null;
let savedDocOverflow: string | null = null;

function isClient() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function lockScroll() {
  if (!isClient()) return;
  lockCount += 1;
  if (lockCount > 1) return; // already locked

  const body = document.body;
  const doc = document.documentElement;

  savedBodyOverflow = body.style.overflow ?? "";
  savedDocOverflow = doc.style.overflow ?? "";

  // Apply safe scroll lock for most browsers: only change overflow.
  doc.style.overflow = "hidden";
  body.style.overflow = "hidden";
}

export function unlockScroll() {
  if (!isClient()) return;
  if (lockCount <= 0) return;
  lockCount -= 1;
  if (lockCount > 0) return; // still locked by others

  const body = document.body;
  const doc = document.documentElement;

  // Restore previous inline styles (if any)
  if (savedDocOverflow !== null) {
    doc.style.overflow = savedDocOverflow;
  } else {
    doc.style.removeProperty("overflow");
  }

  if (savedBodyOverflow !== null) {
    body.style.overflow = savedBodyOverflow;
  } else {
    body.style.removeProperty("overflow");
  }

  // clear saved values
  savedBodyOverflow = null;
  savedDocOverflow = null;
}

export function forceUnlockAll() {
  // Use with care in emergency code paths to clear any locks
  if (!isClient()) return;
  lockCount = 0;
  const body = document.body;
  const doc = document.documentElement;
  doc.style.removeProperty("overflow");
  body.style.removeProperty("overflow");
  savedBodyOverflow = null;
  savedDocOverflow = null;
}
