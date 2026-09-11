import type { MetadataRoute } from 'next'
import { siteUrl } from '@/content/clinic'
import { nav } from '@/content/site'
import { servicePages, serviceHref } from '@/content/service-pages'
import { DOCTORS_BASE } from '@/content/doctor'

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
    url: `${base}${serviceHref(p.slug)}`,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))
  /* The doctor profiles are reached from nav, but the /doctors/ listing they
     sit under is linked only from the header — it would otherwise be the one
     page missing from the sitemap. */
  const doctors: MetadataRoute.Sitemap = [
    { url: `${base}${DOCTORS_BASE}/`, changeFrequency: 'yearly', priority: 0.7 },
  ]
  return [...pages, ...doctors, ...services]
}
