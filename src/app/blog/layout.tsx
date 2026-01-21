import { Metadata } from 'next'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the Blog section.
 * Provides SEO-optimized title, description, and OpenGraph data
 * for the blog listing and serves as base metadata for articles.
 */
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles about emergency medical information, first responder tips, CPR guides, and healthcare technology from ICE Tracer.',
  keywords: 'emergency medical blog, first responder tips, CPR guide, healthcare articles, medical information, ICE Tracer blog',
  openGraph: {
    title: 'ICE Tracer Blog',
    description: 'Read the latest articles about emergency medical information, first responder tips, and healthcare technology.',
    url: 'https://icetracer.com/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://icetracer.com/blog',
  },
}

/**
 * Layout wrapper for the Blog section that adds structured data.
 * Includes Breadcrumb schema for navigation context.
 * Individual blog posts have their own layouts with Article schema.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />
    </>
  )
}
