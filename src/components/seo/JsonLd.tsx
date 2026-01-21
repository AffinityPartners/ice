/**
 * JSON-LD Structured Data Components for SEO
 * 
 * These components generate structured data that helps search engines understand
 * the content and context of pages. This enables rich snippets in search results.
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data
 * @see https://schema.org/
 */

import Script from 'next/script'

/**
 * Base URL for the website, used in all structured data
 */
const BASE_URL = 'https://icetracer.com'

/**
 * Organization structured data props
 */
interface OrganizationJsonLdProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  sameAs?: string[]
}

/**
 * Generates Organization schema for the company.
 * This helps search engines understand the business entity behind the website.
 * Should be included on the homepage and key landing pages.
 */
export function OrganizationJsonLd({
  name = 'ICE Tracer',
  url = BASE_URL,
  logo = `${BASE_URL}/images/ICE-Tracer-Logo.png`,
  description = 'ICE Tracer provides instant access to critical medical information during emergencies. Store and share your medical profile with first responders and healthcare providers.',
  sameAs = [],
}: OrganizationJsonLdProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    ...(sameAs.length > 0 && { sameAs }),
  }

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * WebSite structured data props
 */
interface WebSiteJsonLdProps {
  name?: string
  url?: string
  description?: string
}

/**
 * Generates WebSite schema for the site.
 * This helps search engines understand the website as a whole.
 * Can enable sitelinks search box in search results.
 */
export function WebSiteJsonLd({
  name = 'ICE Tracer',
  url = BASE_URL,
  description = 'Emergency Medical Information System',
}: WebSiteJsonLdProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Article structured data props
 */
interface ArticleJsonLdProps {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: {
    name: string
    url?: string
  }
  url: string
  publisher?: {
    name: string
    logo: string
  }
}

/**
 * Generates Article schema for blog posts.
 * This enables rich snippets showing article info in search results.
 * Required for Google News and Discover eligibility.
 */
export function ArticleJsonLd({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
  publisher = {
    name: 'ICE Tracer',
    logo: `${BASE_URL}/images/ICE-Tracer-Logo.png`,
  },
}: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${BASE_URL}${url}`,
    },
  }

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * FAQ item structure
 */
interface FAQItem {
  question: string
  answer: string
}

/**
 * FAQPage structured data props
 */
interface FAQPageJsonLdProps {
  faqs: FAQItem[]
}

/**
 * Generates FAQPage schema for FAQ content.
 * This enables rich FAQ snippets in search results, showing
 * expandable question/answer pairs directly in Google.
 */
export function FAQPageJsonLd({ faqs }: FAQPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faqpage-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Breadcrumb item structure
 */
interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * BreadcrumbList structured data props
 */
interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

/**
 * Generates BreadcrumbList schema for navigation paths.
 * This helps search engines understand site structure and can
 * display breadcrumbs in search results instead of the URL.
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * MedicalOrganization structured data props
 * More specific than Organization for healthcare-related businesses
 */
interface MedicalOrganizationJsonLdProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  medicalSpecialty?: string[]
}

/**
 * Generates MedicalOrganization schema for healthcare context.
 * This is more specific than Organization and better suited for
 * healthcare-related businesses like ICE Tracer.
 */
export function MedicalOrganizationJsonLd({
  name = 'ICE Tracer',
  url = BASE_URL,
  logo = `${BASE_URL}/images/ICE-Tracer-Logo.png`,
  description = 'ICE Tracer provides instant access to critical medical information during emergencies.',
  medicalSpecialty = ['Emergency Medicine'],
}: MedicalOrganizationJsonLdProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    medicalSpecialty,
  }

  return (
    <Script
      id="medical-organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * WebPage structured data props
 */
interface WebPageJsonLdProps {
  name: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}

/**
 * Generates WebPage schema for individual pages.
 * Useful for informational pages that aren't articles.
 */
export function WebPageJsonLd({
  name,
  description,
  url,
  datePublished,
  dateModified,
}: WebPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    isPartOf: {
      '@type': 'WebSite',
      name: 'ICE Tracer',
      url: BASE_URL,
    },
  }

  return (
    <Script
      id="webpage-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * SoftwareApplication structured data props
 * For describing the ICE Tracer application/service
 */
interface SoftwareApplicationJsonLdProps {
  name?: string
  description?: string
  applicationCategory?: string
  operatingSystem?: string
  offers?: {
    price: string
    priceCurrency: string
  }
}

/**
 * Generates SoftwareApplication schema for the ICE Tracer service.
 * This helps search engines understand that ICE Tracer is a software/service product.
 */
export function SoftwareApplicationJsonLd({
  name = 'ICE Tracer',
  description = 'Emergency Medical Information System that provides instant access to critical medical information during emergencies.',
  applicationCategory = 'HealthApplication',
  operatingSystem = 'Web',
}: SoftwareApplicationJsonLdProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    url: BASE_URL,
    provider: {
      '@type': 'Organization',
      name: 'ICE Tracer',
      url: BASE_URL,
    },
  }

  return (
    <Script
      id="software-application-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
