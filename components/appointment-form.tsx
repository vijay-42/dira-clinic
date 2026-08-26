'use client'

import { useState } from 'react'
import { clinic, isTodo } from '@/content/clinic'

/**
 * Appointment request.
 *
 * Deliberately backend-free: the form composes a structured message and hands
 * it to WhatsApp or the patient's email client. Nothing patient-identifying is
 * transmitted to, or stored on, this website — which is the right default for
 * a health site and avoids a data-handling obligation the clinic does not need.
 *
 * TO SWAP IN A SERVER-SIDE HANDLER LATER: replace `compose()` with a fetch to
 * your endpoint. Note that `output: 'export'` in next.config.mjs means there
 * are no API routes — you would use a form service or a separate function.
 */

export function AppointmentForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [details, setDetails] = useState('')
  const [touched, setTouched] = useState(false)

  const nameOk = name.trim().length > 1
  const phoneOk = phone.trim().length >= 6
  const ready = nameOk && phoneOk

  function compose() {
    return [
      'Appointment request — DIRA',
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      details.trim() ? `Reason: ${details.trim()}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n')
  }

  function send(channel: 'whatsapp' | 'email') {
    setTouched(true)
    if (!ready) return

    const body = compose()
    if (channel === 'whatsapp' && !isTodo(clinic.whatsapp)) {
      window.open(
        `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(body)}`,
        '_blank',
        'noopener,noreferrer',
      )
      return
    }
    if (channel === 'email' && !isTodo(clinic.email)) {
      window.location.href = `mailto:${clinic.email}?subject=${encodeURIComponent(
        'Appointment request — DIRA',
      )}&body=${encodeURIComponent(body)}`
    }
  }

  const field =
    'mt-2 w-full rounded-[10px] border border-rule bg-paper px-3.5 py-3 text-[1rem] text-ink outline-none transition-colors focus:border-brand'
  const label = 'eyebrow block text-faint'

  return (
    <form
      className="measure"
      onSubmit={(e) => {
        e.preventDefault()
        send('whatsapp')
      }}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="af-name">
            Your name
          </label>
          <input
            id="af-name"
            name="name"
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            aria-invalid={touched && !nameOk}
            aria-describedby={touched && !nameOk ? 'af-name-err' : undefined}
          />
          {touched && !nameOk ? (
            <p id="af-name-err" className="mt-1.5 text-[0.85rem] text-warm">
              Please enter your name so the clinic knows who is calling back.
            </p>
          ) : null}
        </div>

        <div>
          <label className={label} htmlFor="af-phone">
            Phone number
          </label>
          <input
            id="af-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={field}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            aria-invalid={touched && !phoneOk}
            aria-describedby={touched && !phoneOk ? 'af-phone-err' : undefined}
          />
          {touched && !phoneOk ? (
            <p id="af-phone-err" className="mt-1.5 text-[0.85rem] text-warm">
              Please enter a number the clinic can reach you on.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="af-details">
          Reason for the appointment{' '}
          <span className="text-faint">(optional)</span>
        </label>
        <textarea
          id="af-details"
          name="details"
          rows={4}
          className={`${field} resize-y`}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <p className="mt-2 text-[0.84rem] leading-relaxed text-faint">
          Please keep this brief and avoid sending detailed medical records here. Bring reports
          and previous prescriptions to the consultation instead.
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-solid" disabled={isTodo(clinic.whatsapp)}>
          Send on WhatsApp
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => send('email')}
          disabled={isTodo(clinic.email)}
        >
          Send by email instead
        </button>
      </div>

      <p className="mt-5 text-[0.84rem] leading-relaxed text-faint">
        This opens WhatsApp or your email app with the details filled in — nothing is stored on
        this website. A request is not a confirmed appointment; the clinic will contact you to
        arrange a time.
      </p>
    </form>
  )
}
