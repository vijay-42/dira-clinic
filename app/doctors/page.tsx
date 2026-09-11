import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader, Section, SectionHead } from '@/components/ui'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { AppointmentActions } from '@/components/contact-bar'
import { DoctorPortrait } from '@/components/portrait'
import { IconArrow } from '@/components/icons'
import { doctor, doctorHref } from '@/content/doctor'
import { cityName } from '@/content/clinic'

export const metadata: Metadata = {
  title: 'Doctors',
  description:
    'The consultants at DIRA. Dr Gaurang Deshpande, Consultant Rheumatologist and Clinical Immunologist, MBBS, MD Internal Medicine, DM Clinical Immunology & Rheumatology.',
  alternates: { canonical: '/doctors/' },
}

/* The listing that /doctors/ resolves to. One consultant today, so the page is
   a single card rather than a grid — but the route is the index for the
   profiles beneath it, and a second doctor is added here and nowhere else. */
const doctors = [doctor]

export default function DoctorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="Meet our specialists"
        lede={`Consultations at DIRA are with a specialist trained in rheumatology and clinical immunology, in ${cityName()}.`}
      />
      <Breadcrumbs path="/doctors/" />

      <Section tone="paper">
        <div className="grid gap-6">
          {doctors.map((d) => (
            <Link
              key={d.slug}
              href={doctorHref(d.slug)}
              className="card group block overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="grid gap-0 sm:grid-cols-[0.34fr_0.66fr]">
                <div className="relative min-h-[15rem] bg-raised sm:min-h-full">
                  <DoctorPortrait fill />
                </div>

                <div className="min-w-0 p-7 sm:p-9">
                  <h2 className="display-s text-[clamp(1.3rem,2.2vw,1.7rem)] group-hover:text-brand">
                    {d.name}
                  </h2>
                  <p className="mt-1.5 text-[1rem] text-brand">{d.title}</p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {d.degrees.map((degree) => (
                      <li
                        key={degree}
                        className="rounded-full bg-brand-tint px-3.5 py-1.5 text-[0.82rem] font-medium text-brand"
                      >
                        {degree}
                      </li>
                    ))}
                  </ul>

                  <p className="measure mt-5 text-[1rem] leading-relaxed text-muted">{d.intro}</p>

                  <p className="mt-5 text-[0.9rem] text-muted">
                    Consultations in {d.languages.join(' · ')}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-medium text-brand">
                    Full profile, training and areas of special interest
                    <IconArrow className="nudge h-5 w-5 shrink-0" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead
          eyebrow="Appointments"
          title="Book a consultation"
          lede="Consultations are by prior appointment. WhatsApp is usually the quickest way to reach the clinic."
        />
        <AppointmentActions className="mt-8" />
      </Section>
    </>
  )
}
