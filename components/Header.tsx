import CtaButton from '@/components/CtaButton'

interface HeaderProps {
  siteName: string
  ctaLabel: string
  ctaUrl: string
}

export default function Header({ siteName, ctaLabel, ctaUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur-lg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-full bg-gradient-to-br from-brand-400 to-accent-500"
          />
          {siteName}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-8">
          <a
            href="#features"
            className="hidden text-sm font-medium text-white/70 transition hover:text-white sm:inline"
          >
            Features
          </a>
          <a
            href="#use-cases"
            className="hidden text-sm font-medium text-white/70 transition hover:text-white sm:inline"
          >
            Use cases
          </a>
          <CtaButton href={ctaUrl} label={ctaLabel} size="sm" />
        </nav>
      </div>
    </header>
  )
}