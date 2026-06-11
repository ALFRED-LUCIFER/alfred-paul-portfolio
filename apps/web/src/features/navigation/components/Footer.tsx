import { Github, Linkedin, Mail } from 'lucide-react'
import { StatusBadge } from '../../../shared/ui/StatusBadge'

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="container-grid flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-4">
          <img src="/images/apex-logo-white.png" alt="Apex Forge" className="h-7 w-auto opacity-70" />
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] text-muted-foreground">
              alfred@paul:~$ <span className="text-accent-cyan">uptime</span> — building since 2013
            </p>
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Alfred Paul. All rights reserved.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:alfred.v.paul@gmail.com"
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-accent-cyan"
          >
            <Mail className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/alfred-paul-56438454"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-accent-cyan"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="https://github.com/ALFRED-LUCIFER"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-accent-cyan"
          >
            <Github className="size-4" />
          </a>
          <StatusBadge status="online" />
        </div>
      </div>

      {/* Konami easter egg hint */}
      <p className="pb-4 text-center font-mono text-xs text-muted-foreground/25 select-none">
        ↑↑↓↓←→←→BA
      </p>
    </footer>
  )
}

export default Footer
