import { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the Warranty and Refund page.
 * Provides SEO-optimized title, description, and OpenGraph data
 * for the warranty and refund policy page.
 */
export const metadata: Metadata = {
  title: 'Warranty and Refund Policy',
  description: 'Read ICE Tracer\'s warranty and refund policy to understand our commitment to customer satisfaction and product guarantees.',
  keywords: 'ICE Tracer warranty, refund policy, money back guarantee, customer satisfaction, return policy',
  openGraph: {
    title: 'ICE Tracer Warranty and Refund Policy',
    description: 'Understand ICE Tracer\'s warranty and refund policy for our emergency medical information products.',
    url: 'https://icetracer.com/warranty-refund',
    type: 'website',
  },
  alternates: {
    canonical: 'https://icetracer.com/warranty-refund',
  },
}

/**
 * Layout wrapper for the Warranty and Refund page that adds structured data.
 * Includes WebPage and Breadcrumb schemas for enhanced SEO.
 */
export default function WarrantyRefundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <WebPageJsonLd
        name="ICE Tracer Warranty and Refund Policy"
        description="Read ICE Tracer's warranty and refund policy to understand our commitment to customer satisfaction."
        url="/warranty-refund"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Warranty and Refund', url: '/warranty-refund' },
        ]}
      />
    </>
  )
}
