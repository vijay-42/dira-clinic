import { Fragment } from 'react'
import Link from 'next/link'
import { Container } from './ui'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/**
 * Breadcrumbs that read the way the URL reads.
 *
 * Each crumb is the URL segment itself, spaced out and capitalised — nothing
 * else. Menu labels are deliberately NOT consulted: they abbreviate
 * ("Pharmacy" for /services/pharmacy-service-in-bangalore/), which is what
 * made the trail disagree with the address bar. Reading the path means a
 * crumb cannot say anything the URL does not.
 *
 * The visible trail and its BreadcrumbList structured data are emitted
 * together, from one array — Google penalises a mismatch between the two, and
 * keeping them in separate places is how that mismatch happens.
 */

/** Kept lowercase mid-title, exactly as they appear in the slug. */
const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'at', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with',
])

/** Words a general capitalisation rule gets wrong. */
const EXACT_CASE = new Map([
  ['faq', 'FAQ'],
  ['dira', 'DIRA'],
  ['mri', 'MRI'],
])

/** "pharmacy-service-in-bangalore" -> "Pharmacy Service in Bangalore". */
function labelFor(segment: string): string {
  return segment
    .split('-')
    .map((word, i) => {
      const exact = EXACT_CASE.get(word)
      if (exact) return exact
      if (i > 0 && MINOR_WORDS.has(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

/** "/services/pharmacy-service-in-bangalore/" -> Home / Services / Pharmacy Service in Bangalore. */
export function trailFor(path: string): { name: string; path: string }[] {
  const trail = [{ name: 'Home', path: '/' }]
  let sofar = ''
  for (const segment of path.split('/').filter(Boolean)) {
    sofar += `/${segment}`
    trail.push({ name: labelFor(segment), path: `${sofar}/` })
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
