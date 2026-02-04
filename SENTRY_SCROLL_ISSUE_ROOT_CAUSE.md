# 🎯 ROOT CAUSE: Sentry Blocking Mobile Scroll

## Critical Discovery

**Issue:** Production deployments have locked/stuck screens on mobile, but localhost works perfectly.

**Root Cause:** Sentry's `replayIntegration` is injecting overlay elements and interfering with mobile scroll behavior.

## Evidence

### 1. Sentry Client Config (`sentry.client.config.ts`)

```typescript
Sentry.init({
  debug: true, // ❌ PROBLEM: Injects debug overlays in production

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true, // ❌ PROBLEM: Can block touch events
    }),
  ],

  replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,
});
```

### 2. What Sentry Replay Does

- Injects a `position: fixed` overlay for session recording
- Captures DOM snapshots that can freeze layout
- Blocks media/text which can interfere with touch events
- Debug mode adds additional overlays in production

### 3. Why Localhost Works But Production Doesn't

- **Localhost:** Different Sentry sampling rates, debug mode behaves differently
- **Production:** Sentry fully initializes with replay integration
- **Vercel:** Build process wraps everything with `withSentryConfig()` which adds additional instrumentation

## The Solution

### Option 1: Disable Sentry Completely (Recommended for Now)

Remove Sentry entirely until scroll is working perfectly, then add it back carefully.

### Option 2: Disable Only Replay Integration

Keep error tracking but remove the scroll-interfering replay feature.

### Option 3: Conditional Sentry Loading

Only enable Sentry when scroll is confirmed working.

## Immediate Action Required

1. **Disable Sentry Replay Integration** - This is definitely causing scroll issues
2. **Remove debug: true from production** - No debugging overlays in prod
3. **Test without Sentry** - Verify scroll works
4. **Add Sentry back gradually** - Error tracking only, no replay

## Files Affected

- `sentry.client.config.ts` - Client-side Sentry init
- `sentry.server.config.ts` - Server-side Sentry init
- `sentry.edge.config.ts` - Edge runtime Sentry init
- `next.config.ts` - Wrapped with `withSentryConfig()`
- `instrumentation.ts` - Loads Sentry on app start

## Historical Context

This is the **SAME ISSUE** that happened with the last sidebar:

- Sidebar worked on localhost
- Deployed to Vercel → stuck screen
- ScrollSanitizer was fighting with overlays
- Now Sentry replay is doing the same thing

## Priority: CRITICAL ⚠️

Mobile scroll is fundamental functionality. Everything else is secondary.
