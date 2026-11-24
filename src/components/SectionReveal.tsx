import { useLayoutEffect } from 'react'

const sectionIds = ['about', 'work-index', 'campaigns', 'splash', 'web', 'motion', 'contact']

export function SectionReveal() {
  useLayoutEffect(() => {
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    sections.forEach(section => section.classList.add('section-reveal'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach(section => section.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: .08, rootMargin: '0px 0px -12% 0px' })

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return null
}
