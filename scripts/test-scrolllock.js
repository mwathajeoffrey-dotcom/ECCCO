// Quick smoke test for scrollLock functions to ensure they don't throw in non-DOM environments
(async () => {
  try {
    const mod = await import("../src/lib/scrollLock");
    console.log("scrollLock module loaded:", typeof mod.lockScroll === "function");
    // call lock/unlock safely
    try {
      mod.lockScroll();
      console.log("lockScroll() ok");
    } catch (e) {
      console.log("lockScroll threw", e);
    }
    try {
      mod.unlockScroll();
      console.log("unlockScroll() ok");
    } catch (e) {
      console.log("unlockScroll threw", e);
    }
    try {
      mod.forceUnlockAll();
      console.log("forceUnlockAll() ok");
    } catch (e) {
      console.log("forceUnlockAll threw", e);
    }
  } catch (err) {
    console.error("Failed to import scrollLock", err);
    process.exit(1);
  }
})();
