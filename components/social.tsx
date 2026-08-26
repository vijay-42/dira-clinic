import { clinic } from '@/content/clinic'
import { socialIcons } from './icons'

/**
 * The clinic's public profiles as a row of labelled icon links.
 *
 * `tone="brand"` is for the dark footer panel; `tone="paper"` for the light
 * page background. Renders nothing at all when no profiles are listed, so
 * removing them from content/clinic.ts removes the row.
 */
export function SocialLinks({
  tone = 'paper',
  className = '',
}: {
  tone?: 'brand' | 'paper'
  className?: string
}) {
  // Widened from the `as const` literal so removing every profile still
  // type-checks — this component is meant to disappear, not to error.
  const profiles: readonly { network: string; label: string; url: string }[] =
    clinic.social
  if (profiles.length === 0) return null

  const link =
    tone === 'brand'
      ? 'border-white/25 hover:border-white/60 hover:bg-white/10'
      : 'border-rule-soft text-brand hover:border-brand hover:bg-brand-tint'

  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {profiles.map((profile) => {
        const Icon = socialIcons[profile.network]
        if (!Icon) return null
        return (
          <li key={profile.network}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`DIRA on ${profile.label}`}
              title={profile.label}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-[11px] border transition-colors ${link}`}
            >
              <Icon className="h-[1.15rem] w-[1.15rem]" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
