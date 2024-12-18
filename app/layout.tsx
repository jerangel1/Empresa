import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EmpresaPro | Panel de Control Ejecutivo',
  description: 'Sistema integral de gestión empresarial diseñado para optimizar procesos, monitorear KPIs en tiempo real y tomar decisiones estratégicas. Herramienta profesional para la gestión eficiente de recursos y equipos.',
  keywords: 'dashboard empresarial, gestión empresarial, KPIs, análisis de datos, productividad empresarial, gestión de recursos',
  authors: [{ name: 'EmpresaPro Solutions' }],
  creator: 'EmpresaPro Solutions',
  publisher: 'EmpresaPro Solutions',
  applicationName: 'EmpresaPro Dashboard',
  robots: 'index, follow',
  themeColor: '#2563eb',
  viewport: 'width=device-width, initial-scale=1.0',
  metadataBase: new URL('https://empresapro-dashboard.com'),
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: 'EmpresaPro | Transformando la Gestión Empresarial',
    description: '🚀 Potencia tu empresa con nuestro dashboard de última generación. Analítica avanzada, KPIs en tiempo real y decisiones basadas en datos.',
    siteName: 'EmpresaPro Dashboard',
    url: '/',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'EmpresaPro Dashboard - Visualización Inteligente de Datos',
      },
      {
        url: '/logo.png',
        width: 600,
        height: 600,
        alt: 'EmpresaPro - Excelencia en Gestión Empresarial',
      }
    ],
    locale: 'es_ES',
    countryName: 'Venezuela',
    emails: ['contacto@empresapro.com'],
    phoneNumbers: ['+58 123-456-7890'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@empresapro',
    creator: '@empresapro',
    title: 'EmpresaPro | Dashboard Empresarial Inteligente 🎯',
    description: '🔥 Revoluciona tu gestión empresarial con análisis predictivo, KPIs personalizados y reportes en tiempo real. ¡Toma decisiones más inteligentes!',
    images: {
      url: '/logo.png',
      alt: 'EmpresaPro Dashboard - Innovación en Gestión Empresarial'
    },
  },
  verification: {
    google: 'google-site-verification=tu_codigo',
    yandex: 'yandex-verification=tu_codigo',
  },
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en-US': '/en',
    },
  },
  other: {
    'msapplication-TileColor': '#2563eb',
    'msapplication-TileImage': '/logo.png',
    'whatsapp-image': '/logo.png',
    'fb:app_id': 'tu_app_id_de_facebook',
    'og:video': 'https://empresapro-dashboard.com/promo.mp4',
    'og:audio': 'https://empresapro-dashboard.com/welcome.mp3',
  },
  category: 'Business Software',
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
