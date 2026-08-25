import type { MetadataRoute } from 'next'
import { siteUrl } from '@/content/clinic'
import { nav } from '@/content/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  return nav.map((item) => ({
    url: `${base}${item.href}`,
    changeFrequency: item.href === '/' ? 'monthly' : 'yearly',
    priority: item.href === '/' ? 1 : item.href === '/contact/' ? 0.9 : 0.7,
  }))
}
