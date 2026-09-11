import { Fragment } from 'react'
import Link from 'next/link'
import { Container } from './ui'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'
import { nav } from '@/content/site'
import { serviceMenu } from '@/content/service-pages'
import { DOCTORS_BASE, doctor, doctorHref } from '@/content/doctor'

/**
 * Breadcrumbs that mirror the address bar.
 *
 * The trail is derived from the path rather than written out page by page:
 * one crumb per URL segment, labelled from the very tables the menus read.
 * A crumb therefore cannot drift from the URL, and renaming a page in
 * content/ renames it here too.
 *
 * The visible trail and its BreadcrumbList structured data are emitted
 * together, from one array — Google penalises a mismatch between the two, and
 * keeping them in separate places is how that mismatch happens.
 */

/**
 * Every known path → the label already used for it in the menus.
 *
 * /doctors/ is listed explicitly: the header links to it but the footer nav
 * points straight at the profile, so it is in neither table.
 */
const labels = new Map<string, string>([
  ...nav.map((n) => [n.href, n.label] as [string, string]),
  ...serviceMenu.map((s) => [s.href, s.label] as [string, string]),
  [`${DOCTORS_BASE}/`, 'Doctors'],
  [doctorHref(doctor.slug), doctor.name],
])

/** Last-resort label for a path no menu knows: "day-care" -> "Day care". */
function fromSlug(segment: string): string {
  const words = segment.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/** "/services/pharmacy/" -> Home / Services / Pharmacy. */
export function trailFor(path: string): { name: string; path: string }[] {
  const trail = [{ name: 'Home', path: '/' }]
  let sofar = ''
  for (const segment of path.split('/').filter(Boolean)) {
    sofar += `/${segment}`
    const href = `${sofar}/`
    trail.push({ name: labels.get(href) ?? fromSlug(segment), path: href })
  }
  return trail
}

export function Breadcrumbs({ path }: { path: string }) {
  const trail = trailFor(path)
  /* The home page is its own first crumb — a trail of one says nothing. */
  if (trail.length < 2) return null

  return (
    <>
      <div className="w-full border-b border-rule-soft bg-paper">
        <Container className="py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-muted">
              {trail.map((crumb, i) => {
                const isLast = i === trail.length - 1
                return (
                  <Fragment key={crumb.path}>
                    {i > 0 ? <li aria-hidden="true">/</li> : null}
                    {isLast ? (
                      <li aria-current="page" className="text-ink">
                        {crumb.name}
                      </li>
                    ) : (
                      <li>
                        <Link href={crumb.path} className="hover:text-brand hover:underline">
                          {crumb.name}
                        </Link>
                      </li>
                    )}
                  </Fragment>
                )
              })}
            </ol>
          </nav>
        </Container>
      </div>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  )
}
