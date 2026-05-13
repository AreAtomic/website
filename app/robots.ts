// app/robots.ts
import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/private'],
      },
      {
        userAgent: 'Anthropic-WebReader',
        allow: '/',
        disallow: ['/admin', '/private'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  }
}
