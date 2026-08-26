import { doctor } from '@/content/doctor'

/**
 * Dr Deshpande's portrait. `object-top` keeps the face anchored when the frame
 * is cropped, rather than centring and cutting the top of the head.
 */
export function DoctorPortrait({
  className = '',
  priority = false,
  fill = false,
}: {
  className?: string
  priority?: boolean
  /**
   * Take the image out of layout flow, filling its nearest positioned
   * ancestor. Without this an <img> contributes its INTRINSIC height to the
   * row even with `h-full`, so in a stretch grid the photo silently dictates
   * how tall the banner is. Use inside a `relative` container.
   */
  fill?: boolean
}) {
  return (
    <img
      src="/dr-deshpande.webp"
      alt={`${doctor.name}, ${doctor.title}`}
      width={510}
      height={630}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`${
        fill ? 'absolute inset-0' : ''
      } h-full w-full object-cover object-top ${className}`}
    />
  )
}
