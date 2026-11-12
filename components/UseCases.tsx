interface UseCasesProps {
  useCases: string[]
}

export default function UseCases({ useCases }: UseCasesProps) {
  if (!useCases || useCases.length === 0) {
    return null
  }

  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="relative overflow-hidden border-t border-white/5 bg-ink-900 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
            Use cases
          </p>
          <h2
            id="use-cases-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl"
          >
            Made for what you create
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {useCases.map((useCase, index) => (
            <li
              key={`${useCase}-${index}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/60 px-5 py-5 transition hover:border-accent-400/50 hover:bg-ink-800"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-lg font-semibold tracking-tight">{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}