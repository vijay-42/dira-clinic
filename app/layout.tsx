import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Spectral, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileContactBar } from '@/components/contact-bar'
import { clinic, siteUrl, isTodo, locality } from '@/content/clinic'
import { clinicSchema, JsonLd } from '@/lib/schema'

/* Fonts are downloaded at build time and served from our own origin — no
   request ever leaves for a third-party font server. */
/* Headings: a geometric sans with a friendly bold, in the register of a modern
   clinic site. Not Poppins, which is the default everyone reaches for. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
})

/* Spectral is kept for pull quotes only — an editorial serif still adds warmth
   where a person is being quoted. */
const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-spectral',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
})

const city = isTodo(clinic.city) ? '' : `, ${clinic.city}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    // Never the bare acronym: "DIRA" is also a rare autoinflammatory disease,
    // so every title pairs the name with the speciality and the city.
    default: `DIRA${city} — Rheumatology & Clinical Immunology`,
    template: `%s — DIRA${city}`,
  },
  description: `Expert rheumatology and clinical immunology care in ${locality()}. Led by Dr Gaurang Deshpande, Consultant Rheumatologist & Clinical Immunologist — arthritis, autoimmune disease, joint pain, allergy, chronic pain and difficult-to-diagnose inflammatory conditions.`,
  applicationName: clinic.legalName,
  authors: [{ name: clinic.legalName }],
  openGraph: {
    type: 'website',
    siteName: `DIRA — ${clinic.legalName}`,
    locale: 'en_IN',
    title: `DIRA${city} — Rheumatology & Clinical Immunology`,
    description: `Rheumatology, clinical immunology, allergy and chronic pain in ${locality()}. Clarity when the diagnosis is uncertain. Expertise when it is clear.`,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport = {
  // Light only — see the note at the top of globals.css.
  themeColor: '#123A83',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${jakarta.variable} ${spectral.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileContactBar />
        <JsonLd data={clinicSchema()} />
      </body>
    </html>
  )
}
