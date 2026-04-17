import { useState, useEffect } from 'react'

const SECTION_IDS = ['home', 'about', 'resume', 'services', 'skills', 'portfolio', 'testimonials', 'contact']

export function useActiveSection(): string {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

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

    observers.push(observer)

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}
