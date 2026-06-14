import { AdminPanel } from '@/components/admin-panel'

export const metadata = {
  title: 'Admin panel — NebulaTech',
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <AdminPanel />
    </main>
  )
}
