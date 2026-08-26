import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Section, SectionHead, TickList } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import {
  IconJoint, IconImmune, IconRehab, IconPharmacy, IconLab, IconArrow,
} from '@/components/icons'
import { servicePages, serviceHref } from '@/content/service-pages'
import { clinic, cityName, locality } from '@/content/clinic'
import { faqSchema, breadcrumbSchema, JsonLd } from '@/lib/schema'

/* One dynamic route renders all five service pages, nested under /services/.
   Only the slugs returned by generateStaticParams are emitted, so unknown
   paths still 404 at the host rather than being swallowed. The sibling
   app/services/page.tsx keeps serving /services/ itself. */
export function generateStaticParams() {
  return servicePages.map((p) => ({ service: p.slug }))
}

const icons = {
  joint: IconJoint,
  immune: IconImmune,
  rehab: IconRehab,
  pharmacy: IconPharmacy,
  lab: IconLab,
}

type Props = { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params
  const page = servicePages.find((p) => p.slug === service)
  if (!page) return {}
  return {
    title: { absolute: `${page.metaTitle} | DIRA` },
    description: page.metaDescription,
    alternates: { canonical: serviceHref(page.slug) },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: serviceHref(page.slug),
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service } = await params
  const page = servicePages.find((p) => p.slug === service)
  if (!page) notFound()

  const Icon = icons[page.icon]
  const others = servicePages.filter((p) => p.slug !== page.slug)

  return (
    <>
      <header className={`${page.cat} border-b border-rule-soft bg-raised py-8 sm:py-10 lg:py-12`}>
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-muted">
              <li>
                <Link href="/" className="hover:text-brand hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services/" className="hover:text-brand hover:underline">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {page.navLabel}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-4">
            <span className="cat-bg inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px]">
              <Icon className="cat-text h-6 w-6" />
            </span>
            <p className="pill">{page.eyebrow}</p>
          </div>

          <h1 className="display-l mt-4 max-w-[24ch] text-[clamp(1.75rem,2.7vw,2.35rem)]">
            {page.title} in {cityName()}
          </h1>
          <p className="lede measure mt-3">{page.lede}</p>
          <AppointmentActions
            className="mt-7"
            message={`Hello, I would like to ask about ${page.title} at DIRA.`}
          />
        </Container>
      </header>

      {page.sections.map((section, i) => (
        <Section key={section.heading} tone={i % 2 === 0 ? 'paper' : 'raised'}>
          <div className={page.cat}>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              <SectionHead title={<span className="cat-text">{section.heading}</span>} />
              <div>
                {section.body ? (
                  <div className="prose measure text-[1.02rem]">
                    {section.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                ) : null}
                {section.list ? (
                  <div className={`card p-6 sm:p-7 ${section.body ? 'mt-6' : ''}`}>
                    <TickList items={section.list} columns={section.list.length > 5 ? 2 : 1} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* FAQ — also emitted as FAQPage structured data below */}
      <Section tone="paper">
        <SectionHead eyebrow="Questions" title="Frequently asked" />
        <div className="mt-8 grid max-w-[52rem] gap-4">
          {page.faqs.map((faq) => (
            <details key={faq.q} className="card group overflow-hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-6 [&::-webkit-details-marker]:hidden">
                <h3 className="display-s max-w-[46ch] transition-colors group-hover:text-brand">
                  {faq.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-tint text-lg font-medium leading-none text-brand transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="measure border-t border-rule-soft px-6 pb-6 pt-5 text-[1.02rem] leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* Other services */}
      <Section tone="raised">
        <SectionHead eyebrow="Also at DIRA" title="Other services" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => {
            const OIcon = icons[o.icon]
            return (
              <Link
                key={o.slug}
                href={serviceHref(o.slug)}
                className={`card ${o.cat} cat-top group flex flex-col p-5`}
              >
                <span className="cat-bg inline-flex h-10 w-10 items-center justify-center rounded-[10px]">
                  <OIcon className="cat-text h-5 w-5" />
                </span>
                <span className="mt-3 flex-1 text-[0.98rem] font-semibold leading-snug group-hover:text-brand">
                  {o.navLabel}
                </span>
                <IconArrow className="cat-text mt-3 h-4 w-4" />
              </Link>
            )
          })}
        </div>
      </Section>

      <section className="bg-brand-surface py-12 text-[color:var(--c-on-brand-surface)] sm:py-16">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="display-m max-w-[22ch]">Speak to the clinic</h2>
              <p className="mt-3 max-w-[52ch] text-[1rem] opacity-85">
                Consultations at {locality()} are by prior appointment. WhatsApp is usually the
                quickest way to reach {clinic.name}.
              </p>
            </div>
            <AppointmentActions onDark className="shrink-0" />
          </div>
        </Container>
      </section>

      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services/' },
          { name: page.navLabel, path: serviceHref(page.slug) },
        ])}
      />
    </>
  )
}
