import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface Props {
  diagram: string
  accentColor: string
}

let renderCounter = 0

export function ArchitectureDiagram({ diagram, accentColor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const id = `mermaid-render-${++renderCounter}`

    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#0c1220',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: accentColor,
        lineColor: accentColor,
        secondaryColor: '#0a0e14',
        tertiaryColor: '#07090d',
        background: '#0c1220',
        mainBkg: '#0c1220',
        nodeBorder: accentColor,
        clusterBkg: '#0a0e14',
        clusterBorder: accentColor,
        titleColor: '#f8fafc',
        edgeLabelBackground: '#0c1220',
        fontFamily: 'JetBrains Mono Variable, JetBrains Mono, monospace',
        fontSize: '13px',
      },
      flowchart: { curve: 'basis', padding: 16 },
    })

    mermaid
      .render(id, diagram)
      .then(({ svg: renderedSvg }) => {
        if (!cancelled) {
          setSvg(renderedSvg)
          setLoading(false)
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(String(e))
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [diagram, accentColor])

  if (error) {
    return (
      <div className="rounded-xl p-4 bg-destructive/10 border border-destructive/30 text-xs text-destructive font-mono">
        {error}
      </div>
    )
  }

  return (
    <div
      className="w-full overflow-x-auto rounded-xl p-4 min-h-[120px] flex items-center justify-center bg-panel"
      style={{ border: `1px solid ${accentColor}30` }}
    >
      {loading ? (
        <div className="text-xs font-mono animate-pulse" style={{ color: accentColor }}>
          rendering diagram...
        </div>
      ) : (
        <div
          ref={containerRef}
          className="w-full [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg ?? '' }}
        />
      )}
    </div>
  )
}
