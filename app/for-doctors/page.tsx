import type { Metadata } from 'next'
import { PageHeader, Section, SectionHead, TickList } from '@/components/ui'
import { IconPhone, IconMail, IconWhatsApp } from '@/components/icons'
import { clinic, telHref, mailHref, whatsappHref, isTodo } from '@/content/clinic'
import { referralReasons } from '@/content/site'
import { doctor } from '@/content/doctor'
import { Value } from '@/components/value'

export const metadata: Metadata = {
  title: 'Referrals for doctors',
  description:
    'A specialist resource for difficult and uncertain cases. DIRA welcomes referrals from physicians and specialists where a rheumatological or immune-mediated disorder is suspected.',
  alternates: { canonical: '/for-doctors/' },
}

export default function ForDoctorsPage() {
  const tel = telHref()
  const mail = mailHref('Patient referral')
  const wa = whatsappHref('Referral enquiry from a colleague.')

  const channels = [
    { Icon: IconPhone, cat: 'cat-brand', label: 'Telephone', href: tel, text: clinic.phone, marker: 'ADD PHONE NUMBER', cta: clinic.phone },
    { Icon: IconMail, cat: 'cat-plum', label: 'Email', href: mail, text: clinic.email, marker: 'ADD EMAIL ADDRESS', cta: clinic.email },
    { Icon: IconWhatsApp, cat: 'cat-fresh', label: 'WhatsApp', href: wa, text: clinic.whatsapp, marker: 'ADD WHATSAPP NUMBER', cta: 'Message the clinic' },
  ]

  return (
    <>
      <PageHeader
        eyebrow="For doctors"
        title="A specialist resource for difficult and uncertain cases"
        lede="DIRA welcomes referrals from physicians and specialists where a rheumatological or immune-mediated disorder is suspected — including cases where that suspicion is not yet firm."
      />

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <SectionHead
            eyebrow="When to refer"
            title="Referral may be appropriate where there is"
          />
          <div className="card cat-plum p-7 sm:p-8">
            <TickList items={referralReasons} columns={1} />
          </div>
        </div>

        <div className="card cat-brand mt-10 p-8 sm:p-10">
          <p className="measure text-[1.1rem] leading-relaxed">
            You don’t need to be certain that it is autoimmune before referring. A specialist
            opinion can also establish when it is <em>not</em> an autoimmune disease, and guide
            the patient towards the appropriate next step.
          </p>
        </div>
      </Section>

      <Section tone="raised">
        <SectionHead
          eyebrow="How to refer"
          title="Getting in touch"
          lede={`A brief note with the clinical question, relevant history and any prior investigations is enough. Direct contact with ${doctor.shortName} can be arranged for urgent or complex cases.`}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {channels.map((c) => (
            <div key={c.label} className={`card cat-top ${c.cat} p-6`}>
              <span className="cat-bg inline-flex h-11 w-11 items-center justify-center rounded-[11px]">
                <c.Icon className="cat-text h-[1.3rem] w-[1.3rem]" />
              </span>
              <p className="eyebrow mt-4 text-faint">{c.label}</p>
              <p className="mt-1.5 text-[1rem] break-words">
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.label === 'WhatsApp'
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="link"
                  >
                    {c.cta}
                  </a>
                ) : (
                  <Value value={c.text} marker={c.marker} />
                )}
              </p>
            </div>
          ))}
        </div>

        <p className="measure mt-8 text-[0.9rem] leading-relaxed text-faint">
          Please avoid sending patient-identifying information by unencrypted email or messaging
          where it can be avoided. A telephone discussion is preferable for anything sensitive.
        </p>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <SectionHead
            eyebrow="Reports"
            title="What the referring doctor receives"
            lede="A written assessment covering the clinical findings, the diagnostic reasoning, the investigations requested and why, and the proposed management — including where the conclusion is that no immune-mediated disease is present."
          />
          {!isTodo(clinic.city) ? (
            <div className="card cat-fresh flex items-center p-7">
              <p className="text-[1.02rem]">
                Clinic located in <strong className="cat-text">{clinic.city}</strong>.
              </p>
            </div>
          ) : null}
        </div>
      </Section>
    </>
  )
}
