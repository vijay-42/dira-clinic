import type { MetadataRoute } from 'next'
import { siteUrl } from '@/content/clinic'
import { nav } from '@/content/site'
import { servicePages } from '@/content/service-pages'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const pages: MetadataRoute.Sitemap = nav.map((item) => ({
    url: `${base}${item.href}`,
    changeFrequency: item.href === '/' ? 'monthly' : 'yearly',
    priority: item.href === '/' ? 1 : item.href === '/contact/' ? 0.9 : 0.7,
  }))
  // Service detail pages are the local-search landing pages, so they rank
  // above the general informational pages in priority.
  const services: MetadataRoute.Sitemap = servicePages.map((p) => ({
    url: `${base}/${p.slug}/`,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))
  return [...pages, ...services]
}
