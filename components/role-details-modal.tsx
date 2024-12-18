import { Role } from "@/app/types/admin"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RoleDetailsModalProps {
  role: Role | null
  isOpen: boolean
  onClose: () => void
  onEdit: (role: Role) => void
  onDelete: (roleId: string) => void
  permissionsDescription: { [key: string]: string }
}

export function RoleDetailsModal({
  role,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  permissionsDescription,
}: RoleDetailsModalProps) {
  if (!role) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Rol: {role.name}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Descripción</h3>
          <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
          <h3 className="text-lg font-semibold mb-2">Permisos</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {role.permissions.map((permission) => (
                <div key={permission} className="flex flex-col space-y-1">
                  <Badge className="w-fit">{permission}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {permissionsDescription[permission]}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button variant="outline" onClick={() => onEdit(role)}>
            Editar Rol
          </Button>
          <Button variant="destructive" onClick={() => onDelete(role.id)}>
            Eliminar Rol
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

