import { Phone, Mail, MapPin } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer id="aloqa" className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-black text-primary-foreground">
              N
            </span>
            <span className="text-lg font-bold text-foreground">
              Nebula<span className="text-primary">Tech</span>
            </span>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            Kelajak texnologiyalarini bugun yetkazib beramiz. Eng sifatli
            kompyuter aksessuarlari.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Kategoriyalar
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Klaviaturalar</li>
            <li>Sichqonchalar</li>
            <li>Naushniklar</li>
            <li>Monitorlar</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Kompaniya
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Biz haqimizda</li>
            <li>Yetkazib berish</li>
            <li>Kafolat</li>
            <li>To'lov</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Aloqa</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" /> +998 90 123 45 67
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" /> info@nebulatech.uz
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> Toshkent, O'zbekiston
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} NebulaTech. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  )
}
