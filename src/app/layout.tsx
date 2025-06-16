import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

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
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className={lato.className}>
        <ErrorBoundary>
          <div className="min-h-screen bg-white">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
