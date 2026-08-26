import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, PageHeader, Section, SectionHead, TickList } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import {
  IconConsult, IconOpinion, IconImmune, IconJoint, IconPain,
  IconRehab, IconLab, IconPharmacy, IconTeam, IconArrow,
} from '@/components/icons'
import { services } from '@/content/site'
import { servicePages } from '@/content/service-pages'
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

const detailIcons = { joint: IconJoint, immune: IconImmune, rehab: IconRehab, pharmacy: IconPharmacy, lab: IconLab }

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

      {/* The five service pages. These are the local-search landing pages, so
          they sit above the general service descriptions below. */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Service pages"
          title="Explore each service in detail"
          lede="Each of these has its own page covering what it involves, who it helps and the questions patients ask most."
        />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((sp) => {
            const DIcon = detailIcons[sp.icon]
            return (
              <Link
                key={sp.slug}
                href={`/${sp.slug}/`}
                className={`card ${sp.cat} cat-top group flex flex-col p-6 transition-shadow hover:shadow-[0_10px_34px_-14px_hsl(var(--c-shadow)/0.28)]`}
              >
                <span className="cat-bg inline-flex h-11 w-11 items-center justify-center rounded-[11px]">
                  <DIcon className="cat-text h-[1.35rem] w-[1.35rem]" />
                </span>
                <h3 className="display-s mt-4 cat-text">{sp.title}</h3>
                <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted">{sp.lede}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-medium cat-text">
                  Read more <IconArrow className="h-4 w-4" />
                </span>
              </Link>
            )
          })}
        </div>
      </Section>

      {services.map((service, i) => {
        const m = meta[service.slug]
        const isFacility = ['physiotherapy', 'laboratory', 'pharmacy'].includes(service.slug)
        return (
          <Section key={service.slug} id={service.slug} tone={i % 2 === 0 ? 'raised' : 'paper'}>
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
