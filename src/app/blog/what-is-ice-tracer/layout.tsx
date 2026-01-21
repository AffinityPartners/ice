import { Metadata } from 'next'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the "What is ICE Tracer?" blog article.
 * Provides article-specific SEO data for this foundational explainer post.
 */
export const metadata: Metadata = {
  title: 'What is ICE Tracer?',
  description: 'Discover what ICE Tracer is and how this emergency medical information system helps first responders access critical patient information during emergencies.',
  keywords: 'what is ICE Tracer, emergency medical information, ICE meaning, medical ID system, first responder tools, emergency contacts',
  authors: [{ name: 'Daphyne Lovejoy' }],
  openGraph: {
    title: 'What is ICE Tracer?',
    description: 'Discover what ICE Tracer is and how it helps first responders access critical patient information during emergencies.',
    url: 'https://icetracer.com/blog/what-is-ice-tracer',
    type: 'article',
    publishedTime: '2017-06-30T00:00:00.000Z',
    authors: ['Daphyne Lovejoy'],
    images: [
      {
        url: '/images/What_is_ICE_Blog.png',
        width: 800,
        height: 400,
        alt: 'Emergency sign highlighting the importance of medical information accessibility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is ICE Tracer?',
    description: 'Discover what ICE Tracer is and how it helps first responders access critical patient information.',
    images: ['/images/What_is_ICE_Blog.png'],
  },
  alternates: {
    canonical: 'https://icetracer.com/blog/what-is-ice-tracer',
  },
}

/**
 * Layout wrapper for the "What is ICE Tracer?" article.
 * Includes Article and Breadcrumb schemas for rich search results.
 */
export default function WhatIsICETracerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ArticleJsonLd
        headline="What is ICE Tracer?"
        description="Discover what ICE Tracer is and how this emergency medical information system helps first responders access critical patient information during emergencies."
        image="/images/What_is_ICE_Blog.png"
        datePublished="2017-06-30T00:00:00.000Z"
        author={{ name: 'Daphyne Lovejoy' }}
        url="/blog/what-is-ice-tracer"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: 'What is ICE Tracer?', url: '/blog/what-is-ice-tracer' },
        ]}
      />
    </>
  )
}
