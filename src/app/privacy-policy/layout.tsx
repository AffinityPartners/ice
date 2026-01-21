import { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the Privacy Policy page.
 * Provides SEO-optimized title, description, and OpenGraph data
 * for the privacy policy legal page.
 */
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read ICE Tracer\'s privacy policy to understand how we collect, use, and protect your personal and medical information.',
  keywords: 'ICE Tracer privacy policy, data protection, medical information privacy, HIPAA compliance, personal data security',
  openGraph: {
    title: 'ICE Tracer Privacy Policy',
    description: 'Learn how ICE Tracer protects your personal and medical information.',
    url: 'https://icetracer.com/privacy-policy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://icetracer.com/privacy-policy',
  },
}

/**
 * Layout wrapper for the Privacy Policy page that adds structured data.
 * Includes WebPage and Breadcrumb schemas for enhanced SEO.
 */
export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <WebPageJsonLd
        name="ICE Tracer Privacy Policy"
        description="Read ICE Tracer's privacy policy to understand how we collect, use, and protect your personal and medical information."
        url="/privacy-policy"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy' },
        ]}
      />
    </>
  )
}
