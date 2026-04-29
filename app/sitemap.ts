import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const SITE_URL = process.env.SITE_URL as string

if (!SITE_URL) {
  throw new Error('SITE_URL environment variable is not set')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  // Routes statiques
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Routes dynamiques (articles de blog)
  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'never' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
