import type { MetadataRoute } from 'next'
import { getBlogs } from '@/lib/data'
import { SITE_URL } from '@/lib/seo'

export const revalidate = 3600

const staticRoutes: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/growth', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/speaking', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/boys', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/book', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/testimonials', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const posts: MetadataRoute.Sitemap = getBlogs()
    .filter((post) => post.published)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...pages, ...posts]
}
