export function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 animate-grid-pan motion-reduce:animate-none"
      style={{
        backgroundImage:
          'linear-gradient(hsl(var(--accent-cyan) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent-cyan) / 0.04) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
      }}
    />
  )
}
