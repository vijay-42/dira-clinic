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

  const others = servicePages.filter((p) => p.slug !== page.slug)

  return (
    <>
      <header className={`${page.cat} w-full border-b border-rule-soft bg-raised pt-0 pb-0`}>
        <div className="relative w-full overflow-hidden bg-white">
          <div className="relative min-h-[300px] w-full sm:min-h-[340px] lg:min-h-[390px]">
            {page.image ? (
              <img
                src={page.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : null}
            <div className="absolute inset-0 bg-white/8" />

            <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-[78rem] items-center justify-center px-5 sm:px-8 lg:px-10">
              <div className="mx-auto max-w-[900px] p-4 text-center sm:p-5 lg:p-6">
                <h1 className="mx-auto whitespace-normal text-[clamp(1.5rem,2.6vw,2.6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-slate-900 [text-shadow:0_1px_24px_rgba(255,255,255,0.9),0_1px_2px_rgba(255,255,255,0.9)] lg:whitespace-nowrap">
                  {page.title} in {cityName()}
                </h1>

                <p className="mx-auto mt-3 max-w-[60ch] text-[0.96rem] leading-relaxed text-slate-800 sm:text-[1.05rem] [text-shadow:0_1px_16px_rgba(255,255,255,0.9),0_1px_2px_rgba(255,255,255,0.9)]">
                  {page.lede}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full border-b border-rule-soft bg-paper">
        <Container className="py-3">
          <nav aria-label="Breadcrumb">
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
        </Container>
      </div>

      {page.sections.map((section, i) => (
        <Section
          key={section.heading}
          tone={i % 2 === 0 ? 'paper' : 'raised'}
          className="!py-10 sm:!py-14 lg:!py-16"
        >
          <div className={page.cat}>
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              <div>
                <SectionHead
                  className="lg:sticky lg:top-28"
                  title={<span className="cat-text">{section.heading}</span>}
                />
              </div>
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
                {section.note ? (
                  <p className="measure mt-5 text-[0.95rem] leading-relaxed text-muted">
                    {section.note}
                  </p>
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
            <details key={faq.q} className="disclose card group overflow-hidden">
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
