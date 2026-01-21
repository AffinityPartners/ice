import { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the Terms and Conditions page.
 * Provides SEO-optimized title, description, and OpenGraph data
 * for the terms of service legal page.
 */
export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Read ICE Tracer\'s terms and conditions to understand the rules and guidelines for using our emergency medical information service.',
  keywords: 'ICE Tracer terms of service, user agreement, service terms, legal terms, usage policy',
  openGraph: {
    title: 'ICE Tracer Terms and Conditions',
    description: 'Understand the terms and conditions for using ICE Tracer\'s emergency medical information service.',
    url: 'https://icetracer.com/terms-conditions',
    type: 'website',
  },
  alternates: {
    canonical: 'https://icetracer.com/terms-conditions',
  },
}

/**
 * Layout wrapper for the Terms and Conditions page that adds structured data.
 * Includes WebPage and Breadcrumb schemas for enhanced SEO.
 */
export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <WebPageJsonLd
        name="ICE Tracer Terms and Conditions"
        description="Read ICE Tracer's terms and conditions to understand the rules and guidelines for using our emergency medical information service."
        url="/terms-conditions"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Terms and Conditions', url: '/terms-conditions' },
        ]}
      />
    </>
  )
}
