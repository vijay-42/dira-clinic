import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader, Section, SectionHead } from '@/components/ui'
import { IconArrow } from '@/components/icons'
import { faqs } from '@/content/site'
import { faqSchema, JsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description:
    'Do I need a confirmed autoimmune disease to consult? Does a positive ANA mean I have one? Can I come for a second opinion? Answers to the questions asked most often.',
  alternates: { canonical: '/faq/' },
}

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions patients ask most often"
        lede="If your question isn’t answered here, the clinic is happy to answer it before you book."
      />

      <Section tone="paper">
        <div className="mx-auto grid max-w-[52rem] gap-4">
          {faqs.map((faq) => (
            /* <details> rather than a JavaScript accordion: it works with the
               page's own JS disabled, and is keyboard-navigable for free. */
            <details key={faq.q} className="card group overflow-hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 p-6 [&::-webkit-details-marker]:hidden">
                <h2 className="display-s max-w-[46ch] transition-colors group-hover:text-brand">
                  {faq.q}
                </h2>
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

      <Section tone="raised">
        <div className="card cat-warm p-8 sm:p-12">
          <SectionHead
            eyebrow="Still unsure?"
            title="Ask before you book"
            lede="If you are not certain whether your problem is one DIRA can help with, get in touch and describe it. Being told that a rheumatology opinion is not what you need is a perfectly good outcome."
          />
          <Link href="/contact/" className="btn btn-warm mt-8">
            Contact the clinic <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <JsonLd data={faqSchema(faqs)} />
    </>
  )
}
