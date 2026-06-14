'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { products, kategoriyalar } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductGrid() {
  const [tanlangan, setTanlangan] = useState<string>('Barchasi')
  const [qidiruv, setQidiruv] = useState('')

  const filtrlangan = useMemo(() => {
    const q = qidiruv.trim().toLowerCase()
    return products.filter((p) => {
      const kategoriyaMos =
        tanlangan === 'Barchasi' || p.kategoriya === tanlangan
      const qidiruvMos =
        q === '' ||
        p.nomi.toLowerCase().includes(q) ||
        p.tavsif.toLowerCase().includes(q)
      return kategoriyaMos && qidiruvMos
    })
  }, [tanlangan, qidiruv])

  return (
    <section id="mahsulotlar" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Mahsulotlar
        </h2>
        <p className="mt-2 text-muted-foreground">
          O'zingizga mos jihozni tanlang
        </p>
      </div>

      {/* Kategoriya filtrlari */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {kategoriyalar.map((k) => (
          <button
            key={k}
            onClick={() => setTanlangan(k)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              tanlangan === k
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card/40 text-muted-foreground hover:bg-card hover:text-foreground',
            )}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {filtrlangan.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
