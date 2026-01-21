import { MetadataRoute } from 'next'

/**
 * Generates the robots.txt file for search engine crawlers.
 * This file tells search engines which pages to crawl and index.
 * 
 * Rules:
 * - Allow all crawlers to access public pages
 * - Disallow crawling of admin, API, and auth routes (sensitive/dynamic content)
 * - Reference the sitemap for efficient crawling
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/auth/',
          '/affiliate/dashboard/',
          '/affiliate/profile/',
          '/affiliate/settings/',
          '/unauthorized/',
        ],
      },
    ],
    sitemap: 'https://icetracer.com/sitemap.xml',
  }
}
