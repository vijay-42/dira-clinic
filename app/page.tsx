import { Fragment } from 'react'
import Link from 'next/link'
import { Container, Section, SectionHead, Verses, TickList } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import { DoctorPortrait } from '@/components/portrait'
import {
  IconConsult, IconOpinion, IconImmune, IconJoint, IconPain,
  IconRehab, IconLab, IconPharmacy, IconTeam, IconArrow,
} from '@/components/icons'
import { clinic, isTodo, cityName } from '@/content/clinic'
import { doctor } from '@/content/doctor'
import { triage, approach, conditionGroups } from '@/content/site'

const symptoms = [
  'Pain', 'Stiffness', 'Swelling', 'Fatigue', 'Rashes', 'Recurrent symptoms',
  'Abnormal blood tests', 'Unexplained inflammation', 'Allergy-like reactions',
  'Symptoms involving more than one part of the body',
]

/* Why a patient can trust this clinic — stated as facts, not slogans.
   No invented statistics: the only number here is real. */
const trust = [
  {
    cat: 'cat-brand',
    Icon: IconConsult,
    title: 'Super-specialist training',
    body: 'DM in Clinical Immunology & Rheumatology from NIMS, Hyderabad — a super-speciality qualification beyond MD Internal Medicine.',
  },
  {
    cat: 'cat-teal',
    Icon: IconImmune,
    title: 'Immunology as well as rheumatology',
    body: 'Allergy, immune dysregulation and multisystem illness are assessed here, not only joint disease.',
  },
  {
    cat: 'cat-fresh',
    Icon: IconTeam,
    title: 'Care in one place',
    body: 'Consultation, laboratory support, physiotherapy, pharmacy and follow-up coordinated in a single clinical setting.',
  },
]

const serviceCards = [
  { Icon: IconConsult, cat: 'cat-brand', title: 'Specialist Consultation', body: 'Evaluation for established, suspected and complex rheumatological or immune-related conditions.', href: '/services/#consultation' },
  { Icon: IconOpinion, cat: 'cat-plum', title: 'Second Opinions', body: 'A fresh specialist assessment where a diagnosis or treatment plan needs clarifying.', href: '/services/#second-opinions' },
  { Icon: IconImmune, cat: 'cat-teal', title: 'Immunology & Allergy', body: 'Establishing whether the immune system is actually responsible for the symptoms.', href: '/services/#immunology-allergy' },
  { Icon: IconJoint, cat: 'cat-fresh', title: 'Rheumatology Care', body: 'Inflammatory and autoimmune disease affecting joints, muscles, skin, spine and organs.', href: '/services/#rheumatology' },
  { Icon: IconPain, cat: 'cat-teal', title: 'Chronic Pain', body: 'The cause of pain is assessed before treatment is chosen — inflammatory, mechanical or nerve-related.', href: '/services/#chronic-pain' },
  { Icon: IconRehab, cat: 'cat-brand', title: 'Physiotherapy & Rehab', body: 'Structured rehabilitation integrated with medical management.', href: '/services/#physiotherapy' },
  { Icon: IconLab, cat: 'cat-fresh', title: 'Laboratory Support', body: 'Testing when the clinical question requires it — not simply because a test is available.', href: '/services/#laboratory' },
  { Icon: IconPharmacy, cat: 'cat-plum', title: 'Pharmacy Support', body: 'Access to prescribed medications, improving continuity of care.', href: '/services/#pharmacy' },
]

const catFor = ['cat-brand', 'cat-teal', 'cat-fresh', 'cat-plum'] as const
const iconFor = [IconJoint, IconImmune, IconPain, IconRehab] as const

