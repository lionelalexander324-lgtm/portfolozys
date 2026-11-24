import { ArrowUpRight } from 'lucide-react'
import type { PointerEvent, ReactNode } from 'react'

export function ExternalLinkButton({ href, children, className = '' }: { href: string, children: ReactNode, className?: string }) {
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - .5) * 5
    const y = ((event.clientY - rect.top) / rect.height - .5) * 4
    event.currentTarget.style.setProperty('--magnet-x', `${x}px`)
    event.currentTarget.style.setProperty('--magnet-y', `${y}px`)
  }
  const reset = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--magnet-x', '0px')
    event.currentTarget.style.setProperty('--magnet-y', '0px')
  }

  return <a className={`external-link-button ${className}`.trim()} href={href} target="_blank" rel="noopener noreferrer" onPointerMove={move} onPointerLeave={reset}>
    <span>{children}</span><ArrowUpRight aria-hidden="true" />
  </a>
}
