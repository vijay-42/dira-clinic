import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader, Section, SectionHead, TickList } from '@/components/ui'
import { IconJoint, IconImmune, IconPain, IconRehab, IconArrow } from '@/components/icons'
import { conditionGroups } from '@/content/site'

export const metadata: Metadata = {
  title: 'Conditions we commonly see',
  description:
    'Rheumatoid arthritis, lupus, spondyloarthritis, vasculitis, myositis, gout, allergy and immune-related conditions, chronic pain and unexplained inflammatory illness.',
  alternates: { canonical: '/conditions/' },
}

const catFor = ['cat-brand', 'cat-teal', 'cat-fresh', 'cat-plum'] as const
const iconFor = [IconJoint, IconImmune, IconPain, IconRehab] as const

export default function ConditionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Conditions"
        title="What we commonly see"
        lede="This list is not exhaustive, and a condition being absent from it does not mean it cannot be evaluated here. If an immune or inflammatory disorder is being considered, an assessment is appropriate."
      >
        <nav aria-label="Condition groups" className="mt-8 flex flex-wrap gap-3">
          {conditionGroups.map((g, i) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className={`${catFor[i]} cat-bg cat-text rounded-full px-4 py-2 text-[0.88rem] font-medium transition-opacity hover:opacity-80`}
            >
              {g.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {conditionGroups.map((group, i) => {
        const Icon = iconFor[i]
        return (
          <Section key={group.id} id={group.id} tone={i % 2 === 0 ? 'paper' : 'raised'}>
            <div className={catFor[i]}>
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                <div>
                  <span className="cat-bg inline-flex h-14 w-14 items-center justify-center rounded-[14px]">
                    <Icon className="cat-text h-7 w-7" />
                  </span>
                  <SectionHead
                    className="mt-5"
                    title={<span className="cat-text">{group.title}</span>}
                    lede={group.intro}
                  />
                </div>
                <div className="card p-7 sm:p-8">
                  <TickList items={group.items} />
                </div>
              </div>
            </div>
          </Section>
        )
      })}

      <Section tone="paper">
        <div className="card cat-brand p-8 sm:p-12">
          <SectionHead
            eyebrow="Not listed?"
            title="A positive test, or an unexplained symptom, is reason enough to ask"
            lede="Many patients arrive with a positive ANA, a raised inflammatory marker, or symptoms across several organs, and no diagnosis at all. Determining that a disease is not present is a legitimate and useful outcome of a specialist consultation."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact/" className="btn btn-warm">
              Book an appointment <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/services/" className="btn btn-ghost">
              How an evaluation works
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
