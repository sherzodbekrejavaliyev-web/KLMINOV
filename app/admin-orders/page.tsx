'use client'

import { useState, useEffect } from 'react'
import { getBuyurtmalar, type Order } from '@/lib/orders'
import { narxFormat } from '@/lib/products'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const data = getBuyurtmalar()
    setOrders(data.sort((a, b) => b.timestamp - a.timestamp))
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#fef3c7'
      case 'confirmed':
        return '#d1fae5'
      case 'shipped':
        return '#e0e7ff'
      case 'delivered':
        return '#dcfce7'
      default:
        return '#f3f4f6'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#78350f'
      case 'confirmed':
        return '#065f46'
      case 'shipped':
        return '#312e81'
      case 'delivered':
        return '#166534'
      default:
        return '#374151'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Kutilmoqda'
      case 'confirmed':
        return 'Tasdiqlandi'
      case 'shipped':
        return "Jo'natildi"
      case 'delivered':
        return 'Yetkazildi'
      default:
        return status
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', textDecoration: 'none', marginBottom: '20px', transition: 'color 0.2s' }}>
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Admin panelga qaytish
        </Link>

        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Buyurtmalar
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Jami buyurtmalar: <strong>{orders.length}</strong>
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
            Yuklanyapti...
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
            Hali buyurtma yo'q
          </div>
        ) : (
          <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: '#ffffff' }}>
            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Buyurtma ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Sana</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Xaridor</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Manzil</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Mahsulotlar</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Jami</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>To'lov</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Holat</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '16px', fontFamily: 'monospace', fontSize: '12px', color: '#2563eb' }}>
                      {order.id}
                    </td>
                    <td style={{ padding: '16px', color: '#374151' }}>
                      {new Date(order.timestamp).toLocaleDateString('uz-UZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '600', color: '#111827' }}>
                        {order.customer.ism}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {order.customer.telefon}
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#374151', fontSize: '13px' }}>
                      {order.customer.shahri}
                      <br />
                      {order.customer.manzil}
                      {order.customer.shubaqa && (
                        <>
                          <br />
                          Shubaqa: {order.customer.shubaqa}
                        </>
                      )}
                    </td>
                    <td style={{ padding: '16px', color: '#374151', fontSize: '13px' }}>
                      {order.products.map((p) => (
                        <div key={p.id}>
                          {p.nomi} × {p.miqdori}
                        </div>
                      ))}
                    </td>
                    <td style={{ padding: '16px', fontWeight: '700', color: '#111827' }}>
                      {narxFormat(order.totalPrice)}
                    </td>
                    <td style={{ padding: '16px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>
                      {order.paymentMethod === 'uzcard' && '💳 Uzcard'}
                      {order.paymentMethod === 'humo' && '💳 Humo'}
                      {order.paymentMethod === 'visa' && '💳 Visa'}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '700',
                        backgroundColor: getStatusColor(order.status),
                        color: getStatusTextColor(order.status),
                      }}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
