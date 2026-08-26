import { clinic, isTodo, telHref } from '@/content/clinic'
import { IconWhatsApp, IconPhone, IconClock } from './icons'

/** Three practical facts, shown beneath the hero. */
export function ContactStrip() {
  const tel = telHref()
  const items = [
    { Icon: IconPhone, label: 'Call the clinic', value: isTodo(clinic.phone) ? '[ADD PHONE NUMBER]' : clinic.phone, href: tel, cat: 'cat-brand' },
    { Icon: IconWhatsApp, label: 'WhatsApp', value: 'Usually the quickest way', href: undefined, cat: 'cat-fresh' },
    { Icon: IconClock, label: 'Appointments', value: 'By prior appointment', href: undefined, cat: 'cat-teal' },
  ]
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={`${it.cat} flex items-center gap-4 ${
            i > 0 ? 'sm:border-l sm:border-rule sm:pl-6' : ''
          }`}
        >
          <span className="cat-bg blob inline-flex h-14 w-14 shrink-0 items-center justify-center">
            <it.Icon className="cat-text h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="block text-[1rem] font-semibold leading-snug">{it.label}</span>
            <span className="mt-0.5 block truncate text-[0.9rem] text-muted">{it.value}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
