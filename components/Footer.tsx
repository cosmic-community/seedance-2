interface FooterProps {
  siteName: string
  footerNote: string
}

export default function Footer({ siteName, footerNote }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-ink-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p className="flex items-center gap-2 text-base font-extrabold tracking-tight">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-400 to-accent-500"
          />
          {siteName}
        </p>
        <p className="text-sm text-white/55">{footerNote}</p>
      </div>
    </footer>
  )
}