export function BlackHole({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Tashqi akkretsion disk (Interstellar uslubi) */}
      <div className="animate-spin-slow absolute aspect-square w-full rounded-full">
        <div
          className="absolute inset-0 rounded-full opacity-90"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, oklch(0.78 0.14 75 / 0.9) 18%, oklch(0.85 0.16 60 / 0.95) 28%, oklch(0.7 0.13 230 / 0.5) 50%, transparent 62%, oklch(0.78 0.14 75 / 0.85) 82%, transparent 100%)',
            maskImage:
              'radial-gradient(circle, transparent 38%, black 41%, black 60%, transparent 64%)',
            WebkitMaskImage:
              'radial-gradient(circle, transparent 38%, black 41%, black 60%, transparent 64%)',
            filter: 'blur(6px)',
          }}
        />
      </div>

      {/* Ichki tezroq aylanuvchi halqa */}
      <div className="animate-spin-reverse absolute aspect-square w-[78%] rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 120deg, transparent 0%, oklch(0.9 0.15 70 / 0.95) 20%, oklch(0.75 0.12 220 / 0.4) 55%, transparent 70%, oklch(0.88 0.14 65 / 0.7) 92%, transparent 100%)',
            maskImage:
              'radial-gradient(circle, transparent 40%, black 43%, black 55%, transparent 58%)',
            WebkitMaskImage:
              'radial-gradient(circle, transparent 40%, black 43%, black 55%, transparent 58%)',
            filter: 'blur(3px)',
          }}
        />
      </div>

      {/* Foton halqasi yorug'ligi */}
      <div className="animate-pulse-glow absolute aspect-square w-[42%] rounded-full ring-2 ring-primary/60 shadow-[0_0_60px_20px_oklch(0.78_0.14_75_/_0.35)]" />

      {/* Voqealar ufqi (qora markaz) */}
      <div className="absolute aspect-square w-[40%] rounded-full bg-black shadow-[inset_0_0_40px_10px_oklch(0_0_0)]" />
    </div>
  )
}
