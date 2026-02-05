import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚀 CRITICAL: Generate unique build ID for each deployment to force complete cache busting
  generateBuildId: async () => {
    // Use timestamp + random string to ensure absolutely unique builds
    return `build-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  },

  async headers() {
    return [
      // Static assets - ALLOW caching with deployment ID
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // API routes - NO caching
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      // Pages and other routes - Security headers only, let Next.js handle caching
      {
        source: "/:path*",
        headers: [
          // Security Headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.accounts.dev https://*.clerk.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://www.gstatic.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.clerk.accounts.dev https://*.accounts.dev https://*.clerk.com https://clerk-telemetry.com wss://ws.pusherapp.com https://*.vercel.app https://*.vercel-analytics.com https://www.google.com https://www.recaptcha.net",
              "frame-src 'self' https://*.clerk.accounts.dev https://*.accounts.dev https://*.clerk.com https://www.google.com https://www.recaptcha.net https://recaptcha.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Compression
  compress: true,
  // Poweredby header removal
  poweredByHeader: false,
};

export default nextConfig;
