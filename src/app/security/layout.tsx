import { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the Security page.
 * Provides SEO-optimized title, description, and OpenGraph data
 * for the security information page.
 */
export const metadata: Metadata = {
  title: 'Security',
  description: 'Learn about ICE Tracer\'s security measures, data encryption, and how we protect your sensitive medical information from unauthorized access.',
  keywords: 'ICE Tracer security, data encryption, medical data protection, secure health information, cybersecurity, HIPAA',
  openGraph: {
    title: 'ICE Tracer Security',
    description: 'Learn how ICE Tracer protects your sensitive medical information with industry-leading security measures.',
    url: 'https://icetracer.com/security',
    type: 'website',
  },
  alternates: {
    canonical: 'https://icetracer.com/security',
  },
}

/**
 * Layout wrapper for the Security page that adds structured data.
 * Includes WebPage and Breadcrumb schemas for enhanced SEO.
 */
export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <WebPageJsonLd
        name="ICE Tracer Security"
        description="Learn about ICE Tracer's security measures, data encryption, and how we protect your sensitive medical information."
        url="/security"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Security', url: '/security' },
        ]}
      />
    </>
  )
}
