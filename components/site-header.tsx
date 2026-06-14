import { CartSheet } from '@/components/cart-sheet'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-black text-primary-foreground">
            N
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Nebula<span className="text-primary">Tech</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#mahsulotlar" className="transition-colors hover:text-foreground">
            Mahsulotlar
          </a>
          <a href="#afzalliklar" className="transition-colors hover:text-foreground">
            Afzalliklar
          </a>
          <a href="#aloqa" className="transition-colors hover:text-foreground">
            Aloqa
          </a>
          <a href="/admin" className="transition-colors hover:text-foreground">
            Admin
          </a>
        </nav>

        <CartSheet />
      </div>
    </header>
  )
}
