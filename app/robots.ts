// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
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
    sitemap: 'https://aureliensebe.com/sitemap.xml',
  }
}
