'use client'

import { useState } from 'react'
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Header() {
  const [notifications, setNotifications] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)

  const fakeNotifications = [
    { id: 1, message: "Nueva venta registrada" },
    { id: 2, message: "Actualización de inventario requerida" },
    { id: 3, message: "Reunión de equipo en 30 minutos" },
  ]

  const user = {
    name: "Jesus",
    lastName: "Rangel",
    email: "devops@jesus-rangel.com",
    photoUrl: "https://github.com/shadcn.png",
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-primary">Nombre de la empresa</h1>
      <div className="flex items-center space-x-4">
        <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setNotifications(0)}>
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notificaciones</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {fakeNotifications.map((notification) => (
                <div key={notification.id} className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <p>{notification.message}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoUrl} alt={`${user.name} ${user.lastName}`} />
                <AvatarFallback>{user.name.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user.name} {user.lastName}</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setShowProfileModal(true)}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perfil de Usuario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.photoUrl} alt={`${user.name} ${user.lastName}`} />
                <AvatarFallback>{user.name.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{user.name} {user.lastName}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" value={user.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" value={user.lastName} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} readOnly />
            </div>
            <Button onClick={() => setShowPasswordChange(!showPasswordChange)}>
              {showPasswordChange ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}
            </Button>
            {showPasswordChange && (
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña actual</Label>
                <Input id="currentPassword" type="password" />
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <Input id="newPassword" type="password" />
                <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                <Input id="confirmPassword" type="password" />
                <Button className="mt-2">Guardar nueva contraseña</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

