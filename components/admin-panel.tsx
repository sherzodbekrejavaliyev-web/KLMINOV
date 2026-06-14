'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Save, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products as boshlangichProducts, narxFormat, sotuvNarx, type Product } from '@/lib/products'

export function AdminPanel() {
  const [items, setItems] = useState<Product[]>(boshlangichProducts)
  const [saqlandi, setSaqlandi] = useState(false)

  function yangilash(id: string, maydon: 'bazaNarx' | 'ustamaFoiz' | 'ustamaSumma', qiymat: number) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, [maydon]: qiymat } : p)))
    setSaqlandi(false)
  }

  function saqlash() {
    // Hozircha brauzer xotirasiga saqlaymiz. Keyin Neon bazasiga ulanadi.
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('admin_products', JSON.stringify(items))
    }
    setSaqlandi(true)
    setTimeout(() => setSaqlandi(false), 3000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Do'konga qaytish
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Admin panel — Narx boshqaruvi
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AliExpress tannarxini kiriting, ustama (foiz yoki summa) qo'shing — sotuv narxi avtomatik hisoblanadi.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin-orders">
            <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <ShoppingBag className="size-4" />
              Buyurtmalar
            </Button>
          </Link>
          <Button onClick={saqlash} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="size-4" />
            {saqlandi ? 'Saqlandi!' : 'Saqlash'}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="p-4 font-medium">Mahsulot</th>
              <th className="p-4 font-medium">Tannarx (so'm)</th>
              <th className="p-4 font-medium">Ustama %</th>
              <th className="p-4 font-medium">Ustama (so'm)</th>
              <th className="p-4 font-medium">Sotuv narxi</th>
              <th className="p-4 font-medium">Foyda</th>
              <th className="p-4 font-medium">Link</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const sotuv = sotuvNarx(p)
              const foyda = sotuv - p.bazaNarx
              return (
                <tr key={p.id} className="border-b border-border/50 last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-secondary">
                        <Image src={p.rasm || '/placeholder.svg'} alt={p.nomi} fill className="object-contain p-1" sizes="48px" />
                      </div>
                      <span className="font-medium text-card-foreground">{p.nomi}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={p.bazaNarx}
                      onChange={(e) => yangilash(p.id, 'bazaNarx', Number(e.target.value))}
                      className="w-28 rounded-md border border-input bg-background px-2 py-1.5 text-foreground outline-none focus:border-ring"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={p.ustamaFoiz}
                      onChange={(e) => yangilash(p.id, 'ustamaFoiz', Number(e.target.value))}
                      className="w-20 rounded-md border border-input bg-background px-2 py-1.5 text-foreground outline-none focus:border-ring"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={p.ustamaSumma}
                      onChange={(e) => yangilash(p.id, 'ustamaSumma', Number(e.target.value))}
                      className="w-28 rounded-md border border-input bg-background px-2 py-1.5 text-foreground outline-none focus:border-ring"
                    />
                  </td>
                  <td className="p-4 font-semibold text-foreground">{narxFormat(sotuv)}</td>
                  <td className="p-4 font-semibold text-primary">{narxFormat(foyda)}</td>
                  <td className="p-4">
                    {p.aliexpressUrl && (
                      <a
                        href={p.aliexpressUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="AliExpress havolasi"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
