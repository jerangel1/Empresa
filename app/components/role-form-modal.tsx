import { useState } from "react"
import { Role } from "@/app/types/admin"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface RoleFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (role: Omit<Role, 'id'>) => void
}

const ALL_PERMISSIONS = [
  "crear_usuarios",
  "editar_usuarios",
  "eliminar_usuarios",
  "ver_registros",
  "gestionar_finanzas",
  "gestionar_sucursales",
  "gestionar_inventario",
]

const PERMISSIONS_DESCRIPTION: { [key: string]: string } = {
  crear_usuarios: "Permite crear nuevos usuarios en el sistema",
  editar_usuarios: "Permite modificar la información de usuarios existentes",
  eliminar_usuarios: "Permite eliminar usuarios del sistema",
  ver_registros: "Permite ver los registros de actividad del sistema",
  gestionar_finanzas: "Permite acceder y gestionar información financiera",
  gestionar_sucursales: "Permite administrar las sucursales de la empresa",
  gestionar_inventario: "Permite gestionar el inventario de productos",
}

export function RoleFormModal({
  isOpen,
  onClose,
  onSubmit,
}: RoleFormModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [name, setName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({
      name,
      //displayName,
      description,
      permissions: selectedPermissions,
    })
    onClose()
    // Reset form
    setName("")
    setDisplayName("")
    setDescription("")
    setSelectedPermissions([])
  }

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Rol</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Nombre a Mostrar</Label>
              <Input 
                id="displayName" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción del Rol</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label>Permisos</Label>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {ALL_PERMISSIONS.map((permission) => (
                  <Card key={permission}>
                    <CardContent className="flex items-center space-x-4 p-4">
                      <Checkbox
                        id={permission}
                        checked={selectedPermissions.includes(permission)}
                        onCheckedChange={() => togglePermission(permission)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={permission} className="font-medium">
                          <Badge variant={selectedPermissions.includes(permission) ? "default" : "outline"}>
                            {permission}
                          </Badge>
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {PERMISSIONS_DESCRIPTION[permission]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear Rol</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

