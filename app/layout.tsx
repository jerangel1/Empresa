import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard Empresarial',
  description: 'Sistema de gestión empresarial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

