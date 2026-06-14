'use client'

import { useState } from 'react'
import { saveBuyurtma, generateOrderId, type Order, type OrderProduct } from '@/lib/orders'
import { narxFormat } from '@/lib/products'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  products: OrderProduct[]
  totalPrice: number
}

export function CheckoutModal({ isOpen, onClose, products, totalPrice }: CheckoutModalProps) {
  const [step, setStep] = useState<'info' | 'payment' | 'confirm'>('info')
  const [loading, setLoading] = useState(false)
  
  const [customer, setCustomer] = useState({
    ism: '',
    telefon: '',
    davlat: 'O\'zbekiston',
    shahri: '',
    manzil: '',
    shubaqa: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<'uzcard' | 'humo' | 'visa'>('uzcard')

  if (!isOpen) return null

  function handleInputChange(field: keyof typeof customer, value: string) {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }

  function handleNextStep() {
    if (!customer.ism || !customer.telefon || !customer.shahri || !customer.manzil) {
      alert('Iltimos, barcha maydonlarni to\'ldiring!')
      return
    }
    setStep('payment')
  }

  function handlePaymentNext() {
    setStep('confirm')
  }

  function handleConfirm() {
    setLoading(true)
    setTimeout(() => {
      const order: Order = {
        id: generateOrderId(),
        timestamp: Date.now(),
        products,
        totalPrice,
        customer,
        paymentMethod,
        status: 'pending',
      }
      saveBuyurtma(order)
      alert('Buyurtma muvaffaqiyatli qabul qilindi! ID: ' + order.id)
      setStep('info')
      setCustomer({ ism: '', telefon: '', davlat: 'O\'zbekiston', shahri: '', manzil: '', shubaqa: '' })
      onClose()
      setLoading(false)
    }, 500)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '448px',
        borderRadius: '8px',
        backgroundColor: 'white',
        padding: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#111827',
          }}>
            {step === 'info' && 'Shaxsiy ma\'lumotlar'}
            {step === 'payment' && 'To\'lov usuli'}
            {step === 'confirm' && 'Tasdiqlash'}
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              fontSize: '20px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Step 1: Customer Info */}
        {step === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px',
              }}>Ism Sharifi *</label>
              <input
                type="text"
                value={customer.ism}
                onChange={(e) => handleInputChange('ism', e.target.value)}
                style={{
                  marginTop: '4px',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="Javlon Aliyev"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px',
              }}>Telefon *</label>
              <input
                type="tel"
                value={customer.telefon}
                onChange={(e) => handleInputChange('telefon', e.target.value)}
                style={{
                  marginTop: '4px',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="+998 91 123 45 67"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px',
              }}>Davlat *</label>
              <select
                value={customer.davlat}
                onChange={(e) => handleInputChange('davlat', e.target.value)}
                style={{
                  marginTop: '4px',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option>O'zbekiston</option>
                <option>Qozoqiston</option>
                <option>Qirg'iziston</option>
                <option>Turkmaniston</option>
                <option>Tojikiston</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px',
              }}>Shahri *</label>
              <input
                type="text"
                value={customer.shahri}
                onChange={(e) => handleInputChange('shahri', e.target.value)}
                style={{
                  marginTop: '4px',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="Toshkent"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px',
              }}>Manzil (ko'cha, uy raqami) *</label>
              <input
                type="text"
                value={customer.manzil}
                onChange={(e) => handleInputChange('manzil', e.target.value)}
                style={{
                  marginTop: '4px',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="Navoiy ko'ch, 15A, 3-qavat"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px',
              }}>Shubaqa raqami</label>
              <input
                type="text"
                value={customer.shubaqa}
                onChange={(e) => handleInputChange('shubaqa', e.target.value)}
                style={{
                  marginTop: '4px',
                  width: '100%',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="123-A (ixtiyoriy)"
              />
            </div>

            <div style={{ paddingTop: '16px' }}>
              <button
                onClick={handleNextStep}
                style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                Davom etish
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 'payment' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(['uzcard', 'humo', 'visa'] as const).map((method) => (
                <label
                  key={method}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value as typeof method)}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{
                    marginLeft: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#111827',
                  }}>
                    {method === 'uzcard' && '💳 Uzcard'}
                    {method === 'humo' && '💳 Humo'}
                    {method === 'visa' && '💳 Visa'}
                  </span>
                </label>
              ))}
            </div>

            <div style={{
              borderRadius: '8px',
              backgroundColor: '#eff6ff',
              padding: '16px',
              fontSize: '14px',
              color: '#0c4a6e',
            }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>
                Tanlangan usul: <strong>{paymentMethod.toUpperCase()}</strong>
              </p>
              <p>Keyingi qadamda to'lov ma'lumotlarini kiritasiz.</p>
            </div>

            <div style={{ paddingTop: '16px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setStep('info')}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#2563eb',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: '1px solid #2563eb',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Orqaga
              </button>
              <button
                onClick={handlePaymentNext}
                style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                Davom etish
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              borderRadius: '8px',
              backgroundColor: '#f3f4f6',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '14px',
            }}>
              <div style={{ fontWeight: '600', color: '#111827' }}>Buyurtma tafsiloti:</div>
              <div style={{ color: '#374151' }}>
                <div>Ism: <strong>{customer.ism}</strong></div>
                <div>Telefon: <strong>{customer.telefon}</strong></div>
                <div>Manzil: <strong>{customer.shahri}, {customer.manzil}</strong></div>
                {customer.shubaqa && <div>Shubaqa: <strong>{customer.shubaqa}</strong></div>}
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #d1d5db',
                }}>
                  To'lov usuli: <strong>{paymentMethod.toUpperCase()}</strong>
                </div>
                <div style={{
                  marginTop: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                }}>
                  Jami: {narxFormat(totalPrice)}
                </div>
              </div>
            </div>

            <div style={{ paddingTop: '16px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setStep('payment')}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#2563eb',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: '1px solid #2563eb',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Orqaga
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: loading ? '#9ca3af' : '#16a34a',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#15803d')}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#16a34a')}
              >
                {loading ? 'Jonatilmoqda...' : 'Buyurtmani tasdiqlash'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
