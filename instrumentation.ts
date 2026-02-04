// Validate environment variables first - this will throw if critical vars are missing
import "./src/lib/env";

export async function register() {
  // Instrumentation setup - Sentry removed
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.warn("[Instrumentation] Node.js runtime initialized");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    console.warn("[Instrumentation] Edge runtime initialized");
  }
}

export const onRequestError = (error: Error) => {
  console.error("[Request Error]", error);
};
