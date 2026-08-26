import type { Metadata } from 'next'
import { PageHeader, Section, SectionHead } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import { AppointmentForm } from '@/components/appointment-form'
import { Value } from '@/components/value'
import { SocialLinks } from '@/components/social'
import { IconPhone, IconWhatsApp, IconMail, IconPin, IconClock } from '@/components/icons'
import {
  clinic, addressLine, telHref, mailHref, whatsappHref, has,
} from '@/content/clinic'

export const metadata: Metadata = {
  title: 'Contact & appointments',
  description:
    'Clinic address, timings and appointment requests for DIRA — Deshpande Immunology & Rheumatology Association.',
  alternates: { canonical: '/contact/' },
}

export default function ContactPage() {
  const tel = telHref()
  const mail = mailHref('Appointment enquiry')
  const wa = whatsappHref()

  const cards = [
    {
      Icon: IconPin, cat: 'cat-brand', label: 'Address',
      main: <address className="not-italic leading-relaxed">{addressLine()}</address>,
      extra: has(clinic.mapsUrl) ? (
        <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="link text-[0.92rem]">
          Open in Google Maps
        </a>
      ) : null,
    },
    {
      Icon: IconPhone, cat: 'cat-fresh', label: 'Telephone',
      main: tel ? (
        <a href={tel} className="link">{clinic.phone}</a>
      ) : (
        <Value value={clinic.phone} marker="ADD PHONE NUMBER" />
      ),
    },
    {
      Icon: IconWhatsApp, cat: 'cat-fresh', label: 'WhatsApp',
      main: wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="link">Message the clinic</a>
      ) : (
        <Value value={clinic.whatsapp} marker="ADD WHATSAPP NUMBER" />
      ),
    },
    {
      Icon: IconMail, cat: 'cat-plum', label: 'Email',
      main: mail ? (
        <a href={mail} className="link break-words">{clinic.email}</a>
      ) : (
        <Value value={clinic.email} marker="ADD EMAIL ADDRESS" />
      ),
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Take the first step towards understanding what is happening"
        lede="Consultations are by prior appointment. WhatsApp is usually the quickest way to reach the clinic."
      >
        <AppointmentActions className="mt-8" />
      </PageHeader>

      <Section tone="paper">
        <SectionHead eyebrow="Where we are" title="Clinic details" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className={`card cat-top ${c.cat} p-6`}>
              <span className="cat-bg inline-flex h-11 w-11 items-center justify-center rounded-[11px]">
                <c.Icon className="cat-text h-[1.3rem] w-[1.3rem]" />
              </span>
              <p className="eyebrow mt-4 text-faint">{c.label}</p>
              <div className="mt-1.5 text-[0.98rem]">{c.main}</div>
              {c.extra ? <div className="mt-2">{c.extra}</div> : null}
            </div>
          ))}
        </div>
        {clinic.social.length > 0 ? (
          <div className="mt-8 flex flex-col gap-3 border-t border-rule-soft pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.98rem] text-muted">
              DIRA also posts patient education and clinic updates on social media.
            </p>
            <SocialLinks />
          </div>
        ) : null}
      </Section>

      <Section tone="raised">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <span className="cat-brand cat-bg inline-flex h-14 w-14 items-center justify-center rounded-[14px]">
              <IconClock className="h-7 w-7 text-brand" />
            </span>
            <SectionHead className="mt-5" eyebrow="Timings" title="Clinic hours" />
            {clinic.hours.length > 0 && clinic.hoursNote ? (
              <p className="mt-4 text-[0.98rem] text-muted">{clinic.hoursNote}</p>
            ) : null}
          </div>
          <div className="card p-7 sm:p-8">
            {/* Until the timings are supplied, the card carries the note on its
                own rather than an empty table. */}
            {clinic.hours.length === 0 ? (
              <p className="text-[1rem] leading-relaxed text-muted">
                {clinic.hoursNote} Please WhatsApp or call the clinic to arrange a time.
              </p>
            ) : null}
            <dl>
              {clinic.hours.map((slot, i) => (
                <div
                  key={slot.days}
                  className={`grid gap-x-8 gap-y-1 py-3.5 sm:grid-cols-[12rem_minmax(0,1fr)] ${
                    i > 0 ? 'border-t border-rule-soft' : ''
                  }`}
                >
                  <dt className="text-[1rem] font-semibold">{slot.days}</dt>
                  <dd className="tnum text-[1rem] text-muted">
                    {slot.closed ? (
                      'Closed'
                    ) : (
                      <Value value={slot.time} marker={`ADD ${slot.days.toUpperCase()} TIMINGS`} />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            {clinic.consultationFee ? (
              <p className="mt-5 border-t border-rule-soft pt-5 text-[0.98rem]">
                Consultation: <span className="tnum font-medium">{clinic.consultationFee}</span>
              </p>
            ) : null}
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <SectionHead
            eyebrow="Request an appointment"
            title="Send the clinic your details"
            lede="Fill this in and it will open WhatsApp or your email app with everything filled out. The clinic will contact you to arrange a time."
          />
          <div className="card p-7 sm:p-8">
            <AppointmentForm />
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="card cat-warm p-8 sm:p-10">
          <SectionHead
            eyebrow="Urgent?"
            title={<span className="cat-text">If this is an emergency</span>}
            lede="This clinic does not provide emergency care. If you have severe chest pain, difficulty breathing, a high fever with confusion, sudden weakness, or any other symptom that worries you acutely, please go to your nearest hospital emergency department rather than waiting for an appointment."
          />
        </div>
      </Section>
    </>
  )
}
