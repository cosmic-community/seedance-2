import type { Feature } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface FeaturesGridProps {
  features: Feature[]
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  if (!features || features.length === 0) {
    return null
  }

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative border-t border-white/5 bg-ink-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
          >
            Everything in one take
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            if (!feature || !feature.id) return null
            const icon = getMetafieldValue(feature.metadata?.icon).trim() || '🎬'
            const description = getMetafieldValue(feature.metadata?.description)
            return (
              <li
                key={feature.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-400/50"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl transition group-hover:bg-accent-500/20"
                />
                <div
                  aria-hidden="true"
                  className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 text-2xl ring-1 ring-white/10"
                >
                  {icon}
                </div>
                <h3 className="relative mt-5 text-xl font-bold tracking-tight">
                  {feature.title}
                </h3>
                {description ? (
                  <p className="relative mt-2 leading-relaxed text-white/65">{description}</p>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}