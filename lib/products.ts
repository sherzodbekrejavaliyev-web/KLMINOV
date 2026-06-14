export type Product = {
  id: string
  nomi: string
  kategoriya: string
  // AliExpress'dan olingan bazaviy (tannarx) narx, so'mda
  bazaNarx: number
  // Ustama foizda (masalan 30 => +30%)
  ustamaFoiz: number
  // Ustama aniq summada, so'mda (masalan 50000)
  ustamaSumma: number
  rasm: string
  tavsif: string
  reyting: number
  aliexpressUrl?: string
}

export const kategoriyalar = ['Barchasi', 'Mexanik', 'Geyming', 'Simsiz', 'Ofis'] as const

// Yakuniy sotuv narxini hisoblaydi: tannarx + foiz ustamasi + summa ustamasi
export function sotuvNarx(p: Product): number {
  const foizQism = p.bazaNarx * (p.ustamaFoiz / 100)
  return Math.round(p.bazaNarx + foizQism + p.ustamaSumma)
}

export const products: Product[] = [
  {
    id: 'kb-01',
    nomi: 'Nebula 60% Mexanik Klaviatura',
    kategoriya: 'Mexanik',
    bazaNarx: 410000,
    ustamaFoiz: 30,
    ustamaSumma: 0,
    rasm: '/products/kb-1.png',
    tavsif: 'Ixcham 60% format, hot-swap kalitlar, RGB yoritgich, PBT keycap.',
    reyting: 4.9,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-60',
  },
  {
    id: 'kb-02',
    nomi: 'Orbit Full-Size Geyming Klaviatura',
    kategoriya: 'Geyming',
    bazaNarx: 520000,
    ustamaFoiz: 25,
    ustamaSumma: 0,
    rasm: '/products/kb-2.png',
    tavsif: "To'liq o'lcham, rangin RGB, anti-ghosting, qora keycap.",
    reyting: 4.8,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-full',
  },
  {
    id: 'kb-03',
    nomi: 'Retro TKL Mexanik Klaviatura',
    kategoriya: 'Mexanik',
    bazaNarx: 470000,
    ustamaFoiz: 30,
    ustamaSumma: 0,
    rasm: '/products/kb-3.png',
    tavsif: "Tenkeyless dizayn, retro bej keycap, taktil kalitlar.",
    reyting: 4.7,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-tkl',
  },
  {
    id: 'kb-04',
    nomi: 'Slim Pro Simsiz Klaviatura',
    kategoriya: 'Simsiz',
    bazaNarx: 580000,
    ustamaFoiz: 28,
    ustamaSumma: 0,
    rasm: '/products/kb-4.png',
    tavsif: "Past profil, alyuminiy korpus, Bluetooth + 2.4G, qayta zaryadlanuvchi.",
    reyting: 4.8,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-slim',
  },
  {
    id: 'kb-05',
    nomi: 'Pastel 65% Maxsus Klaviatura',
    kategoriya: 'Mexanik',
    bazaNarx: 540000,
    ustamaFoiz: 32,
    ustamaSumma: 0,
    rasm: '/products/kb-5.png',
    tavsif: "65% format, pastel keycap, gasket dizayn, yumshoq bosish.",
    reyting: 4.9,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-65',
  },
  {
    id: 'kb-06',
    nomi: 'Premium Knob Alyuminiy Klaviatura',
    kategoriya: 'Mexanik',
    bazaNarx: 720000,
    ustamaFoiz: 30,
    ustamaSumma: 0,
    rasm: '/products/kb-6.png',
    tavsif: "Alyuminiy ramka, ovoz tugmasi (knob), RGB, premium his.",
    reyting: 5.0,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-knob',
  },
  {
    id: 'kb-07',
    nomi: 'Ergo Split Ergonomik Klaviatura',
    kategoriya: 'Ofis',
    bazaNarx: 610000,
    ustamaFoiz: 27,
    ustamaSumma: 0,
    rasm: '/products/kb-7.png',
    tavsif: "Ajratilgan ergonomik dizayn, bilak uchun qulay, uzoq ish uchun.",
    reyting: 4.6,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-split',
  },
  {
    id: 'kb-08',
    nomi: 'Crystal RGB Geyming Klaviatura',
    kategoriya: 'Geyming',
    bazaNarx: 490000,
    ustamaFoiz: 30,
    ustamaSumma: 0,
    rasm: '/products/kb-8.png',
    tavsif: "Shaffof kristal keycap, yorqin RGB, geyming kalitlar.",
    reyting: 4.7,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-crystal',
  },
  {
    id: 'kb-09',
    nomi: 'Navy 75% Ixcham Klaviatura',
    kategoriya: 'Mexanik',
    bazaNarx: 500000,
    ustamaFoiz: 30,
    ustamaSumma: 0,
    rasm: '/products/kb-9.png',
    tavsif: "75% format, navy va to'q sariq keycap, ixcham va funksional.",
    reyting: 4.8,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-75',
  },
  {
    id: 'kb-10',
    nomi: 'Office Basic Membran Klaviatura',
    kategoriya: 'Ofis',
    bazaNarx: 230000,
    ustamaFoiz: 35,
    ustamaSumma: 0,
    rasm: '/products/kb-10.png',
    tavsif: "Byudjet ofis klaviaturasi, jim bosish, suv chidamli.",
    reyting: 4.4,
    aliexpressUrl: 'https://aliexpress.com/item/keyboard-office',
  },
]

export function narxFormat(narx: number): string {
  return new Intl.NumberFormat('uz-UZ').format(narx) + " so'm"
}
