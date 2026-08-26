/* ============================================================================
 * DIRA — CLINIC DETAILS
 * ----------------------------------------------------------------------------
 * EVERY unresolved detail in this project lives in this one file.
 * Nothing else needs editing to launch. Replace each TODO value below.
 *
 * Anything still set to a TODO_ placeholder renders visibly on the site as a
 * bracketed marker (e.g. "[ADD PHONE NUMBER]") rather than silently showing
 * something wrong — so a missed field is impossible to ship by accident.
 *
 * Run `npm run check` at any time to list what is still outstanding.
 * ==========================================================================*/

/** Sentinel: any value equal to this is treated as "not yet supplied". */
export const TODO = '__TODO__' as const

export const clinic = {
  name: 'DIRA',
  legalName: 'Deshpande Immunology & Rheumatology Association',
  tagline: 'Your Health, Our Priority',
  /** The brand line from the supplied logo artwork. */
  strapline: 'Immunity Aligned. Movement Redefined.',
  /** Short descriptor beside the wordmark in the header. */
  descriptor: 'Immunology & Rheumatology',

  // ---- BLOCKS BUILD ------------------------------------------------------
  /** City. Used in page titles and local search. */
  city: 'Bangalore',
  /** State. */
  state: 'Karnataka',
  address: {
    /** Street address. */
    line1: 'No. 579, 9th Main Road, 1st Stage',
    /** Locality / area. */
    line2: 'Indiranagar',
    /** PIN code. */
    postalCode: '560038',
  },
  /** Display form. */
  phone: '+91 90363 69016',
  /** Digits only with country code, no +/spaces. */
  phoneDial: '919036369016',
  /**
   * Digits only with country code.
   * ASSUMPTION: same as the clinic mobile above. WhatsApp is the primary call
   * to action on every page, so if this number is not actually on WhatsApp,
   * change it here — otherwise the main button on the site goes nowhere useful.
   */
  whatsapp: '919036369016',
  email: 'diraclinicllp2026@gmail.com',

  /**
   * Public profiles. Rendered as an icon row in the footer and on the contact
   * page, and emitted as schema.org `sameAs` so Google ties the accounts to
   * this site. Delete a row to drop that icon; this is the order shown.
   */
  social: [
    {
      network: 'facebook',
      label: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61593718982403',
    },
    {
      network: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/dira_clinic_bangalore/',
    },
    {
      network: 'youtube',
      label: 'YouTube',
      url: 'https://www.youtube.com/channel/UCk7U2Tsag7_AfIa3u9u8pyg',
    },
    { network: 'x', label: 'X', url: 'https://x.com/Dira_Clinic' },
  ],

  /**
   * Clinic hours. Provisional — change the times here and they update the
   * footer, the contact page and the opening-hours data given to Google.
   * `closed: true` renders as "Closed"; an empty list hides the block.
   *
   * NOTE: the day label must also exist in DAY_MAP in lib/schema.tsx, which
   * is what turns it into structured data.
   */
  hours: [
    { days: 'Monday – Sunday', time: '10:00 am – 9:00 pm', closed: false },
  ] as ReadonlyArray<{ days: string; time: string; closed: boolean }>,
  /** Shown beneath the hours table. Set to '' to hide. */
  hoursNote: 'Consultations are by prior appointment.',

  /** PENDING Google Maps place URL. Empty hides the directions link. */
  mapsUrl: '',

  // ---- BLOCKS LAUNCH -----------------------------------------------------
  /**
   * PENDING NMC / State Medical Council registration number. Empty omits it
   * entirely. Worth adding when available: it is expected practice, and it
   * signals legitimacy to patients who know to check.
   */
  registrationNumber: '',
  /** PENDING Council that issued it, e.g. 'Karnataka Medical Council'. */
  registrationCouncil: '',

  /**
   * PENDING Production domain, no trailing slash, e.g. 'https://diraclinic.in'.
   * Used for canonical URLs, sitemap.xml and structured data; until it is set,
   * those fall back to a placeholder host and nothing is shown to visitors.
   * NOTE: prefer a domain containing "deshpande" + the speciality over "dira"
   * alone — see the name-collision note in docs/dira-plan.html, Section 09.
   */
  siteUrl: '',

  /**
   * Consultation fee. Stated factually or not at all — never as an offer,
   * discount or package (see compliance notes). Set to '' to hide the row.
   */
  consultationFee: '',

  /**
   * Whether physiotherapy, laboratory and pharmacy are on the premises or
   * provided through partners. Patients plan their visit around this, so the
   * site states it plainly. Set each to 'on-site' | 'partnered' | 'none'.
   */
  facilities: {
    physiotherapy: 'on-site' as 'on-site' | 'partnered' | 'none',
    laboratory: 'on-site' as 'on-site' | 'partnered' | 'none',
    pharmacy: 'on-site' as 'on-site' | 'partnered' | 'none',
  },

  /**
   * Teleconsultation. If set to true, add the terms page required under the
   * Telemedicine Practice Guidelines, 2020 before enabling.
   */
  teleconsultation: false,
} as const

// ---------------------------------------------------------------------------
// Helpers — these make an unfilled placeholder loud rather than silent.
// ---------------------------------------------------------------------------

/** True when a field has not been filled in yet. */
export function isTodo(value: unknown): boolean {
  return value === TODO
}

/**
 * True when a field holds something displayable. An empty string is a
 * deliberate "hide this for now"; a TODO is an unfilled placeholder. Neither
 * should reach the page.
 */
export function has(value: string): boolean {
  return !isTodo(value) && value.trim() !== ''
}

/**
 * Renders a value, or a visible bracketed marker if it is still a placeholder.
 * Never returns an empty string for a TODO — an invisible gap ships silently,
 * a bracketed marker does not.
 */
export function orMarker(value: string, marker: string): string {
  return isTodo(value) ? `[${marker}]` : value
}

/** A tel: href, or undefined when the number is not yet known. */
export function telHref(): string | undefined {
  return isTodo(clinic.phoneDial) ? undefined : `tel:+${clinic.phoneDial}`
}

/** A WhatsApp deep link with a prefilled message, or undefined. */
export function whatsappHref(message?: string): string | undefined {
  if (isTodo(clinic.whatsapp)) return undefined
  const text = message ?? 'Hello, I would like to request an appointment at DIRA.'
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`
}

/** A mailto: href, or undefined. */
export function mailHref(subject?: string): string | undefined {
  if (isTodo(clinic.email)) return undefined
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : ''
  return `mailto:${clinic.email}${q}`
}

/** The full address as a single line, with markers for missing parts. */
export function addressLine(): string {
  return [
    orMarker(clinic.address.line1, 'ADD STREET ADDRESS'),
    clinic.address.line2,
    orMarker(clinic.city, 'ADD CITY'),
    orMarker(clinic.state, 'ADD STATE'),
    orMarker(clinic.address.postalCode, 'ADD PIN CODE'),
  ]
    .filter(Boolean)
    .join(', ')
}

/** "Indiranagar, Bangalore" — locality and city, skipping whichever is absent. */
export function locality(): string {
  return [clinic.address.line2, isTodo(clinic.city) ? '' : clinic.city]
    .filter(Boolean)
    .join(', ') || orMarker(clinic.city, 'ADD CITY')
}

/** City name for titles and headings, falling back to a visible marker. */
export function cityName(): string {
  return orMarker(clinic.city, 'ADD CITY')
}

/** Base URL for canonicals and sitemap. Falls back to a placeholder host. */
export function siteUrl(): string {
  return has(clinic.siteUrl) ? clinic.siteUrl : 'https://example.invalid'
}
