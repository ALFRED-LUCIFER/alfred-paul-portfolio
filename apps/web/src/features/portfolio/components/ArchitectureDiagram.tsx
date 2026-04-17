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
        primaryColor: '#1e2330',
        primaryTextColor: '#e2e8f0',
        primaryBorderColor: accentColor,
        lineColor: accentColor,
        secondaryColor: '#252d3d',
        tertiaryColor: '#1a2035',
        background: '#1e2330',
        mainBkg: '#1e2330',
        nodeBorder: accentColor,
        clusterBkg: '#1a2035',
        clusterBorder: accentColor,
        titleColor: '#e2e8f0',
        edgeLabelBackground: '#1e2330',
        fontFamily: 'JetBrains Mono, monospace',
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

    return () => { cancelled = true }
  }, [diagram, accentColor])

  if (error) {
    return (
      <div className="rounded-xl p-4 bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
        {error}
      </div>
    )
  }

  return (
    <div
      className="w-full overflow-x-auto rounded-xl p-4 min-h-[120px] flex items-center justify-center"
      style={{ background: '#1e2330', border: `1px solid ${accentColor}30` }}
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
