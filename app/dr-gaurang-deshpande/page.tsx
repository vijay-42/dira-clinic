import type { Metadata } from 'next'
import { Container, Section, SectionHead } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import { DoctorPortrait } from '@/components/portrait'
import { doctor } from '@/content/doctor'
import { clinic, isTodo, has } from '@/content/clinic'

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
          <div className="grid items-stretch gap-8 py-8 sm:py-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-12 lg:py-12">
            {/* Stretches to the text column rather than dictating the banner
                height with a fixed aspect ratio. */}
            <div className="card relative mx-auto h-full min-h-[16rem] w-full max-w-[19rem] overflow-hidden bg-raised p-0 lg:max-w-none">
              <DoctorPortrait priority fill />
            </div>

            <div className="min-w-0">
              <p className="pill bg-white/15 text-[color:var(--c-on-brand-surface)]">The consultant</p>
              <h1 className="display-l mt-3 text-[clamp(1.85rem,2.9vw,2.5rem)]">{doctor.name}</h1>
              <p className="mt-2 text-[1.05rem] opacity-90">{doctor.title}</p>
              <p className="lede mt-3 max-w-[54ch] text-[color:var(--c-on-brand-surface)] opacity-85">
                {doctor.intro}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {doctor.degrees.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-white/15 px-3.5 py-1.5 text-[0.82rem] font-medium"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              {has(clinic.registrationNumber) ? (
                <p className="mt-4 text-[0.88rem] opacity-80">
                  Reg. No. {clinic.registrationNumber}
                  {has(clinic.registrationCouncil) ? `, ${clinic.registrationCouncil}` : null}
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <Section tone="paper">
        <SectionHead
          eyebrow="Training"
          title="Qualifications"
          lede={`${doctor.yearsOfExperience}+ years of experience in clinical immunology and rheumatology, caring for patients with inflammatory, autoimmune, rheumatological and immune-related disorders.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {doctor.training.map((t, i) => (
            <div key={t.qualification} className={`card cat-top ${catFor[i]} p-6`}>
              <p className="eyebrow cat-text">{t.qualification}</p>
              {has(t.institution) ? (
                <p className="mt-3 text-[1rem] leading-snug">{t.institution}</p>
              ) : null}
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
            <p className="quote max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.4]">
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
