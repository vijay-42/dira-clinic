import { clinic } from '@/content/clinic'

/**
 * DIRA logo.
 *
 * The supplied artwork is a horizontal lockup on a white background, with
 * bevels and a drop shadow baked into the pixels. Three variants are derived
 * from it by `npm run build:assets` — see scripts/build-assets.py:
 *
 *   public/logo-mark.png  the circular emblem alone
 *   public/logo-full.png  the complete lockup, tagline included
 *
 * Two rules follow from the artwork itself:
 *
 *   1. The shadow was drawn for white, so the logo sits on a white chip
 *      wherever the surface behind it is not already white. On the light
 *      header the chip is invisible; on the deep blue footer it reads as a
 *      deliberate white badge.
 *   2. The tagline is dark navy and disappears on a dark band, so the lockup
 *      is only ever used on a light surface — which the white chip guarantees.
 *
 * If a vector master arrives, drop it in and delete the generator — it will
 * render more crisply at small sizes.
 */

/** The circular emblem alone. */
export function LogoMark({
  className = '',
  chip = true,
}: {
  className?: string
  chip?: boolean
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden ${
        chip ? 'bg-white' : ''
      } ${className}`}
      style={chip ? { borderRadius: '22%' } : undefined}
    >
      <img
        src="/logo-mark.png"
        alt=""
        width={192}
        height={188}
        className="h-[86%] w-[86%] object-contain"
      />
    </span>
  )
}

/** Emblem plus wordmark — the header lockup. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`flex items-center bg-white px-2 py-1 ${className}`}
      style={{ borderRadius: '10px' }}
    >
      <img
        src="/logo-full.png"
        alt={`${clinic.name} — ${clinic.legalName}. ${clinic.strapline}`}
        width={448}
        height={140}
        className="block h-11 w-auto sm:h-14 lg:h-16"
      />
    </span>
  )
}

/**
 * The complete supplied lockup, tagline included.
 * Light surfaces only — the tagline is dark navy and vanishes on a dark band.
 */
export function LogoLockup({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center bg-white ${className}`}>
      <img
        src="/logo-full.png"
        alt={`${clinic.name} — ${clinic.legalName}. ${clinic.strapline}`}
        width={448}
        height={140}
        className="block h-auto w-full object-contain"
      />
    </span>
  )
}
