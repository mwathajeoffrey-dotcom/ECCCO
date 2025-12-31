import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import PWAInstallPrompt from "@/components/ui/PWAInstallPrompt";
import AppLayout from "@/components/layout/AppLayout";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://eccco.app'),
  title: {
    default: "ECCCO - Emergency & Critical Care Comprehensive Online",
    template: "%s | ECCCO"
  },
  description: "Master critical care medicine with evidence-based learning. Access 5,000+ exam questions, 170M+ research articles, and 1,500+ clinical guidelines for ACLS, PALS, ATLS, and more.",
  manifest: "/manifest.json",
  keywords: [
    "emergency medicine",
    "critical care",
    "medical education",
    "online exam",
    "ECCCO",
    "medical training",
    "healthcare",
    "ACLS",
    "PALS",
    "ATLS",
    "evidence-based medicine",
    "clinical guidelines",
    "PubMed",
    "medical research",
    "physician training",
    "nurse training",
    "paramedic training"
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
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://eccco.app',
    siteName: 'ECCCO',
    title: 'ECCCO - Evidence-Based Critical Care Education',
    description: 'Master critical care medicine with evidence-based learning. Access 5,000+ exam questions, 170M+ research articles, and 1,500+ clinical guidelines.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ECCCO - Evidence-Based Critical Care Education',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'ECCCO - Evidence-Based Critical Care Education',
    description: 'Master critical care medicine with evidence-based learning. Access 5,000+ exam questions, 170M+ research articles, and 1,500+ clinical guidelines.',
    images: ['/og-image.png'],
    creator: '@eccco_app', // Update with your actual Twitter handle
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/icons/icon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
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
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'ECCCO',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://eccco.app',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eccco.app'}/logo.png`,
    description: 'Evidence-based critical care and emergency medicine education platform',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [
      // Add your social media links here when available
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://eccco.app'}/evidence-search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#3B82F6" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="ECCCO Medical" />
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorY: 'none' } as React.CSSProperties}
        >
          <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
            <AppLayout>
              {children}
            </AppLayout>
          </ErrorBoundary>
          <PWAInstallPrompt />
        </body>
      </html>
    </ClerkProvider>
  );
}
