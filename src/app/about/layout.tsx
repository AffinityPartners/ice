import { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the About page.
 * Provides SEO-optimized title, description, and OpenGraph data
 * for the company information page.
 */
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ICE Tracer, the emergency medical information system that helps first responders and healthcare providers access critical patient information instantly.',
  keywords: 'about ICE Tracer, emergency medical information, company information, healthcare technology, first responder tools',
  openGraph: {
    title: 'About ICE Tracer',
    description: 'Learn about ICE Tracer, the emergency medical information system that helps first responders access critical patient information.',
    url: 'https://icetracer.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://icetracer.com/about',
  },
}

/**
 * Layout wrapper for the About page that adds structured data.
 * Includes WebPage and Breadcrumb schemas for enhanced SEO.
 */
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <WebPageJsonLd
        name="About ICE Tracer"
        description="Learn about ICE Tracer, the emergency medical information system that helps first responders and healthcare providers access critical patient information instantly."
        url="/about"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />
    </>
  )
}
