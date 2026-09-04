import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader, Section, SectionHead, Verses } from '@/components/ui'
import { IconArrow } from '@/components/icons'
import { approach, difference } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'DIRA is a specialist centre for rheumatology, clinical immunology and immune-related health concerns — for patients with an established diagnosis, and for those still looking for one.',
  alternates: { canonical: '/about/' },
}

const goals = [
  'Understand their condition',
  'Control disease activity',
  'Prevent avoidable damage',
  'Manage pain and other symptoms',
  'Maintain mobility and independence',
  'Reduce treatment-related difficulties',
  'And return to a life that is not defined by their disease',
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About DIRA"
        title="Understand the problem. Find the cause. Treat what matters."
        lede="DIRA stands for Deshpande Immunology & Rheumatology Advanced Clinic — a specialist centre providing evaluation and care both for established diseases and for conditions where an immune or inflammatory disorder is only suspected."
      />

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="What DIRA is" title="Care brought together in one place" />
            <div className="prose measure mt-6 text-[1.02rem]">
              <p>
                DIRA was created around a simple observation: patients with rheumatological and
                immune-related problems often need more than a consultation.
              </p>
              <p>
                They may need careful diagnostic evaluation, laboratory support, medicines,
                physiotherapy, pain management, rehabilitation, pharmacy support, follow-up and —
                when required — coordination with other medical specialists.
              </p>
            </div>
          </div>
          <div className="card cat-brand p-7 sm:p-9">
            <p className="text-[1.02rem] leading-relaxed">
              A patient may arrive with established rheumatoid arthritis, lupus, ankylosing
              spondylitis or another autoimmune disease. Another may arrive with nothing more
              than persistent unexplained joint pain and a blood test nobody has been able to
              explain.
            </p>
            <p className="mt-4 text-[1.02rem] font-medium leading-relaxed cat-text">
              Not every such patient has an autoimmune disease. That is why careful clinical
              assessment comes first.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead
          eyebrow="Philosophy"
          title="Medicine should reduce the burden of disease — not add to it"
          lede="Rheumatological and immune-mediated diseases can affect much more than joints. They can affect movement, work, sleep, energy, skin, muscles, lungs, kidneys, nerves, blood, bones and everyday life."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="card p-7 sm:p-9">
            <p className="eyebrow text-brand">Our aim is to help patients</p>
            <Verses
              className="mt-4 text-[1.04rem] leading-[1.8]"
              lines={goals}
            />
          </div>
          <div className="flex items-center">
            <p className="measure text-[1.05rem] leading-relaxed">
              For many chronic diseases, a cure may not always be realistic. But{' '}
              <strong className="font-semibold text-brand">
                better disease control, better function and a better quality of life
              </strong>{' '}
              are often achievable goals.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead eyebrow="The difference" title="How we work" />
        <dl className="mt-10 grid gap-5 sm:grid-cols-2">
          {difference.map((d) => (
            <div key={d.is} className="card p-6">
              <dt className="text-[0.98rem] leading-snug text-faint line-through decoration-1">
                {d.not}
              </dt>
              <dd className="mt-3 text-[1.02rem] font-medium leading-snug text-brand">{d.is}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="raised">
        <SectionHead eyebrow="Our approach" title="Six steps, in order" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {approach.map((step, i) => (
            <li key={step.title} className="card p-6">
              <span className="eyebrow tnum text-brand">
                Step {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display-s mt-2">{step.title}</h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <SectionHead eyebrow="Next" title="Where to go from here" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { href: '/dr-gaurang-deshpande/', label: 'Dr Gaurang Deshpande', sub: 'Profile, training and areas of special interest' },
            { href: '/conditions/', label: 'Conditions', sub: 'What we commonly see' },
            { href: '/services/', label: 'Services', sub: 'Evaluation, treatment and support' },
            { href: '/contact/', label: 'Contact', sub: 'Address, timings and appointments' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="card group flex items-center justify-between gap-4 p-5">
              <span>
                <span className="block font-semibold group-hover:text-brand">{l.label}</span>
                <span className="mt-0.5 block text-[0.9rem] text-muted">{l.sub}</span>
              </span>
              <IconArrow className="h-5 w-5 shrink-0 text-brand" />
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
