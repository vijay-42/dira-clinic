import Link from 'next/link'
import { Container } from './ui'
import { LogoLockup } from './logo'
import { Value } from './value'
import { IconPhone, IconWhatsApp, IconMail, IconPin, IconClock } from './icons'
import {
  clinic,
  addressLine,
  telHref,
  mailHref,
  whatsappHref,
  isTodo,
} from '@/content/clinic'
import { nav } from '@/content/site'
import { doctor } from '@/content/doctor'

export function SiteFooter() {
  const tel = telHref()
  const mail = mailHref('Appointment enquiry')
  const wa = whatsappHref()

  return (
    <footer className="bg-brand-surface pb-24 pt-14 text-[color:var(--c-on-brand-surface)] lg:pb-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-14">
          <div>
            <LogoLockup className="w-[13rem] max-w-full rounded-[14px] p-4" />
            <p className="mt-5 max-w-[34ch] text-[0.94rem] leading-relaxed opacity-85">
              {clinic.legalName}
            </p>
            <p className="mt-3 max-w-[34ch] text-[0.94rem] leading-relaxed opacity-85">
              {clinic.tagline}
            </p>
          </div>

          <div>
            <p className="eyebrow opacity-70">Contact</p>
            <address className="mt-3 space-y-2.5 not-italic text-[0.94rem]">
              <p className="flex items-start gap-2.5">
                <IconPin className="mt-1 h-4 w-4 shrink-0 opacity-80" />
                <span className="opacity-90">{addressLine()}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 shrink-0 opacity-80" />
                {tel ? (
                  <a href={tel} className="hover:underline">
                    {clinic.phone}
                  </a>
                ) : (
                  <Value value={clinic.phone} marker="ADD PHONE NUMBER" />
                )}
              </p>
              <p className="flex items-center gap-2.5">
                <IconWhatsApp className="h-4 w-4 shrink-0 opacity-80" />
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    WhatsApp the clinic
                  </a>
                ) : (
                  <Value value={clinic.whatsapp} marker="ADD WHATSAPP NUMBER" />
                )}
              </p>
              <p className="flex items-center gap-2.5">
                <IconMail className="h-4 w-4 shrink-0 opacity-80" />
                {mail ? (
                  <a href={mail} className="hover:underline">
                    {clinic.email}
                  </a>
                ) : (
                  <Value value={clinic.email} marker="ADD EMAIL ADDRESS" />
                )}
              </p>
              <p className="flex items-start gap-2.5">
                <IconClock className="mt-1 h-4 w-4 shrink-0 opacity-80" />
                <span className="opacity-90">
                  {clinic.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}:{' '}
                      {h.closed ? (
                        'Closed'
                      ) : (
                        <Value value={h.time} marker={`ADD ${h.days.toUpperCase()} TIMINGS`} />
                      )}
                    </span>
                  ))}
                </span>
              </p>
            </address>
          </div>

          <div>
            <p className="eyebrow opacity-70">Pages</p>
            <nav aria-label="Footer" className="mt-3 grid gap-1.5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.94rem] opacity-90 transition-opacity hover:opacity-100 hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-[0.82rem] leading-relaxed opacity-80">
              {doctor.name} · {doctor.degrees.join(' · ')}
              {isTodo(clinic.registrationNumber) ? (
                <>
                  {' '}
                  · <span className="todo-marker">[ADD MEDICAL COUNCIL REGISTRATION NO.]</span>
                </>
              ) : (
                <>
                  {' '}
                  · Reg. No. {clinic.registrationNumber}
                  {!isTodo(clinic.registrationCouncil) ? `, ${clinic.registrationCouncil}` : null}
                </>
              )}
            </p>
            <p className="shrink-0 text-[0.82rem] opacity-80">© 2026 {clinic.name}</p>
          </div>
          <p className="mt-5 max-w-[64ch] text-[0.8rem] leading-relaxed opacity-70">
            The information on this website is provided for general awareness only and is not a
            substitute for individual medical advice, diagnosis or treatment. Please consult a
            qualified doctor about your own symptoms. In an emergency, contact your nearest
            hospital.
          </p>
        </div>
      </Container>
    </footer>
  )
}
