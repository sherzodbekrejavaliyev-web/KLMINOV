export type Order = {
  id: string
  timestamp: number
  products: OrderProduct[]
  totalPrice: number
  customer: {
    ism: string
    telefon: string
    davlat: string
    shahri: string
    manzil: string
    shubaqa: string
  }
  paymentMethod: 'uzcard' | 'humo' | 'visa'
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
}

export type OrderProduct = {
  id: string
  nomi: string
  narx: number
  miqdori: number
}

// LocalStorage'dan buyurtmalarni o'qish
export function getBuyurtmalar(): Order[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('buyurtmalar')
  return data ? JSON.parse(data) : []
}

// Yangi buyurtmani saqlash
export function saveBuyurtma(order: Order): void {
  if (typeof window === 'undefined') return
  const buyurtmalar = getBuyurtmalar()
  buyurtmalar.push(order)
  localStorage.setItem('buyurtmalar', JSON.stringify(buyurtmalar))
}

// Buyurtma ID yaratish
export function generateOrderId(): string {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}
