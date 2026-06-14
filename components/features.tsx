import { Truck, ShieldCheck, Headphones, CreditCard } from 'lucide-react'

const afzalliklar = [
  {
    icon: Truck,
    sarlavha: 'Tez yetkazib berish',
    matn: "Toshkent bo'ylab 24 soat ichida, viloyatlarga 2-3 kunda.",
  },
  {
    icon: ShieldCheck,
    sarlavha: 'Rasmiy kafolat',
    matn: 'Barcha mahsulotlarga 12-24 oygacha kafolat beriladi.',
  },
  {
    icon: Headphones,
    sarlavha: "24/7 qo'llab-quvvatlash",
    matn: 'Savollaringizga istalgan vaqtda javob beramiz.',
  },
  {
    icon: CreditCard,
    sarlavha: "Qulay to'lov",
    matn: "Naqd, karta yoki muddatli to'lov imkoniyati.",
  },
]

export function Features() {
  return (
    <section id="afzalliklar" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nega aynan NebulaTech?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {afzalliklar.map((a) => (
            <div
              key={a.sarlavha}
              className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <a.icon className="size-5" />
              </span>
              <h3 className="font-semibold text-card-foreground">
                {a.sarlavha}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {a.matn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
