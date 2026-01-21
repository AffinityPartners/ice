import { MetadataRoute } from 'next'

/**
 * Generates the sitemap.xml file for search engines.
 * This helps search engines discover and index all public pages efficiently.
 * 
 * Priority levels:
 * - 1.0: Homepage (most important)
 * - 0.9: Key landing pages (about, blog listing)
 * - 0.8: Blog articles (valuable content)
 * - 0.7: FAQ and informational pages
 * - 0.5: Legal/policy pages (less frequently updated)
 * 
 * Change frequencies indicate how often content is expected to change.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://icetracer.com'
  
  // Static pages with their SEO configuration
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/warranty-refund`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Blog posts - static articles
  // These are the current static blog posts. When dynamic blog posts are added,
  // this section should be updated to fetch from the database.
  const blogPosts: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/what-is-ice-tracer`,
      lastModified: new Date('2017-06-30'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/heimlich-maneuver-cpr-guide`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/top-13-reasons-ems-calls`,
      lastModified: new Date('2024-01-20'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]

  return [...staticPages, ...blogPosts]
}
