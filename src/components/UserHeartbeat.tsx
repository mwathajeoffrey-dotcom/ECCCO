"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

/**
 * Component that sends heartbeat pings to track online users
 * Place this in your root layout to track all authenticated users
 */
export function UserHeartbeat() {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    // Send initial heartbeat
    const sendHeartbeat = async () => {
      try {
        await fetch("/api/heartbeat", { method: "POST" });
      } catch (error) {
        // Silently fail - heartbeat is not critical
        console.debug("Heartbeat failed:", error);
      }
    };

    // Send heartbeat immediately
    sendHeartbeat();

    // Send heartbeat every 30 seconds
    const interval = setInterval(sendHeartbeat, 30000);

    return () => clearInterval(interval);
  }, [isSignedIn]);

  return null; // This component doesn't render anything
}
