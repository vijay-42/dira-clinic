import Link from 'next/link'
import { Container } from '@/components/ui'
import { IconArrow } from '@/components/icons'
import { nav } from '@/content/site'

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <p className="pill">Error 404</p>
      <h1 className="display-l mt-5 max-w-[16ch]">This page doesn’t exist</h1>
      <p className="lede measure mt-5">
        The address may have changed, or the link that brought you here may be out of date.
      </p>
      <div className="mt-10 grid max-w-[46rem] gap-3 sm:grid-cols-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card group flex items-center justify-between gap-4 p-4"
          >
            <span className="font-medium group-hover:text-brand">{item.label}</span>
            <IconArrow className="h-4 w-4 shrink-0 text-brand" />
          </Link>
        ))}
      </div>
    </Container>
  )
}
