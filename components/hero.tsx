import { BlackHole } from '@/components/black-hole'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Yulduzli fon */}
      <div className="starfield absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 lg:pb-28 lg:pt-24">
        {/* Qora tuynuk */}
        <BlackHole className="mb-[-2rem] h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="size-1.5 rounded-full bg-primary" />
          Kelajak texnologiyalari shu yerda
        </span>

        <h1 className="max-w-3xl text-balance text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Kosmik darajadagi{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            mexanik klaviaturalar
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          Mexanik, geyming, simsiz va ofis klaviaturalari — eng sara modellarni
          arzon narxlarda bir joydan toping. Tez yetkazib berish va kafolat
          bilan.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#mahsulotlar"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Xaridni boshlash
          </a>
          <a
            href="#afzalliklar"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-card"
          >
            Batafsil
          </a>
        </div>
      </div>
    </section>
  )
}
