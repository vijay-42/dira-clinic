import { clinic, isTodo, siteUrl } from '@/content/clinic'
import { doctor } from '@/content/doctor'

/** Only include a field when it has actually been supplied. An empty string
 * is a deliberate "not yet"; it must not surface as an empty property. */
function present<T>(value: T): T | undefined {
  if (isTodo(value)) return undefined
  if (typeof value === 'string' && value.trim() === '') return undefined
  return value
}

/** Maps the hours table to schema.org openingHoursSpecification. */
const DAY_MAP: Record<string, string[]> = {
  'Monday – Friday': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  Saturday: ['Saturday'],
  Sunday: ['Sunday'],
}

/** Undefined rather than an empty array — an empty property is worse than none. */
function openingHours() {
  const rows = clinic.hours
    .filter((h) => !h.closed && present(h.time) !== undefined)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_MAP[h.days] ?? [h.days],
      description: h.time,
    }))
  return rows.length > 0 ? rows : undefined
}

/**
 * MedicalClinic + Physician structured data. This is what makes a name search
 * for "Dr Gaurang Deshpande rheumatologist" return the site first.
 */
export function clinicSchema() {
  const base = siteUrl()

  const address = {
    '@type': 'PostalAddress',
    streetAddress: present(clinic.address.line1),
    addressLocality: present(clinic.city),
    addressRegion: present(clinic.state),
    postalCode: present(clinic.address.postalCode),
    addressCountry: 'IN',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        '@id': `${base}/#clinic`,
        name: clinic.name,
        legalName: clinic.legalName,
        url: `${base}/`,
        description:
          'Specialist centre for rheumatology, clinical immunology and immune-related health concerns.',
        medicalSpecialty: ['Rheumatologic', 'Immunologic'],
        address,
        telephone: present(clinic.phone),
        email: present(clinic.email),
        hasMap: present(clinic.mapsUrl),
        sameAs: clinic.social.map((s) => s.url),
        openingHoursSpecification: openingHours(),
        availableService: [
          'Rheumatology consultation',
          'Clinical immunology consultation',
          'Allergy and immune-related evaluation',
          'Second opinions',
          'Chronic pain management',
          'Physiotherapy and rehabilitation',
        ],
      },
      {
        '@type': 'Physician',
        '@id': `${base}/#physician`,
        name: doctor.name,
        jobTitle: doctor.title,
        url: `${base}/dr-gaurang-deshpande/`,
        medicalSpecialty: ['Rheumatologic', 'Immunologic'],
        worksFor: { '@id': `${base}/#clinic` },
        address,
        telephone: present(clinic.phone),
        alumniOf: doctor.training
          .filter((t) => present(t.institution) !== undefined)
          .map((t) => ({ '@type': 'EducationalOrganization', name: t.institution })),
        hasCredential: doctor.degrees.map((d) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: d,
        })),
      },
    ],
  }
}

/** BreadcrumbList for a page nested under a section. */
export function breadcrumbSchema(
  trail: readonly { name: string; path: string }[],
) {
  const base = siteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: `${base}${step.path}`,
    })),
  }
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
