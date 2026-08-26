'use client'

import { useEffect, useRef, useState } from 'react'
import { clinic, isTodo, telHref } from '@/content/clinic'
import { IconWhatsApp, IconPhone } from './icons'

const REASONS = [
  'New consultation',
  'Second opinion',
  'Follow-up appointment',
  'Referral from another doctor',
  'Not sure — I have a question first',
] as const

const EVENT = 'dira:book'

/**
 * Opens the appointment dialog from anywhere, including a server-rendered
 * page: the dialog itself is mounted once in the root layout and listens for
 * this event, so a trigger needs no shared React state.
 *
 * `topic` is an optional opening line — the page or service the patient was
 * looking at when they asked — and is carried into the WhatsApp message.
 */
export function openBooking(topic?: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { topic } }))
}

/** A button that opens the appointment dialog. */
export function BookAppointmentButton({
  className = '',
  topic,
  children,
}: {
  className?: string
  topic?: string
  children?: React.ReactNode
}) {
  return (
    <button type="button" className={className} onClick={() => openBooking(topic)}>
      {children ?? (
        <>
          <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
          Book appointment
        </>
      )}
    </button>
  )
}

/**
 * Appointment request, as a modal dialog.
 *
 * Mounted once, in the root layout. A native <dialog> opened with showModal()
 * gives the focus trap, the Escape key and the inert background for free —
 * none of that is worth reimplementing.
 *
 * Deliberately two fields and a reason, not a booking calendar: the clinic has
 * no scheduling backend, and a form that implies a confirmed slot would be
 * lying. It composes a WhatsApp message — nothing patient-identifying reaches
 * this website.
 */
export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  const firstField = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState<string | undefined>(undefined)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState<string>(REASONS[0])
  const [touched, setTouched] = useState(false)

  const nameOk = name.trim().length > 1
  const phoneOk = phone.trim().length >= 6
  const ok = nameOk && phoneOk
  const tel = telHref()

  useEffect(() => {
    function onOpen(e: Event) {
      setTopic((e as CustomEvent<{ topic?: string }>).detail?.topic)
      setTouched(false)
      setOpen(true)
    }
    window.addEventListener(EVENT, onOpen)
    return () => window.removeEventListener(EVENT, onOpen)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      // Opening on the name field rather than the close button: the point of
      // the dialog is the form.
      firstField.current?.focus()
    } else if (!open && el.open) {
      el.close()
    }
  }, [open])

  function close() {
    setOpen(false)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!ok || isTodo(clinic.whatsapp)) return
    const body = [
      topic ?? 'Appointment request — DIRA',
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
    close()
  }

  const field =
    'mt-2 w-full rounded-[10px] border border-rule bg-paper px-3.5 py-3 text-[1rem] text-ink outline-none transition-colors focus:border-brand'
  const label = 'eyebrow block text-faint'

  return (
    <dialog
      ref={ref}
      className="booking-dialog"
      aria-labelledby="bk-title"
      onClose={() => setOpen(false)}
      /* Clicking the backdrop — which is the dialog element itself, outside
         the panel — dismisses, the behaviour people expect of a modal. */
      onClick={(e) => {
        if (e.target === ref.current) close()
      }}
    >
      <div className="relative bg-surface p-6 sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-tint hover:text-brand"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="eyebrow text-brand">Appointments</p>
        <h2 id="bk-title" className="display-s mt-2 pr-10">
          Request an appointment
        </h2>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
          {topic ?? 'Leave your name and number and the clinic will contact you to arrange a time.'}
        </p>

        <form onSubmit={submit} noValidate className="mt-6">
          <div>
            <label className={label} htmlFor="bk-name">
              Your name
            </label>
            <input
              id="bk-name"
              ref={firstField}
              className={field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              aria-invalid={touched && !nameOk}
              aria-describedby={touched && !nameOk ? 'bk-name-err' : undefined}
            />
            {touched && !nameOk ? (
              <p id="bk-name-err" className="mt-1.5 text-[0.85rem] text-warm">
                Please enter your name so the clinic knows who is calling back.
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <label className={label} htmlFor="bk-phone">
              Phone number
            </label>
            <input
              id="bk-phone"
              type="tel"
              inputMode="tel"
              className={field}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              aria-invalid={touched && !phoneOk}
              aria-describedby={touched && !phoneOk ? 'bk-phone-err' : undefined}
            />
            {touched && !phoneOk ? (
              <p id="bk-phone-err" className="mt-1.5 text-[0.85rem] text-warm">
                Please enter a number the clinic can reach you on.
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <label className={label} htmlFor="bk-reason">
              Reason for the appointment
            </label>
            <select
              id="bk-reason"
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

          <button
            type="submit"
            className="btn btn-warm mt-6 w-full"
            disabled={isTodo(clinic.whatsapp)}
          >
            <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
            Send on WhatsApp
          </button>

          <a href={tel ?? '/contact/'} className="btn btn-ghost mt-3 w-full">
            <IconPhone className="h-[1.05rem] w-[1.05rem]" />
            {isTodo(clinic.phone) ? 'Call the clinic' : clinic.phone}
          </a>

          <p className="mt-5 text-[0.82rem] leading-relaxed text-faint">
            Opens WhatsApp with your details filled in — nothing is stored on this website. A
            request is not a confirmed appointment; the clinic will contact you to arrange a time.
          </p>
        </form>
      </div>
    </dialog>
  )
}
