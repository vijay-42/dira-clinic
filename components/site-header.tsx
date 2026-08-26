'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from './ui'
import { Logo } from './logo'
import { IconPhone, IconWhatsApp, IconMail, IconPin, IconChevron } from './icons'
import { clinic, telHref, whatsappHref, mailHref, isTodo, cityName } from '@/content/clinic'
import { serviceMenu } from '@/content/service-pages'

/**
 * Header navigation, deliberately kept to four items.
 *
 * "Doctors" points at the consultant's profile, not the /for-doctors/ referral
 * page — that is the usual reading of the word in a clinic menu sitting beside
 * About and Services.
 *
 * Conditions, Patient Education, FAQ and For Doctors are no longer in the
 * header. They are not orphaned: the footer lists all nine pages on every
 * page, they stay in sitemap.xml, and each is linked from the body copy of the
 * pages it belongs with.
 */
const primaryNav = [
  { href: '/about/', label: 'About' },
  { href: '/dr-gaurang-deshpande/', label: 'Doctors' },
  { href: '/services/', label: 'Services', children: serviceMenu },
  { href: '/contact/', label: 'Contact us' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const isWithin = (item: { children?: readonly { href: string }[] }) =>
    !!item.children?.some((c) => pathname === c.href)
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

      <header className="header-sticky sticky top-0 z-30 border-b border-rule-soft bg-surface/95 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between gap-6 py-3.5">
            <Link href="/" aria-label="DIRA — home" className="flex shrink-0 items-center text-ink">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
              {primaryNav.map((item) => {
                const link = (
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`relative inline-flex items-center gap-1 py-1 text-[0.88rem] font-medium transition-colors hover:text-brand ${
                      isActive(item.href) || (item.children && isWithin(item)) ? 'text-brand' : 'text-muted'
                    }`}
                  >
                    {item.label}
                    {item.children ? (
                      <IconChevron className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    ) : null}
                    {isActive(item.href) ? (
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-[calc(100%-0.75rem)] rounded-full bg-brand" />
                    ) : null}
                  </Link>
                )

                if (!item.children) return <div key={item.href}>{link}</div>

                /* Opens on hover and on keyboard focus. `invisible` keeps the
                   panel out of the tab order until the trigger is focused;
                   focusing the trigger fires group-focus-within, which reveals
                   the panel so it can then be tabbed into. The pt-3 on the
                   wrapper is a hover bridge — without it the pointer loses
                   hover crossing the gap. */
                return (
                  <div key={item.href} className="group relative">
                    {link}
                    <div className="invisible absolute left-0 top-full z-40 w-[17rem] pt-3 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <div className="card overflow-hidden p-0">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            aria-current={isActive(sub.href) ? 'page' : undefined}
                            className={`block border-b border-rule-soft px-4 py-3 text-[0.88rem] leading-snug last:border-b-0 hover:bg-brand-tint hover:text-brand ${
                              isActive(sub.href) ? 'bg-brand-tint font-medium text-brand' : 'text-ink'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
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
            <details className="group relative lg:hidden">
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
                {primaryNav.map((item) => (
                  <div key={item.href} className="border-b border-rule-soft last:border-b-0">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`block px-4 py-3 text-[0.95rem] ${
                        isActive(item.href)
                          ? 'bg-brand-tint font-medium text-brand'
                          : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="border-t border-rule-soft bg-paper pb-1.5">
                        {item.children.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              aria-current={isActive(sub.href) ? 'page' : undefined}
                              className={`block py-2 pl-7 pr-4 text-[0.88rem] leading-snug ${
                                isActive(sub.href) ? 'font-medium text-brand' : 'text-muted'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </nav>
            </details>
          </div>
        </Container>
      </header>
    </>
  )
}
