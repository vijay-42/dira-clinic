import { clinic, isTodo, telHref, locality, has } from '@/content/clinic'
import { IconWhatsApp, IconPhone, IconClock, IconPin, IconRehab, IconLab, IconPharmacy } from './icons'

/** How an on-premises service is described. 'none' drops the item entirely. */
const facilityLabel = {
  'on-site': 'On-site',
  partnered: 'Through partners',
  none: '',
} as const

/** Practical facts, shown beneath the hero: how to reach the clinic, where it
 *  is, and what is on the premises — the things a patient checks before they
 *  plan a visit. */
export function ContactStrip() {
  const tel = telHref()

  const items = [
    { Icon: IconPhone, label: 'Call the clinic', value: isTodo(clinic.phone) ? '[ADD PHONE NUMBER]' : clinic.phone, href: tel, cat: 'cat-brand' },
    { Icon: IconWhatsApp, label: 'WhatsApp', value: 'Usually the quickest way', href: undefined, cat: 'cat-fresh' },
    { Icon: IconClock, label: 'Appointments', value: 'By prior appointment', href: undefined, cat: 'cat-teal' },
    { Icon: IconPin, label: 'Location', value: locality(), href: has(clinic.mapsUrl) ? clinic.mapsUrl : undefined, cat: 'cat-plum' },
  ]

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => {
          /* An external link needs the new tab; tel: stays in place. */
          const external = it.href?.startsWith('http')
          const Tag = it.href ? 'a' : 'div'
          return (
            <Tag
              key={it.label}
              href={it.href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`${it.cat} group flex items-center gap-4 ${
                i > 0 ? 'lg:border-l lg:border-rule lg:pl-6' : ''
              }`}
            >
              <span className="cat-bg blob inline-flex h-14 w-14 shrink-0 items-center justify-center">
                <it.Icon className="cat-text h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-[1rem] font-semibold leading-snug group-hover:text-brand">
                  {it.label}
                </span>
                <span className="mt-0.5 block truncate text-[0.9rem] text-muted">{it.value}</span>
              </span>
            </Tag>
          )
        })}
      </div>
    </div>
  )
}
