const NAVIGATION_EVENT = 'portfolio:navigation'

type NavigationEvent = {
  preventDefault: () => void
  metaKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

let navigationFrame = 0

export function requestPageTransition(event: NavigationEvent, href: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const destination = document.querySelector<HTMLElement>(href)
  if (!destination) return

  event.preventDefault()
  if (navigationFrame) window.cancelAnimationFrame(navigationFrame)
  navigationFrame = window.requestAnimationFrame(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.history.replaceState(null, '', href)
    destination.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
    window.dispatchEvent(new CustomEvent(NAVIGATION_EVENT, { detail: { href } }))
    navigationFrame = 0
  })
}

export const PORTFOLIO_NAVIGATION_EVENT = NAVIGATION_EVENT
