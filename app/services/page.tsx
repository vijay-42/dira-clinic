import type { Metadata } from 'next'
import { Container, PageHeader, Section, SectionHead, TickList } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import {
  IconConsult, IconOpinion, IconImmune, IconJoint, IconPain,
  IconRehab, IconLab, IconPharmacy, IconTeam,
} from '@/components/icons'
import { services } from '@/content/site'
import { clinic } from '@/content/clinic'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Specialist consultation, second opinions, clinical immunology and allergy evaluation, rheumatology care, chronic pain management, physiotherapy, laboratory and pharmacy support.',
  alternates: { canonical: '/services/' },
}

const meta: Record<string, { Icon: typeof IconConsult; cat: string }> = {
  consultation: { Icon: IconConsult, cat: 'cat-brand' },
  'second-opinions': { Icon: IconOpinion, cat: 'cat-plum' },
  'immunology-allergy': { Icon: IconImmune, cat: 'cat-teal' },
  rheumatology: { Icon: IconJoint, cat: 'cat-fresh' },
  'chronic-pain': { Icon: IconPain, cat: 'cat-teal' },
  physiotherapy: { Icon: IconRehab, cat: 'cat-brand' },
  laboratory: { Icon: IconLab, cat: 'cat-fresh' },
  pharmacy: { Icon: IconPharmacy, cat: 'cat-plum' },
  multidisciplinary: { Icon: IconTeam, cat: 'cat-brand' },
}

const facilityLabel: Record<string, string> = {
  'on-site': 'Available on site',
  partnered: 'Provided through partner providers',
  none: 'Not currently available',
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Evaluation, treatment and the support around it"
        lede="Patients with rheumatological and immune-related problems often need more than a consultation. These are the elements DIRA brings together."
      >
        <nav aria-label="Services" className="mt-8 flex flex-wrap gap-2.5">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-rule bg-surface px-4 py-2 text-[0.86rem] font-medium transition-colors hover:border-brand hover:text-brand"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {services.map((service, i) => {
        const m = meta[service.slug]
        const isFacility = ['physiotherapy', 'laboratory', 'pharmacy'].includes(service.slug)
        return (
          <Section key={service.slug} id={service.slug} tone={i % 2 === 0 ? 'paper' : 'raised'}>
            <div className={m.cat}>
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <span className="cat-bg inline-flex h-14 w-14 items-center justify-center rounded-[14px]">
                    <m.Icon className="cat-text h-7 w-7" />
                  </span>
                  <SectionHead
                    className="mt-5"
                    title={<span className="cat-text">{service.title}</span>}
                    lede={service.summary}
                  />
                  {isFacility ? (
                    <p className="cat-bg cat-text mt-6 inline-block rounded-full px-4 py-1.5 text-[0.84rem] font-medium">
                      {
                        facilityLabel[
                          clinic.facilities[
                            service.slug === 'physiotherapy'
                              ? 'physiotherapy'
                              : service.slug === 'laboratory'
                                ? 'laboratory'
                                : 'pharmacy'
                          ]
                        ]
                      }
                    </p>
                  ) : null}
                </div>

                <div>
                  {'body' in service && service.body.length > 0 ? (
                    <div className="prose measure text-[1.02rem]">
                      {service.body.map((p) => (
                        <p key={p.slice(0, 30)}>{p}</p>
                      ))}
                    </div>
                  ) : null}

                  {'questions' in service && service.questions ? (
                    <div className="card mt-5 p-6 sm:p-7">
                      <TickList items={service.questions} columns={2} />
                    </div>
                  ) : null}

                  {'closing' in service && service.closing ? (
                    <p className="measure mt-5 text-[1.02rem] leading-relaxed">
                      {service.closing}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Section>
        )
      })}

      <section className="bg-brand-surface py-14 text-[color:var(--c-on-brand-surface)] sm:py-18">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="display-m max-w-[24ch]">Arrange a consultation</h2>
            <AppointmentActions onDark className="shrink-0" />
          </div>
        </Container>
      </section>
    </>
  )
}
