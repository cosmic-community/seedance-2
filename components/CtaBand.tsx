import CtaButton from '@/components/CtaButton'

interface CtaBandProps {
  headline: string
  ctaLabel: string
  ctaUrl: string
  signupNote: string
}

export default function CtaBand({ headline, ctaLabel, ctaUrl, signupNote }: CtaBandProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden border-t border-white/5 bg-ink-950 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-600/30 via-ink-950 to-accent-500/20"
      />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-heading"
          className="text-3xl font-black tracking-tight sm:text-5xl"
        >
          {headline}
        </h2>
        <div className="mt-10 flex flex-col items-center gap-3">
          <CtaButton href={ctaUrl} label={ctaLabel} size="lg" />
          <p className="text-sm text-white/60">{signupNote}</p>
        </div>
      </div>
    </section>
  )
}