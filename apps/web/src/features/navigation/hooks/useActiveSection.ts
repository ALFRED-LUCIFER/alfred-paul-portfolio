import { useState, useEffect } from 'react'

const SECTION_IDS = [
  'home',
  'identity',
  'systems',
  'architecture',
  'sdlc',
  'leadership',
  'skills',
  'case-studies',
  'certifications',
  'signals',
  'testimonials',
  'contact',
]

export function useActiveSection(): string {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    })

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return active
}
