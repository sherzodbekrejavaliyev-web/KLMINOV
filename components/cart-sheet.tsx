'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, Trash2, Plus, Minus, Sparkles } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-context'
import { narxFormat } from '@/lib/products'

export function CartSheet() {
  const { items, ochirish, soniOzgartirish, jamiSoni, jamiNarx, tozalash } =
    useCart()
  const [buyurtmaBerildi, setBuyurtmaBerildi] = useState(false)

  function buyurtmaQilish() {
    setBuyurtmaBerildi(true)
    tozalash()
    setTimeout(() => setBuyurtmaBerildi(false), 4000)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative border-border bg-card/60 backdrop-blur hover:bg-card"
          aria-label="Savatchani ochish"
        >
          <ShoppingCart className="size-5" />
          {jamiSoni > 0 && (
            <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {jamiSoni}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col border-border bg-background sm:max-w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingCart className="size-5 text-primary" />
            Savatcha
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            {buyurtmaBerildi ? (
              <>
                <Sparkles className="size-10 text-primary" />
                <p className="text-lg font-semibold text-foreground">
                  Buyurtmangiz qabul qilindi!
                </p>
                <p className="text-sm text-muted-foreground">
                  Tez orada operatorlarimiz siz bilan bog'lanadi.
                </p>
              </>
            ) : (
              <>
                <ShoppingCart className="size-10 text-muted-foreground" />
                <p className="text-muted-foreground">Savatchangiz bo'sh</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-secondary">
                    <Image
                      src={item.rasm || '/placeholder.svg'}
                      alt={item.nomi}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium text-card-foreground">
                        {item.nomi}
                      </p>
                      <button
                        onClick={() => ochirish(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="O'chirish"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 bg-transparent"
                          onClick={() =>
                            soniOzgartirish(item.id, item.soni - 1)
                          }
                          aria-label="Kamaytirish"
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="w-6 text-center text-sm text-card-foreground">
                          {item.soni}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="size-7 bg-transparent"
                          onClick={() =>
                            soniOzgartirish(item.id, item.soni + 1)
                          }
                          aria-label="Ko'paytirish"
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-semibold text-primary">
                        {narxFormat(item.narx * item.soni)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-border">
              <div className="flex w-full items-center justify-between py-2">
                <span className="text-muted-foreground">Jami:</span>
                <span className="text-lg font-bold text-foreground">
                  {narxFormat(jamiNarx)}
                </span>
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                onClick={buyurtmaQilish}
              >
                Buyurtma berish
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
