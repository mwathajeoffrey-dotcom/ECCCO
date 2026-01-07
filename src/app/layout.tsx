import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import AppLayout from "@/components/layout/AppLayout";
import FloatingPracticeButton from "@/components/practice/FloatingPracticeButton";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECCCO - Emergency & Critical Care Comprehensive Online",
  description:
    "Comprehensive medical exam platform for emergency and critical care training with 5000+ evidence-based questions",
  manifest: "/manifest.json",
  keywords: [
    "emergency medicine",
    "critical care",
    "medical education",
    "online exam",
    "ECCCO",
    "medical training",
    "healthcare",
  ],
  authors: [{ name: "ECCCO Medical Team" }],
  creator: "ECCCO",
  publisher: "ECCCO Medical Education",
  applicationName: "ECCCO Medical Training",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/icons/icon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ECCCO Medical",
    startupImage: [
      { url: "/icons/icon-512x512.svg", media: "(device-width: 320px) and (device-height: 568px)" },
      { url: "/icons/icon-512x512.svg", media: "(device-width: 375px) and (device-height: 667px)" },
      { url: "/icons/icon-512x512.svg", media: "(device-width: 414px) and (device-height: 736px)" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "ECCCO Medical",
    "application-name": "ECCCO Medical Training",
    "msapplication-TileColor": "#3B82F6",
    "msapplication-TileImage": "/icons/icon-192x192.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a202c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ECCCO Medical" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="chunk-error-handler" strategy="beforeInteractive">
          {`
            window.addEventListener('error', (event) => {
              if (
                event.message?.includes('Failed to fetch') ||
                event.message?.includes('ChunkLoadError') ||
                event.message?.includes('Loading chunk') ||
                event.message?.includes('Failed to load chunk')
              ) {
                console.warn('Chunk load error detected - reloading to get latest version...');
                setTimeout(() => window.location.reload(), 100);
              }
            });
          `}
        </Script>
        <ClerkProvider>
          <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
            <AppLayout>{children}</AppLayout>
          </ErrorBoundary>
          <PWAInstallPrompt />
          <FloatingPracticeButton />
        </ClerkProvider>
      </body>
    </html>
  );
}
