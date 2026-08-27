import { telHref, whatsappHref, clinic, isTodo } from '@/content/clinic'
import { IconWhatsApp, IconPhone } from './icons'
import { BookAppointmentButton } from './booking-dialog'

/** Fixed bottom bar on mobile: phone and WhatsApp always one tap away. */
export function MobileContactBar() {
  const tel = telHref()
  const wa = whatsappHref()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-rule bg-surface shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.18)] lg:hidden">
      <a
        href={wa ?? '/contact/'}
        {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex min-h-[3.6rem] items-center justify-center gap-2 border-r border-rule bg-[#25D366] text-[0.92rem] font-semibold text-white"
      >
        <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
        WhatsApp
      </a>
      <a
        href={tel ?? '/contact/'}
        className="flex min-h-[3.6rem] items-center justify-center gap-2 bg-brand text-[0.92rem] font-semibold text-[color:var(--c-on-brand)]"
      >
        <IconPhone className="h-[1.05rem] w-[1.05rem]" />
        Call the clinic
      </a>
    </div>
  )
}

/**
 * The two primary calls to action.
 *
 * The first opens the appointment dialog rather than jumping straight into
 * WhatsApp: the clinic gets a name, a number and a reason instead of an empty
 * "hello", and the patient still ends up in WhatsApp on submit. `message` is
 * carried into the dialog as the opening line, so the enquiry keeps the
 * context of the page it was made from.
 */
export function AppointmentActions({
  className = '',
  message,
  onDark = false,
}: {
  className?: string
  message?: string
  onDark?: boolean
}) {
  const tel = telHref()

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <BookAppointmentButton
        topic={message}
        className={`btn ${onDark ? 'btn-on-dark' : 'btn-solid'}`}
      >
        <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
        Book appointment
      </BookAppointmentButton>
      <a
        href={tel ?? '/contact/'}
        className={`btn ${
          onDark
            ? 'border-white/60 bg-transparent text-[color:var(--c-on-brand-surface)] hover:bg-white/10'
            : 'btn-ghost'
        }`}
      >
        <IconPhone className="h-[1.05rem] w-[1.05rem]" />
        {isTodo(clinic.phone) ? 'Call the clinic' : clinic.phone}
      </a>
    </div>
  )
}
