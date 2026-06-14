'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { sotuvNarx, type Product } from '@/lib/products'

export type CartItem = Product & { soni: number; narx: number }

type CartContextType = {
  items: CartItem[]
  qoshish: (product: Product) => void
  ochirish: (id: string) => void
  soniOzgartirish: (id: string, soni: number) => void
  tozalash: () => void
  jamiSoni: number
  jamiNarx: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const qoshish = useCallback((product: Product) => {
    setItems((prev) => {
      const mavjud = prev.find((i) => i.id === product.id)
      if (mavjud) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, soni: i.soni + 1 } : i,
        )
      }
      return [...prev, { ...product, soni: 1, narx: sotuvNarx(product) }]
    })
  }, [])

  const ochirish = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const soniOzgartirish = useCallback((id: string, soni: number) => {
    setItems((prev) =>
      soni <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, soni } : i)),
    )
  }, [])

  const tozalash = useCallback(() => setItems([]), [])

  const jamiSoni = items.reduce((s, i) => s + i.soni, 0)
  const jamiNarx = items.reduce((s, i) => s + i.narx * i.soni, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        qoshish,
        ochirish,
        soniOzgartirish,
        tozalash,
        jamiSoni,
        jamiNarx,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart CartProvider ichida ishlatilishi kerak')
  return ctx
}
