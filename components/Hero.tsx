import CtaButton from '@/components/CtaButton'

interface HeroProps {
  headline: string
  subheadline: string
  imageUrl: string
  ctaLabel: string
  ctaUrl: string
  signupNote: string
}

export default function Hero({
  headline,
  subheadline,
  imageUrl,
  ctaLabel,
  ctaUrl,
  signupNote,
}: HeroProps) {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          width={2400}
          height={1350}
          fetchPriority="high"
          className="absolute inset-0 -z-30 h-full w-full object-cover opacity-60"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-ink-950/80 via-ink-950/50 to-ink-950"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-r from-ink-950 via-ink-950/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
      />

      <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-brand-300 to-accent-400 bg-clip-text text-transparent">
              {headline}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3">
            <CtaButton href={ctaUrl} label={ctaLabel} size="lg" />
            <p className="text-sm text-white/60">{signupNote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}