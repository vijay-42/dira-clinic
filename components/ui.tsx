import type { ReactNode } from 'react'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[78rem] px-5 sm:px-8 ${className}`}>{children}</div>
  )
}

type Tone = 'paper' | 'raised' | 'surface' | 'brand'

const toneClass: Record<Tone, string> = {
  paper: 'bg-paper',
  raised: 'bg-raised',
  surface: 'bg-surface',
  brand: 'bg-brand-surface text-[color:var(--c-on-brand-surface)]',
}

/** A full-width band. Alternating tones give the page its colour rhythm. */
export function Section({
  children,
  className = '',
  tone = 'paper',
  id,
  as: Tag = 'section',
}: {
  children: ReactNode
  className?: string
  tone?: Tone
  id?: string
  as?: 'section' | 'div'
}) {
  return (
    <Tag id={id} className={`${toneClass[tone]} py-14 sm:py-20 lg:py-24 ${className}`}>
      <Container>{children}</Container>
    </Tag>
  )
}

/** Eyebrow pill + heading + optional lede, centred or left-aligned. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'left',
  onDark = false,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  onDark?: boolean
  className?: string
}) {
  const centred = align === 'center'
  return (
    <div className={`reveal ${centred ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow ? (
        <p
          className={`pill ${
            onDark ? 'bg-white/15 text-[color:var(--c-on-brand-surface)]' : ''
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`display-m mt-4 ${centred ? 'mx-auto' : ''} max-w-[24ch] ${
          centred ? '' : ''
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`lede mt-4 ${centred ? 'mx-auto' : ''} measure ${
            onDark ? 'text-[color:var(--c-on-brand-surface)]/85' : ''
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  )
}

/** Standard interior-page opening: a tinted band with the page title. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="border-b border-rule-soft bg-raised py-8 sm:py-10 lg:py-12">
      <Container>
        <p className="pill">{eyebrow}</p>
        <h1 className="display-l mt-3 max-w-[24ch] text-[clamp(1.55rem,2.7vw,2.35rem)]">
          {title}
        </h1>
        {lede ? <p className="lede measure mt-3">{lede}</p> : null}
        {children}
      </Container>
    </header>
  )
}

/** Displayed lines — line breaks that are load-bearing. */
export function Verses({ lines, className = '' }: { lines: string[]; className?: string }) {
  return (
    <div className={`versed ${className}`}>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  )
}

/** A checked list item, used for condition and service lists. */
export function TickList({
  items,
  columns = 2,
  className = '',
}: {
  items: readonly string[]
  columns?: 1 | 2
  className?: string
}) {
  return (
    <ul
      className={`grid gap-x-8 gap-y-2.5 ${columns === 2 ? 'sm:grid-cols-2' : ''} ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.97rem] leading-snug">
          <span
            aria-hidden="true"
            className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--cat,var(--c-brand))]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
