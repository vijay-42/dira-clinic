/* A small hand-drawn stroke icon set. Deliberately not a third-party icon
 * library: eight marks drawn for this site, at one weight, rather than a
 * thousand generic ones. All inherit currentColor and share a 24px grid. */

import type { ReactElement } from 'react'

type P = { className?: string }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

/** Consultation — a stethoscope. */
export const IconConsult = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 3v5a4 4 0 0 0 8 0V3" />
    <path d="M4.5 3h3M12.5 3h3" />
    <path d="M10 12v2a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-1.5" />
    <circle cx="19" cy="11" r="2.2" />
  </svg>
)

/** Second opinion — two overlapping documents. */
export const IconOpinion = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M8 3h6l4 4v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4" />
    <path d="M5 7v13a1 1 0 0 0 1 1h9" />
  </svg>
)

/** Immunology and allergy — an antibody, echoing the logo. */
export const IconImmune = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21v-7M12 14 7 7M12 14l5-7" />
    <circle cx="6.4" cy="5.6" r="2.4" />
    <circle cx="17.6" cy="5.6" r="2.4" />
  </svg>
)

/** Rheumatology — a joint articulation. */
export const IconJoint = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 3v4.5a3 3 0 0 0 1.2 2.4l1.6 1.2a3 3 0 0 1 1.2 2.4V21" />
    <circle cx="10" cy="12" r="3.4" />
    <path d="M17 21v-4.5a3 3 0 0 0-1.2-2.4" />
  </svg>
)

/** Chronic pain — a point of radiating discomfort. */
export const IconPain = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19" />
  </svg>
)

/** Physiotherapy and rehabilitation — a figure in motion. */
export const IconRehab = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="13" cy="4.2" r="2.2" />
    <path d="M13 8v4l3.5 2.5" />
    <path d="M13 12 9 14l-1 7" />
    <path d="M9 14l4.5 3 .5 4" />
  </svg>
)

/** Laboratory — a specimen flask. */
export const IconLab = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9.5 3v6.2L5.2 17a2 2 0 0 0 1.7 3h10.2a2 2 0 0 0 1.7-3l-4.3-7.8V3" />
    <path d="M8 3h8" />
    <path d="M7.2 14h9.6" />
  </svg>
)

/** Pharmacy — a capsule. */
export const IconPharmacy = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="2.6" y="8.6" width="18.8" height="6.8" rx="3.4" transform="rotate(-45 12 12)" />
    <path d="M9.6 9.6l4.8 4.8" />
  </svg>
)

/** Multidisciplinary care — linked specialities. */
export const IconTeam = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="5" r="2.4" />
    <circle cx="5" cy="17" r="2.4" />
    <circle cx="19" cy="17" r="2.4" />
    <path d="M10.4 7.1 6.6 14.9M13.6 7.1l3.8 7.8M7.4 17h9.2" />
  </svg>
)

export const IconPhone = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 3h3.2l1.6 4-2 1.5a11 11 0 0 0 5.7 5.7l1.5-2 4 1.6V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  </svg>
)

export const IconWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 0 0 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm0 18.03c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.16.83.84-3.08-.2-.32a8.16 8.16 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2 2.2 0 4.25.86 5.8 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.26-8.09 8.26Zm4.5-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.55.12s-.64.8-.78.97c-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.04s.88 2.37 1 2.53c.13.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.4.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.17-.47-.29Z" />
  </svg>
)

export const IconMail = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6.5 9 6 9-6" />
  </svg>
)

export const IconPin = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const IconClock = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
)

/* ---- Social profiles ---------------------------------------------------
 * The one place official brand marks are used rather than marks drawn for
 * this site — as with WhatsApp above, a social row is only useful if it is
 * recognised at a glance. Filled glyphs, inheriting currentColor. */

const brand = {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true as const,
}

export const IconFacebook = ({ className }: P) => (
  <svg {...brand} className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
  </svg>
)

export const IconInstagram = ({ className }: P) => (
  <svg {...brand} className={className}>
    <path d="M12 2.16c3.2 0 3.58.012 4.85.07 1.17.054 1.8.25 2.23.413.56.218.96.478 1.38.898.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.898.43-.164 1.06-.36 2.23-.413C8.42 2.172 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.014 7.05.072 5.78.13 4.9.335 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.335 4.9.13 5.78.072 7.05.014 8.33 0 8.74 0 12s.014 3.67.072 4.95c.058 1.27.263 2.15.558 2.91.305.79.717 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.295-1.64-.5-2.91-.558C15.67.014 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
  </svg>
)

export const IconYouTube = ({ className }: P) => (
  <svg {...brand} className={className}>
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.54 12 3.54 12 3.54s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
  </svg>
)

export const IconX = ({ className }: P) => (
  <svg {...brand} className={className}>
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.25 6.93 6.06-6.93Zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4Z" />
  </svg>
)

/** Looks up a social mark by the `network` key used in content/clinic.ts. */
export const socialIcons: Record<string, (p: P) => ReactElement> = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  youtube: IconYouTube,
  x: IconX,
}

export const IconChevron = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const IconArrow = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)
