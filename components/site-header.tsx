'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from './ui'
import { Logo } from './logo'
import { IconPhone, IconWhatsApp, IconMail, IconPin } from './icons'
import { clinic, telHref, whatsappHref, mailHref, isTodo, cityName } from '@/content/clinic'

const primaryNav = [
  { href: '/about/', label: 'About DIRA' },
  { href: '/dr-gaurang-deshpande/', label: 'Dr Deshpande' },
  { href: '/conditions/', label: 'Conditions' },
  { href: '/services/', label: 'Services' },
  { href: '/patient-education/', label: 'Patient Education' },
  { href: '/for-doctors/', label: 'For Doctors' },
]

const mobileExtra = [{ href: '/faq/', label: 'FAQ' }]

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const tel = telHref()
  const wa = whatsappHref()
  const mail = mailHref('Appointment enquiry')

  return (
    <>
      {/* Utility bar — contact details above the fold on every page */}
      <div className="bg-brand-surface text-[color:var(--c-on-brand-surface)]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-[0.82rem]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <a
                href={tel ?? '/contact/'}
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <IconPhone className="h-4 w-4" />
                {isTodo(clinic.phone) ? '[ADD PHONE NUMBER]' : clinic.phone}
              </a>
              <a
                href={mail ?? '/contact/'}
                className="hidden items-center gap-1.5 hover:underline sm:inline-flex"
              >
                <IconMail className="h-4 w-4" />
                {isTodo(clinic.email) ? '[ADD EMAIL ADDRESS]' : clinic.email}
              </a>
            </div>
            <p className="hidden items-center gap-1.5 opacity-90 md:flex">
              <IconPin className="h-4 w-4" />
              {cityName()}
            </p>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-30 border-b border-rule-soft bg-surface/95 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between gap-6 py-3.5">
            <Link href="/" aria-label="DIRA — home" className="shrink-0 text-ink">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`relative py-1 text-[0.88rem] font-medium transition-colors hover:text-brand ${
                    isActive(item.href) ? 'text-brand' : 'text-muted'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand" />
                  ) : null}
                </Link>
              ))}
              <a
                href={wa ?? '/contact/'}
                {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="btn btn-warm min-h-0 px-4 py-2.5 text-[0.88rem]"
              >
                <IconWhatsApp className="h-4 w-4" />
                Book appointment
              </a>
            </nav>

            {/* Mobile menu — a <details> disclosure, so it needs no JavaScript */}
            <details className="group relative xl:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-[10px] border border-rule px-3 py-2 text-[0.85rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                Menu
                <span aria-hidden="true" className="flex flex-col gap-[3.5px]">
                  <span className="block h-0.5 w-4 rounded bg-brand" />
                  <span className="block h-0.5 w-4 rounded bg-brand" />
                  <span className="block h-0.5 w-4 rounded bg-brand" />
                </span>
              </summary>
              <nav
                aria-label="Primary"
                className="card absolute right-0 top-full z-40 mt-3 w-[17rem] overflow-hidden p-0"
              >
                {[...primaryNav, ...mobileExtra, { href: '/contact/', label: 'Contact' }].map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`block border-b border-rule-soft px-4 py-3 text-[0.95rem] last:border-b-0 ${
                        isActive(item.href)
                          ? 'bg-brand-tint font-medium text-brand'
                          : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
            </details>
          </div>
        </Container>
      </header>
    </>
  )
}
