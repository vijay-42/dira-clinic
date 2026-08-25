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
  tagline: 'Rheumatology · Clinical Immunology · Allergy · Chronic Pain',
  /** The brand line from the supplied logo artwork. */
  strapline: 'Immunity Aligned. Movement Redefined.',
  /** Short descriptor beside the wordmark in the header. */
  descriptor: 'Immunology & Rheumatology',

  // ---- BLOCKS BUILD ------------------------------------------------------
  /** TODO City only, e.g. 'Pune'. Used in page titles and local search. */
  city: TODO,
  /** TODO State, e.g. 'Maharashtra'. */
  state: TODO,
  address: {
    /** TODO e.g. 'Suite 4, Sunrise Medical Centre, 12 FC Road' */
    line1: TODO,
    /** TODO e.g. 'Shivajinagar' — locality/area. Optional, may be ''. */
    line2: '',
    /** TODO e.g. '411005' */
    postalCode: TODO,
  },
  /** TODO Display form, e.g. '+91 20 1234 5678'. */
  phone: TODO,
  /** TODO Digits only with country code, no +/spaces, e.g. '912012345678'. */
  phoneDial: TODO,
  /** TODO Digits only with country code, e.g. '919876543210'. */
  whatsapp: TODO,
  /** TODO e.g. 'appointments@diraclinic.in' */
  email: TODO,

  /**
   * TODO Clinic hours. `closed: true` renders as "Closed".
   * Also used to generate opening-hours structured data for Google.
   */
  hours: [
    { days: 'Monday – Friday', time: TODO, closed: false },
    { days: 'Saturday', time: TODO, closed: false },
    { days: 'Sunday', time: '', closed: true },
  ],
  /** Shown beneath the hours table. Set to '' to hide. */
  hoursNote: 'Consultations are by prior appointment.',

  /** TODO Google Maps place URL, or '' to hide the directions link. */
  mapsUrl: TODO,

  // ---- BLOCKS LAUNCH -----------------------------------------------------
  /**
   * TODO NMC / State Medical Council registration number.
   * Displayed alongside qualifications — expected practice, and it signals
   * legitimacy to patients who know to check. Set to '' to omit entirely.
   */
  registrationNumber: TODO,
  /** TODO Council that issued it, e.g. 'Maharashtra Medical Council'. */
  registrationCouncil: TODO,

  /**
   * TODO Production domain, no trailing slash, e.g. 'https://diraclinic.in'.
   * Used for canonical URLs, sitemap.xml and structured data.
   * NOTE: prefer a domain containing "deshpande" + the speciality over "dira"
   * alone — see the name-collision note in docs/dira-plan.html, Section 09.
   */
  siteUrl: TODO,

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

/** City name for titles and headings, falling back to a visible marker. */
export function cityName(): string {
  return orMarker(clinic.city, 'ADD CITY')
}

/** Base URL for canonicals and sitemap. Falls back to a placeholder host. */
export function siteUrl(): string {
  return isTodo(clinic.siteUrl) ? 'https://example.invalid' : clinic.siteUrl
}
