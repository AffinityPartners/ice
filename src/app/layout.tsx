import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ConditionalHeader } from "@/components/layout/ConditionalHeader";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { OfflineProvider } from "@/components/providers/OfflineProvider";
import { OrganizationJsonLd, WebSiteJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/JsonLd";

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: 'swap',
  variable: '--font-lato'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://icetracer.com'),
  title: {
    template: '%s | ICE Tracer',
    default: 'ICE Tracer - Emergency Medical Information System'
  },
  description: "ICE Tracer provides instant access to critical medical information during emergencies. Store and share your medical profile with first responders and healthcare providers.",
  keywords: "emergency medical information, ICE, medical profile, first responders, healthcare, emergency contacts, medical ID, emergency response",
  icons: {
    icon: '/images/Favicon-512x512-copy.png',
    shortcut: '/images/Favicon-512x512-copy.png',
    apple: '/images/Favicon-512x512-copy.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://icetracer.com',
    siteName: 'ICE Tracer',
    title: 'ICE Tracer - Emergency Medical Information System',
    description: 'Instant access to critical medical information during emergencies',
    images: [
      {
        url: '/images/ICE-Tracer-home-bg.png',
        width: 1200,
        height: 630,
        alt: 'ICE Tracer Emergency Medical Information System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICE Tracer - Emergency Medical Information System',
    description: 'Instant access to critical medical information during emergencies',
    images: ['/images/ICE-Tracer-home-bg.png'],
  },
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
};

/**
 * Root layout component that provides the base structure for all pages.
 * Implements mobile-first responsive design with consistent typography,
 * spacing, and layout patterns across the entire application.
 * 
 * Mobile Consistency Standards Applied:
 * - Responsive typography using Lato font with proper scaling
 * - Consistent spacing using standardized Tailwind breakpoints (sm:, md:, lg:, xl:)
 * - Mobile-first approach with progressive enhancement
 * - Standardized padding: px-4 sm:px-6 lg:px-8
 * - Responsive text sizes: text-sm sm:text-base lg:text-lg pattern
 * - Consistent button sizing and touch targets for mobile accessibility
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className={lato.className}>
        <SessionProvider>
          <OfflineProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-white">
                <ConditionalHeader />
                <main className="flex-1">{children}</main>
              </div>
            </ErrorBoundary>
          </OfflineProvider>
        </SessionProvider>
        {/* Vercel Analytics - tracks page views and visitor metrics */}
        <Analytics />
        {/* Structured Data (JSON-LD) for SEO - helps search engines understand the site */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SoftwareApplicationJsonLd />
      </body>
    </html>
  );
}
