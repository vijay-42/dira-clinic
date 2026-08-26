import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader, Section, SectionHead, TickList } from '@/components/ui'
import { IconArrow } from '@/components/icons'
import { educationPoints } from '@/content/site'

export const metadata: Metadata = {
  title: 'Patient Education',
  description:
    'Understanding your disease is part of treatment. Plain explanations of autoimmune tests, inflammatory conditions and what treatment can realistically achieve.',
  alternates: { canonical: '/patient-education/' },
}

const planned = [
  { title: 'What does a positive ANA actually mean?', cat: 'cat-teal' },
  { title: 'Rheumatoid arthritis: what treat-to-target means for you', cat: 'cat-brand' },
  { title: 'Inflammatory back pain, and how it differs from mechanical back pain', cat: 'cat-fresh' },
  { title: 'Living with a long-term immunosuppressant: monitoring and safety', cat: 'cat-plum' },
  { title: 'Is it an allergy? How allergic reactions are actually confirmed', cat: 'cat-fresh' },
]

export default function PatientEducationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient education"
        title="Understanding your disease is part of treatment"
        lede="An informed patient is a better partner in treatment. Time is set aside in every consultation to explain what is happening and why a particular approach is being taken."
      />

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <SectionHead
            eyebrow="What we explain"
            title="Every patient should leave understanding"
          />
          <div className="card cat-brand p-7 sm:p-8">
            <TickList items={educationPoints} columns={1} />
          </div>
        </div>
      </Section>

      {/* Deliberately built empty rather than padded with thin articles — a few
          genuinely useful explanations will outperform twenty short ones. */}
      <Section tone="raised">
        <SectionHead
          eyebrow="Articles"
          title="Written explanations"
          lede="Plain-language notes on the questions that come up most often in clinic are being prepared and will be published here."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {planned.map((a) => (
            <li key={a.title} className={`card ${a.cat} flex items-start gap-4 p-6`}>
              <span aria-hidden="true" className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[color:var(--cat)]" />
              <span>
                <span className="block text-[1rem] font-medium leading-snug">{a.title}</span>
                <span className="eyebrow mt-2 block text-faint">In preparation</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="measure mt-8 text-[0.98rem] text-muted">
          Until these are published, any of these questions can be discussed directly in
          consultation.
        </p>
        <Link href="/faq/" className="link mt-4 inline-flex items-center gap-1.5">
          Read the frequently asked questions <IconArrow className="nudge h-4 w-4" />
        </Link>
      </Section>
    </>
  )
}
