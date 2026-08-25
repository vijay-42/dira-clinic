/* A small hand-drawn stroke icon set. Deliberately not a third-party icon
 * library: eight marks drawn for this site, at one weight, rather than a
 * thousand generic ones. All inherit currentColor and share a 24px grid. */

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

export const IconArrow = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)
