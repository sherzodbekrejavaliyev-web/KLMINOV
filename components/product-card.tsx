'use client'

import Image from 'next/image'
import { Star, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { narxFormat, sotuvNarx, type Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { qoshish } = useCart()

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_30px_-8px_oklch(0.78_0.14_75_/_0.4)]">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-secondary/40 to-card">
        <Image
          src={product.rasm || '/placeholder.svg'}
          alt={product.nomi}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          {product.kategoriya}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-primary">
          <Star className="size-3.5 fill-current" />
          <span className="text-xs font-medium text-muted-foreground">
            {product.reyting.toFixed(1)}
          </span>
        </div>
        <h3 className="text-pretty font-semibold leading-snug text-card-foreground">
          {product.nomi}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {product.tavsif}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-lg font-bold text-foreground">
            {narxFormat(sotuvNarx(product))}
          </span>
          <Button
            size="sm"
            className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => qoshish(product)}
          >
            <Plus className="size-4" />
            Qo'shish
          </Button>
        </div>
      </div>
    </div>
  )
}
