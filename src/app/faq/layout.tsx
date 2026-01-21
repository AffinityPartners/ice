import { Metadata } from 'next'
import { WebPageJsonLd, BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/JsonLd'

/**
 * Metadata for the FAQ page.
 * Provides SEO-optimized title, description, and OpenGraph data
 * for the frequently asked questions page.
 */
export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about ICE Tracer, emergency medical profiles, how first responders access your information, and account management.',
  keywords: 'ICE Tracer FAQ, emergency medical questions, medical profile help, first responder access, healthcare questions',
  openGraph: {
    title: 'ICE Tracer FAQ',
    description: 'Find answers to common questions about ICE Tracer and emergency medical profiles.',
    url: 'https://icetracer.com/faq',
    type: 'website',
  },
  alternates: {
    canonical: 'https://icetracer.com/faq',
  },
}

/**
 * Common FAQs for structured data.
 * These are the main questions that appear on the FAQ page.
 * Update this list when FAQ content changes.
 */
const faqItems = [
  {
    question: 'What is ICE Tracer?',
    answer: 'ICE Tracer is an emergency medical information system that provides instant access to critical medical information during emergencies. It allows you to store and share your medical profile with first responders and healthcare providers.',
  },
  {
    question: 'How do first responders access my information?',
    answer: 'First responders can access your ICE Tracer profile through a unique QR code or ID number. This gives them immediate access to your emergency contacts, medical conditions, medications, and allergies.',
  },
  {
    question: 'Is my medical information secure?',
    answer: 'Yes, ICE Tracer uses industry-standard encryption and security measures to protect your personal health information. Your data is stored securely and only accessible by authorized personnel during emergencies.',
  },
  {
    question: 'Can I update my medical information?',
    answer: 'Yes, you can update your medical profile at any time through your ICE Tracer account. Changes are reflected immediately, ensuring first responders always have access to your current information.',
  },
  {
    question: 'What information should I include in my profile?',
    answer: 'We recommend including emergency contacts, current medications, allergies, chronic conditions, blood type, primary physician information, and any other critical medical information that could help in an emergency.',
  },
]

/**
 * Layout wrapper for the FAQ page that adds structured data.
 * Includes WebPage, Breadcrumb, and FAQPage schemas for rich snippets.
 * FAQPage schema enables expandable Q&A display in Google search results.
 */
export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <WebPageJsonLd
        name="ICE Tracer FAQ"
        description="Find answers to common questions about ICE Tracer and emergency medical profiles."
        url="/faq"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />
      <FAQPageJsonLd faqs={faqItems} />
    </>
  )
}
