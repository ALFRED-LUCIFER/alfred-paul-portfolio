import { useTheme } from '../../../shared/context/ThemeContext'

const Footer = () => {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/images/apex-logo-white.png' : '/images/apex-logo-dark.png'

  return (
    <footer className="bg-background text-foreground py-10 border-t border-border">
      <div className="container-drake">
        <div className="flex flex-col items-center space-y-6">

          {/* Main identity */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linear-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center p-1.5">
              <img
                src={logoSrc}
                alt="Apex Forge"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-base font-bold leading-tight">Alfred Paul</div>
              <div className="text-xs text-muted-foreground">Team Leader · AI Engineering · Dubai</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-border" />

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Alfred Paul. All rights reserved.
          </p>

          {/* Apex Forge credit */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <span>Built by</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 flex items-center justify-center">
                <img
                  src={logoSrc}
                  alt="Apex Forge"
                  className="w-full h-full object-contain opacity-50"
                />
              </div>
              <span className="font-mono font-semibold text-primary/60 tracking-wide">Apex Forge</span>
            </div>
          </div>

          {/* Easter egg hint */}
          <p className="text-muted-foreground/25 text-xs font-mono select-none">
            ↑↑↓↓←→←→BA
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
