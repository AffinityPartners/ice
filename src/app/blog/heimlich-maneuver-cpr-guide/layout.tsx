import { Metadata } from 'next'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the "Heimlich Maneuver and CPR Guide" blog article.
 * Provides article-specific SEO data for this life-saving techniques guide.
 */
export const metadata: Metadata = {
  title: 'Heimlich Maneuver and CPR Guide',
  description: 'Learn how to perform the Heimlich maneuver and CPR with this comprehensive guide. Step-by-step instructions for saving lives during choking and cardiac emergencies.',
  keywords: 'Heimlich maneuver, CPR guide, choking first aid, cardiac arrest, emergency response, life saving techniques, first aid training',
  authors: [{ name: 'ICE Tracer Team' }],
  openGraph: {
    title: 'Heimlich Maneuver and CPR Guide',
    description: 'Learn how to perform the Heimlich maneuver and CPR with step-by-step instructions for emergency situations.',
    url: 'https://icetracer.com/blog/heimlich-maneuver-cpr-guide',
    type: 'article',
    publishedTime: '2024-01-15T00:00:00.000Z',
    authors: ['ICE Tracer Team'],
    images: [
      {
        url: '/images/heimlich-maneuver.png',
        width: 800,
        height: 400,
        alt: 'Illustration showing the Heimlich maneuver technique',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heimlich Maneuver and CPR Guide',
    description: 'Learn how to perform the Heimlich maneuver and CPR for emergency situations.',
    images: ['/images/heimlich-maneuver.png'],
  },
  alternates: {
    canonical: 'https://icetracer.com/blog/heimlich-maneuver-cpr-guide',
  },
}

/**
 * Layout wrapper for the Heimlich Maneuver and CPR Guide article.
 * Includes Article and Breadcrumb schemas for rich search results.
 */
export default function HeimlichManeuverCPRGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ArticleJsonLd
        headline="Heimlich Maneuver and CPR Guide"
        description="Learn how to perform the Heimlich maneuver and CPR with this comprehensive guide. Step-by-step instructions for saving lives during choking and cardiac emergencies."
        image="/images/heimlich-maneuver.png"
        datePublished="2024-01-15T00:00:00.000Z"
        author={{ name: 'ICE Tracer Team' }}
        url="/blog/heimlich-maneuver-cpr-guide"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: 'Heimlich Maneuver and CPR Guide', url: '/blog/heimlich-maneuver-cpr-guide' },
        ]}
      />
    </>
  )
}