export default function HomePage() {
  return (
    <>
      {/* ============================================================ HERO */}
      <section className="relative overflow-hidden bg-brand-surface text-[color:var(--c-on-brand-surface)]">
        {/* Soft depth, drawn with the brand colour rather than a stock gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[38rem] w-[38rem] rounded-full opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 62%)' }}
        />
        <Container className="relative">
          <div className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
            <div className="min-w-0">
              <p className="pill bg-white/15 text-[color:var(--c-on-brand-surface)]">
                {clinic.strapline}
              </p>

              <h1 className="display-xl mt-6 max-w-[18ch]">
                When something doesn’t feel right, the first step is understanding why.
              </h1>

              <p className="mt-7 max-w-[56ch] text-[1.02rem] leading-relaxed opacity-85">
                {symptoms.map((s, i) => (
                  <Fragment key={s}>
                    {s}
                    {i < symptoms.length - 1 ? (
                      <span aria-hidden="true" className="opacity-60">{' · '}</span>
                    ) : (
                      '.'
                    )}
                  </Fragment>
                ))}
              </p>

              <Verses
                className="mt-8 font-[family-name:var(--font-display)] text-[1.3rem] leading-[1.45] sm:text-[1.45rem]"
                lines={['Sometimes the cause is clear.', 'Sometimes it isn’t.']}
              />
              <p className="mt-2 max-w-[44ch] font-[family-name:var(--font-display)] text-[1.3rem] italic leading-[1.45] opacity-90 sm:text-[1.45rem]">
                And sometimes the biggest question is whether the immune system is involved at
                all.
              </p>

              <AppointmentActions className="mt-9" onDark />
            </div>

            <div className="min-w-0">
              <div className="card overflow-hidden p-0 text-ink">
                <div className="aspect-[4/5] bg-raised">
                  <DoctorPortrait priority />
                </div>
                <div className="p-6">
                  <p className="eyebrow text-brand">Consultant</p>
                  <p className="display-s mt-2">{doctor.name}</p>
                  <p className="mt-1.5 text-[0.92rem] leading-snug text-muted">{doctor.title}</p>
                  <ul className="mt-4 space-y-1 border-t border-rule-soft pt-4">
                    {doctor.degrees.map((d) => (
                      <li key={d} className="text-[0.85rem] leading-snug text-muted">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.88rem] text-faint">
                    Approximately {doctor.yearsAsConsultant} years in consultant practice.
                  </p>
                  <Link
                    href="/dr-gaurang-deshpande/"
                    className="link mt-4 inline-flex items-center gap-1.5 text-[0.92rem]"
                  >
                    Full profile <IconArrow className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================== TRUST */}
      <Section tone="paper">
        <div className="grid gap-6 md:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className={`card cat-top ${t.cat} p-7`}>
              <span className="cat-bg inline-flex h-12 w-12 items-center justify-center rounded-[12px]">
                <t.Icon className="cat-text h-6 w-6" />
              </span>
              <h3 className="display-s mt-5">{t.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ========================================================= THESIS */}
      <Section tone="raised">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <p className="display-l max-w-[22ch]">
            Clarity when the diagnosis is uncertain.
            <span className="mt-1 block text-brand">Expertise when it is clear.</span>
          </p>
          <Link href="/conditions/" className="btn btn-solid shrink-0">
            Conditions we treat <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ========================================================= TRIAGE */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Who consults here"
          title="You do not need a confirmed diagnosis to seek an opinion"
          lede="DIRA is for patients with a diagnosis — and also for patients who are still looking for one. Not everyone who consults here has an autoimmune disease. That is precisely why careful clinical assessment comes first."
        />
        <div className="mt-11 grid gap-6 sm:grid-cols-2">
          {triage.map((group, i) => (
            <div key={group.heading} className={`card ${catFor[i]} p-7`}>
              <h3 className="display-s cat-text">{group.heading}</h3>
              <TickList items={group.items} columns={1} className="mt-4" />
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-[14px] border border-rule-soft bg-brand-tint p-7">
          <p className="measure text-[1.05rem] leading-relaxed">
            Sometimes the answer is an autoimmune disease. Sometimes it is another medical
            condition. Sometimes there is no major immune disorder at all.{' '}
            <strong className="font-semibold text-brand">
              All deserve a thoughtful evaluation.
            </strong>
          </p>
        </div>
      </Section>

      {/* ======================================================= SERVICES */}
      <Section tone="raised">
        <SectionHead
          eyebrow="What we provide"
          title="More than a consultation"
          lede="Patients with rheumatological and immune-related problems often need evaluation, laboratory support, medicines, physiotherapy, pain management and follow-up. DIRA brings these together."
        />
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className={`card ${s.cat} group p-6 transition-shadow hover:shadow-[0_10px_34px_-14px_hsl(var(--c-shadow)/0.28)]`}
            >
              <span className="cat-bg inline-flex h-11 w-11 items-center justify-center rounded-[11px]">
                <s.Icon className="cat-text h-[1.35rem] w-[1.35rem]" />
              </span>
              <h3 className="mt-4 text-[1.02rem] font-semibold leading-snug group-hover:text-brand">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
            </Link>
          ))}
        </div>
        <Link href="/services/" className="link mt-9 inline-flex items-center gap-1.5">
          All services in detail <IconArrow className="h-4 w-4" />
        </Link>
      </Section>

      {/* ===================================================== CONDITIONS */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Conditions"
          title="What we commonly see"
          lede="Four families of condition, colour-coded throughout the site so you can find your way around quickly."
        />
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {conditionGroups.map((group, i) => {
            const Icon = iconFor[i]
            return (
              <Link
                key={group.id}
                href={`/conditions/#${group.id}`}
                className={`card cat-top ${catFor[i]} group flex flex-col p-6`}
              >
                <span className="cat-bg inline-flex h-11 w-11 items-center justify-center rounded-[11px]">
                  <Icon className="cat-text h-[1.35rem] w-[1.35rem]" />
                </span>
                <h3 className="display-s mt-4 cat-text">{group.title}</h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
                  {group.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-medium cat-text">
                  {group.items.length} conditions <IconArrow className="h-4 w-4" />
                </span>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* ======================================================= APPROACH */}
      <Section tone="raised">
        <SectionHead
          eyebrow="Our approach"
          title="How an evaluation proceeds"
          lede="Six steps, in order — because the sequence is the point. The diagnosis is established before treatment is chosen."
        />
        <ol className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* ============================================== DOCTOR PULL QUOTE */}
      <Section tone="paper">
        <figure className="card cat-warm relative overflow-hidden p-8 sm:p-12">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-[color:var(--cat)]" />
          <blockquote>
            <p className="display-m max-w-[30ch] font-normal italic">
              “{doctor.note.pullquote}”
            </p>
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold">{doctor.name}</span>
            <span className="text-[0.9rem] text-muted">{doctor.title}</span>
          </figcaption>
          <Link
            href="/dr-gaurang-deshpande/"
            className="link mt-6 inline-flex items-center gap-1.5"
          >
            Read the full profile <IconArrow className="h-4 w-4" />
          </Link>
        </figure>
      </Section>

      {/* ===================================================== REFERRALS */}
      <Section tone="raised">
        <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <SectionHead
              eyebrow="For doctors"
              title="Referrals from physicians and specialists"
              lede="You don’t need to be certain that it is autoimmune before referring. A specialist opinion can also establish when it is not an autoimmune disease, and guide the patient to the appropriate next step."
            />
            <Link href="/for-doctors/" className="btn btn-ghost mt-8">
              When to refer <IconArrow className="h-4 w-4" />
            </Link>
          </div>
          <div className="card cat-plum p-7">
            <h3 className="display-s cat-text">Common referral reasons</h3>
            <TickList
              items={[
                'Positive autoimmune serology',
                'Possible connective tissue disease',
                'Suspected vasculitis',
                'Unexplained muscle disease',
                'Complex multisystem illness',
              ]}
              columns={1}
              className="mt-4"
            />
          </div>
        </div>
      </Section>

      {/* ======================================================= CTA BAND */}
      <section className="bg-brand-surface py-16 text-[color:var(--c-on-brand-surface)] sm:py-20">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="display-l max-w-[20ch]">
                Take the first step towards understanding what is happening
              </h2>
              <p className="mt-4 max-w-[52ch] text-[1.02rem] opacity-85">
                Consultations at {cityName()} are by prior appointment. WhatsApp is usually the
                quickest way to reach the clinic.
              </p>
            </div>
            <AppointmentActions onDark className="shrink-0" />
          </div>
        </Container>
      </section>
    </>
  )
}
