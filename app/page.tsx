import { CartProvider } from '@/lib/cart-context'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { ProductGrid } from '@/components/product-grid'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main>
          <Hero />
          <ProductGrid />
          <Features />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  )
}
