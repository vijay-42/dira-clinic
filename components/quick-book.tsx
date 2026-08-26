'use client'

import { useState } from 'react'
import { clinic, isTodo } from '@/content/clinic'
import { IconWhatsApp, IconPhone, IconClock } from './icons'
import { telHref } from '@/content/clinic'

const REASONS = [
  'New consultation',
  'Second opinion',
  'Follow-up appointment',
  'Referral from another doctor',
  'Not sure — I have a question first',
] as const

/**
 * Compact appointment bar that straddles the hero.
 *
 * Deliberately two fields and a reason, not a full booking calendar: the clinic
 * has no scheduling backend, and a form that implies a confirmed slot would be
 * lying. It composes a WhatsApp message, the same mechanism as the contact page
 * form — nothing patient-identifying reaches this website.
 */
export function QuickBookBar() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState<string>(REASONS[0])
  const [touched, setTouched] = useState(false)

  const ok = name.trim().length > 1 && phone.trim().length >= 6

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!ok || isTodo(clinic.whatsapp)) return
    const body = [
      'Appointment request — DIRA',
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Reason: ${reason}`,
    ].join('\n')
    window.open(
      `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(body)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const field =
    'w-full rounded-[10px] border border-transparent bg-white px-3.5 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-faint focus:border-brand'

  return (
    <div className="rounded-[var(--radius)] bg-brand-surface p-5 shadow-[0_18px_50px_-24px_hsl(var(--c-shadow)/0.55)] sm:p-6">
      <form onSubmit={submit} noValidate className="grid gap-3 lg:grid-cols-[1fr_1fr_1.1fr_auto]">
        <div>
          <label htmlFor="qb-name" className="sr-only">
            Your name
          </label>
          <input
            id="qb-name"
            className={field}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={touched && name.trim().length <= 1}
          />
        </div>
        <div>
          <label htmlFor="qb-phone" className="sr-only">
            Phone number
          </label>
          <input
            id="qb-phone"
            type="tel"
            inputMode="tel"
            className={field}
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            aria-invalid={touched && phone.trim().length < 6}
          />
        </div>
        <div>
          <label htmlFor="qb-reason" className="sr-only">
            Reason for the appointment
          </label>
          <select
            id="qb-reason"
            className={field}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-warm min-h-0 py-3" disabled={isTodo(clinic.whatsapp)}>
          <IconWhatsApp className="h-[1.1rem] w-[1.1rem]" />
          Request
        </button>
      </form>

      {touched && !ok ? (
        <p className="mt-3 text-[0.85rem] text-[color:var(--c-on-brand-surface)]">
          Please add your name and a number the clinic can reach you on.
        </p>
      ) : null}

      <p className="mt-3 text-[0.8rem] leading-relaxed text-[color:var(--c-on-brand-surface)] opacity-75">
        Opens WhatsApp with your details filled in — nothing is stored on this website. A request
        is not a confirmed appointment; the clinic will contact you to arrange a time.
      </p>
    </div>
  )
}

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
