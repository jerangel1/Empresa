import Link from 'next/link'
import { Home, Building2, Users, BarChart, Settings } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className="bg-primary text-primary-foreground w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="space-y-2">
        <Link href="/" className="flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 hover:bg-primary-foreground/10">
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/sucursales" className="flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 hover:bg-primary-foreground/10">
          <Building2 className="w-5 h-5" />
          <span>Sucursales</span>
        </Link>
        <Link href="/personal" className="flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 hover:bg-primary-foreground/10">
          <Users className="w-5 h-5" />
          <span>Personal</span>
        </Link>
        <Link href="/finanzas" className="flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 hover:bg-primary-foreground/10">
          <BarChart className="w-5 h-5" />
          <span>Finanzas</span>
        </Link>
        <Link href="/admin" className="flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 hover:bg-primary-foreground/10">
          <Settings className="w-5 h-5" />
          <span>Administrador</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar

