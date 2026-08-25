import type { Metadata } from 'next'
import { Container, Section, SectionHead } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import { LogoMark } from '@/components/logo'
import { doctor } from '@/content/doctor'
import { clinic, isTodo } from '@/content/clinic'

export const metadata: Metadata = {
  title: {
    absolute: `Dr Gaurang Deshpande — Consultant Rheumatologist${
      isTodo(clinic.city) ? '' : `, ${clinic.city}`
    }`,
  },
  description:
    'Dr Gaurang Deshpande, MBBS, MD Internal Medicine, DM Clinical Immunology & Rheumatology (NIMS, Hyderabad). Consultant Rheumatologist and Clinical Immunologist.',
  alternates: { canonical: '/dr-gaurang-deshpande/' },
}

const catFor = ['cat-brand', 'cat-teal', 'cat-fresh', 'cat-plum'] as const

export default function DoctorPage() {
  return (
    <>
      {/* Coloured hero with the portrait slot beside the credentials */}
      <section className="bg-brand-surface text-[color:var(--c-on-brand-surface)]">
        <Container>
          <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
            <div className="card overflow-hidden p-0 text-ink">
              <div className="flex aspect-[4/5] items-center justify-center bg-raised">
                <div className="px-6 text-center">
                  <LogoMark chip={false} className="mx-auto h-24 w-24 opacity-60" />
                  <p className="mt-4 text-[0.78rem]">
                    <span className="todo-marker">[ADD PORTRAIT OF DR DESHPANDE]</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <p className="pill bg-white/15 text-[color:var(--c-on-brand-surface)]">The consultant</p>
              <h1 className="display-l mt-5">{doctor.name}</h1>
              <p className="mt-3 text-[1.1rem] opacity-90">{doctor.title}</p>
              <p className="lede mt-5 max-w-[54ch] text-[color:var(--c-on-brand-surface)] opacity-85">
                {doctor.intro}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {doctor.degrees.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-white/15 px-3.5 py-1.5 text-[0.82rem] font-medium"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              {isTodo(clinic.registrationNumber) ? (
                <p className="mt-4">
                  <span className="todo-marker">[ADD MEDICAL COUNCIL REGISTRATION NO.]</span>
                </p>
              ) : (
                <p className="mt-4 text-[0.88rem] opacity-80">
                  Reg. No. {clinic.registrationNumber}
                  {!isTodo(clinic.registrationCouncil) ? `, ${clinic.registrationCouncil}` : null}
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <SectionHead
          eyebrow="Training"
          title="Qualifications"
          lede={`Approximately ${doctor.yearsAsConsultant} years of experience as a Consultant Rheumatologist, caring for patients with inflammatory, autoimmune, rheumatological and immune-related disorders.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {doctor.training.map((t, i) => (
            <div key={t.qualification} className={`card cat-top ${catFor[i]} p-6`}>
              <p className="eyebrow cat-text">{t.qualification}</p>
              <p className="mt-3 text-[1rem] leading-snug">
                {isTodo(t.institution) ? (
                  <span className="todo-marker">[{t.marker}]</span>
                ) : (
                  t.institution
                )}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead eyebrow="Special interest" title="Areas of special interest" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {doctor.interests.map((interest, i) => (
            <div key={interest.title} className={`card ${catFor[i % 4]} p-6`}>
              <h3 className="display-s cat-text">{interest.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{interest.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <figure className="card cat-warm relative overflow-hidden p-8 sm:p-12">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-[color:var(--cat)]" />
          <p className="pill">A note from {doctor.shortName}</p>
          <blockquote className="mt-5">
            <p className="display-m max-w-[30ch] font-normal italic">
              “{doctor.note.pullquote}”
            </p>
          </blockquote>
          <div className="prose measure mt-8 text-[1.02rem] leading-[1.7]">
            {doctor.note.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <figcaption className="mt-7 border-t border-rule-soft pt-5">
            <span className="font-semibold">{doctor.name}</span>
            <span className="mt-0.5 block text-[0.9rem] text-muted">{doctor.title}</span>
          </figcaption>
        </figure>
      </Section>

      <section className="bg-brand-surface py-14 text-[color:var(--c-on-brand-surface)] sm:py-18">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="display-m max-w-[22ch]">Consult Dr Deshpande</h2>
            <AppointmentActions
              onDark
              className="shrink-0"
              message={`Hello, I would like to request an appointment with ${doctor.name} at DIRA.`}
            />
          </div>
        </Container>
      </section>
    </>
  )
}
