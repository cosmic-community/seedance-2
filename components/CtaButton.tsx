interface CtaButtonProps {
  href: string
  label: string
  size?: 'sm' | 'lg'
}

export default function CtaButton({ href, label, size = 'lg' }: CtaButtonProps) {
  const sizing =
    size === 'sm' ? 'px-4 py-2 text-sm' : 'px-8 py-4 text-base sm:text-lg'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 font-bold text-white shadow-lg shadow-brand-600/30 transition hover:scale-[1.03] hover:shadow-brand-500/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300/60 ${sizing}`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  )
}