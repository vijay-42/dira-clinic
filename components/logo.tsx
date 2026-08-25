import { clinic } from '@/content/clinic'

/**
 * DIRA logo.
 *
 * The supplied artwork (public/logo.jpeg) is a raster with baked-in bevels and
 * a drop shadow drawn for a white ground. Two derived assets are generated from
 * it — see scripts/build-logo.py:
 *
 *   public/logo-mark.png  the circular emblem alone, background removed
 *   public/logo-full.png  the full lockup including wordmark and tagline
 *
 * Because the shadow was drawn for white, the mark always sits on a white chip
 * when the surface behind it is not already white. On a light header the chip
 * is invisible; on the deep blue footer it reads as a deliberate white badge.
 *
 * If an SVG or transparent-PNG master ever arrives from the designer, drop it
 * in and delete the generator — it will render more crisply at small sizes.
 */

/** The circular emblem: antibody, joint, DNA helix and leaves. */
export function LogoMark({
  className = '',
  chip = true,
}: {
  className?: string
  /** White backing, so the artwork's shadow reads correctly on any surface. */
  chip?: boolean
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden ${
        chip ? 'bg-white' : ''
      } ${className}`}
      style={chip ? { borderRadius: '22%' } : undefined}
    >
      <img
        src="/logo-mark.png"
        alt=""
        width={192}
        height={190}
        className="h-[86%] w-[86%] object-contain"
      />
    </span>
  )
}

/** Emblem plus wordmark, as used in the header. */
export function Logo({
  className = '',
  tone = 'brand',
}: {
  className?: string
  /** 'mono' inherits currentColor for the wordmark, for use on dark bands. */
  tone?: 'brand' | 'mono'
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-11 w-11" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-display)] text-[1.4rem] font-bold tracking-[0.13em] ${
            tone === 'brand' ? 'text-brand' : ''
          }`}
        >
          DIRA
        </span>
        <span className="mt-1.5 text-[0.58rem] font-medium uppercase tracking-[0.13em] opacity-70">
          {clinic.descriptor}
        </span>
      </span>
    </span>
  )
}

/**
 * The complete supplied lockup — emblem, wordmark and tagline as drawn.
 * Light surfaces only: the tagline is dark navy and disappears on a dark band,
 * so this renders on a white card wherever it is used.
 */
export function LogoLockup({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center bg-white ${className}`}>
      <img
        src="/logo-full.png"
        alt="DIRA — Deshpande Immunology & Rheumatology Association. Immunity Aligned. Movement Redefined."
        width={480}
        height={603}
        className="h-auto w-full object-contain"
      />
    </span>
  )
}
