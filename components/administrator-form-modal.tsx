import { useState } from "react"
import { Administrator, Role } from "@/app/types/admin"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from 'lucide-react'

interface AdministratorFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (admin: Omit<Administrator, 'id'>) => void
  roles: Role[]
}

const PERMISSIONS_DESCRIPTION: { [key: string]: string } = {
  crear_usuarios: "Permite crear nuevos usuarios en el sistema",
  editar_usuarios: "Permite modificar la información de usuarios existentes",
  eliminar_usuarios: "Permite eliminar usuarios del sistema",
  ver_registros: "Permite ver los registros de actividad del sistema",
  gestionar_finanzas: "Permite acceder y gestionar información financiera",
  gestionar_sucursales: "Permite administrar las sucursales de la empresa",
  gestionar_inventario: "Permite gestionar el inventario de productos",
}

export function AdministratorFormModal({
  isOpen,
  onClose,
  onSubmit,
  roles,
}: AdministratorFormModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [additionalPermissions, setAdditionalPermissions] = useState<string[]>([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const rolePermissions = roles.find(r => r.id === selectedRole)?.permissions || []
    const allPermissions = [...new Set([...rolePermissions, ...additionalPermissions])]
    onSubmit({
      name: `${firstName} ${lastName}`,
      email,
      role: selectedRole,
      photoUrl: photoPreview || '',
      permissions: allPermissions,
    })
    onClose()
    // Reset form
    setFirstName("")
    setLastName("")
    setEmail("")
    setPhoto(null)
    setPhotoPreview(null)
    setSelectedRole("")
    setAdditionalPermissions([])
  }

  const togglePermission = (permission: string) => {
    setAdditionalPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const availablePermissions = roles.flatMap(r => r.permissions)
    .filter((permission, index, self) => self.indexOf(permission) === index)
    .filter(permission => !roles.find(r => r.id === selectedRole)?.permissions.includes(permission))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                {photoPreview ? (
                  <AvatarImage src={photoPreview} alt="Preview" />
                ) : (
                  <AvatarFallback>
                    {firstName.charAt(0)}
                    {lastName.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <label htmlFor="photo" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                <Camera className="w-4 h-4" />
                <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.displayName || role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedRole && (
            <Card>
              <CardHeader>
                <CardTitle>{roles.find(r => r.id === selectedRole)?.displayName || roles.find(r => r.id === selectedRole)?.name}</CardTitle>
                <CardDescription>{roles.find(r => r.id === selectedRole)?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[150px]">
                  <div className="space-y-2">
                    {roles.find(r => r.id === selectedRole)?.permissions.map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Badge>{permission}</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Permisos Adicionales</CardTitle>
              <CardDescription>Seleccione permisos adicionales para este usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {Object.entries(PERMISSIONS_DESCRIPTION).map(([permission, description]) => (
                    <div key={permission} className="flex items-start space-x-2">
                      <Checkbox
                        id={permission}
                        checked={additionalPermissions.includes(permission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAdditionalPermissions([...additionalPermissions, permission])
                          } else {
                            setAdditionalPermissions(additionalPermissions.filter(p => p !== permission))
                          }
                        }}
                      />
                      <div className="space-y-1">
                        <Label htmlFor={permission} className="font-medium">
                          <Badge variant={additionalPermissions.includes(permission) ? "default" : "outline"}>
                            {permission}
                          </Badge>
                        </Label>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Usuario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

