import { logger } from '@/lib/logger';
// Auto-reload on chunk load errors
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    // Check if it's a chunk load error
    if (
      event.message?.includes("Failed to fetch") ||
      event.message?.includes("ChunkLoadError") ||
      event.message?.includes("Loading chunk")
    ) {
      logger.warn("Chunk load error detected - reloading page to get latest version...");
      // Wait a bit to avoid reload loop
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  });
}

export {};
