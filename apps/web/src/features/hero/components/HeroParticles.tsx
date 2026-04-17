import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const particleOptions = {
  background: { color: 'transparent' },
  particles: {
    number: { value: 35 },
    color: { value: '#28e98c' },
    opacity: { value: { min: 0.05, max: 0.25 } },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true,
      speed: 0.4,
      direction: 'none' as const,
      random: true,
      outModes: { default: 'bounce' as const },
    },
    links: { enable: false },
  },
  detectRetina: true,
} as const

export function HeroParticles() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id="hero-particles"
      options={particleOptions}
      className="absolute inset-0 z-0"
    />
  )
}
