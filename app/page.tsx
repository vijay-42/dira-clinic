import Link from 'next/link'
import { Container, Section, SectionHead, TickList } from '@/components/ui'
import { AppointmentActions } from '@/components/contact-bar'
import { ContactStrip } from '@/components/contact-strip'
import { DoctorPortrait } from '@/components/portrait'
import {
  IconConsult, IconOpinion, IconImmune, IconJoint, IconPain,
  IconRehab, IconLab, IconPharmacy, IconTeam, IconArrow,
} from '@/components/icons'
import { clinic, isTodo, cityName, locality } from '@/content/clinic'
import { doctor } from '@/content/doctor'
import { triage, conditionGroups } from '@/content/site'
import { SocialLinks } from '@/components/social'

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
      {/* ============================================================ HERO
          Light panel rather than a solid colour block: the brand navy arrives
          as a wash (hero-field) and the portrait sits in a soft halo, which is
          what gives the section its shape. */}
      <section className="hero-field relative overflow-hidden">
        <Container className="relative">
          <div className="grid items-start gap-9 pb-12 pt-8 sm:pt-11 lg:grid-cols-[1.32fr_0.68fr] lg:gap-x-12 lg:gap-y-7 lg:pb-16 lg:pt-12">
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <p className="eyebrow text-brand">{clinic.tagline}</p>

              <h1 className="display-xl mt-4 max-w-[26ch] text-[clamp(1.7rem,3.4vw,2.85rem)]">
                Expert care in Rheumatology &amp; Immunology in {cityName()}
              </h1>

              <p className="lede measure mt-4">
                Convenient consultation hours with personalised rheumatology &amp; immunology care.
              </p>

              <p className="lede measure mt-4">
                Led by {doctor.name}, {doctor.title}, DIRA Clinic provides comprehensive,
                compassionate care for arthritis, autoimmune diseases, joint pain, and other
                rheumatic conditions in {locality()}.
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-2">
                {doctor.degrees.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-brand-tint px-3.5 py-1.5 text-[0.82rem] font-medium text-brand"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Portrait in a halo. The circles are decorative and sit behind
                the photo; the photo itself is circular so the composition
                reads as one shape. On mobile the photo sits between the intro
                text and the appointment actions; on desktop it spans both
                rows on the right so it stays vertically centred beside them. */}
            <div className="relative mx-auto w-full max-w-[21rem] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:ml-auto lg:self-center">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[116%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-tint"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--c-surface)] opacity-70"
              />
              <span
                aria-hidden="true"
                className="cat-fresh cat-bg blob absolute -left-2 bottom-6 -z-10 h-24 w-24 sm:h-28 sm:w-28"
              />
              <div className="relative aspect-square overflow-hidden rounded-full border-8 border-[color:var(--c-surface)] bg-raised shadow-[0_24px_60px_-28px_hsl(var(--c-shadow)/0.5)]">
                <DoctorPortrait priority fill />
              </div>

              <div className="absolute -bottom-2 left-0 rounded-[14px] bg-[color:var(--c-surface)] px-4 py-3 shadow-[0_14px_38px_-18px_hsl(var(--c-shadow)/0.45)]">
                <p className="display-s leading-none text-brand">
                  {doctor.yearsOfExperience}+
                </p>
                <p className="mt-1 text-[0.72rem] font-medium leading-tight text-muted">
                  years of
                  <br />
                  experience
                </p>
              </div>
            </div>

            <AppointmentActions className="lg:col-start-1 lg:row-start-2 lg:self-start" />
          </div>
        </Container>
      </section>

      {/* Practical facts strip */}
      <Section tone="paper" className="!py-6 sm:!py-8">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-rule-soft pb-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Follow us
          </p>
          <SocialLinks />
        </div>
        <ContactStrip />
      </Section>

      {/* ========================================================== TRUST */}
      <Section tone="paper">
        <div className="reveal-each grid gap-6 md:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className={`${t.cat} cat-bg rounded-[var(--radius)] p-7`}>
              <span className="blob inline-flex h-14 w-14 items-center justify-center bg-[color:var(--c-surface)]">
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
            Conditions we treat <IconArrow className="nudge h-4 w-4" />
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
        <div className="reveal-each mt-11 grid gap-6 sm:grid-cols-2">
          {triage.map((group, i) => (
            <div key={group.heading} className={`${catFor[i]} cat-bg rounded-[var(--radius)] p-7`}>
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
        <div className="reveal-each mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className={`${s.cat} cat-bg group rounded-[var(--radius)] p-6 transition-transform duration-200 hover:-translate-y-1`}
            >
              <span className="blob-alt inline-flex h-12 w-12 items-center justify-center bg-[color:var(--c-surface)]">
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
          All services in detail <IconArrow className="nudge h-4 w-4" />
        </Link>
      </Section>

      {/* ===================================================== CONDITIONS */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Conditions"
          title="Conditions & Services at DIRA Clinic"
          lede="Explore our key areas of care, from arthritis and joint pain to autoimmune and immune-related conditions, with specialized care at DIRA Clinic."
        />
        <div className="reveal-each mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {conditionGroups.map((group, i) => {
            const Icon = iconFor[i]
            return (
              <Link
                key={group.id}
                href={`/conditions/#${group.id}`}
                className={`${catFor[i]} cat-bg group flex flex-col rounded-[var(--radius)] p-6 transition-transform duration-200 hover:-translate-y-1`}
              >
                <span className="blob-alt inline-flex h-12 w-12 items-center justify-center bg-[color:var(--c-surface)]">
                  <Icon className="cat-text h-[1.35rem] w-[1.35rem]" />
                </span>
                <h3 className="display-s mt-4 cat-text">{group.title}</h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">
                  {group.intro}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-medium cat-text">
                  {group.items.length} conditions <IconArrow className="nudge h-4 w-4" />
                </span>
              </Link>
            )
          })}
        </div>
      </Section>

    </>
  )
}
