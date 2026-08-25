import { doctor } from '@/content/doctor'

/**
 * Dr Deshpande's portrait. `object-top` keeps the face anchored when the frame
 * is cropped, rather than centring and cutting the top of the head.
 */
export function DoctorPortrait({
  className = '',
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <img
      src="/dr-deshpande.jpg"
      alt={`${doctor.name}, ${doctor.title}`}
      width={510}
      height={630}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`h-full w-full object-cover object-top ${className}`}
    />
  )
}
