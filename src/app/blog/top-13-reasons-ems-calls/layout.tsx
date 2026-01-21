import { Metadata } from 'next'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the "Top 13 Reasons for EMS Calls" blog article.
 * Provides article-specific SEO data for this EMS statistics article.
 */
export const metadata: Metadata = {
  title: 'Top 13 Reasons for EMS Calls',
  description: 'Discover the top 13 most common reasons people call emergency medical services. Learn about EMS call statistics and why having your medical information ready matters.',
  keywords: 'EMS calls, emergency medical services, 911 calls statistics, ambulance reasons, medical emergencies, emergency response statistics',
  authors: [{ name: 'ICE Tracer Team' }],
  openGraph: {
    title: 'Top 13 Reasons for EMS Calls',
    description: 'Discover the top 13 most common reasons people call emergency medical services and why being prepared matters.',
    url: 'https://icetracer.com/blog/top-13-reasons-ems-calls',
    type: 'article',
    publishedTime: '2024-01-20T00:00:00.000Z',
    authors: ['ICE Tracer Team'],
    images: [
      {
        url: '/images/ICE-Tracer-er-visit.png',
        width: 800,
        height: 400,
        alt: 'Emergency room visit statistics illustration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 13 Reasons for EMS Calls',
    description: 'Discover the top 13 most common reasons people call emergency medical services.',
    images: ['/images/ICE-Tracer-er-visit.png'],
  },
  alternates: {
    canonical: 'https://icetracer.com/blog/top-13-reasons-ems-calls',
  },
}

/**
 * Layout wrapper for the Top 13 Reasons for EMS Calls article.
 * Includes Article and Breadcrumb schemas for rich search results.
 */
export default function Top13ReasonsEMSCallsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ArticleJsonLd
        headline="Top 13 Reasons for EMS Calls"
        description="Discover the top 13 most common reasons people call emergency medical services. Learn about EMS call statistics and why having your medical information ready matters."
        image="/images/ICE-Tracer-er-visit.png"
        datePublished="2024-01-20T00:00:00.000Z"
        author={{ name: 'ICE Tracer Team' }}
        url="/blog/top-13-reasons-ems-calls"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: 'Top 13 Reasons for EMS Calls', url: '/blog/top-13-reasons-ems-calls' },
        ]}
      />
    </>
  )
}
