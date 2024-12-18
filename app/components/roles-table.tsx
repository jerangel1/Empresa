import { Role } from "@/app/types/admin"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'

interface RolesTableProps {
  roles: Role[]
  onViewDetails: (role: Role) => void
}

export function RolesTable({ roles, onViewDetails }: RolesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre del Rol</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Permisos</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell className="font-medium">{role.name}</TableCell>
            <TableCell>{role.description}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission, index) => (
                  <Badge key={index} variant="secondary">
                    {permission}
                  </Badge>
                ))}
                {role.permissions.length > 3 && (
                  <Badge variant="secondary">+{role.permissions.length - 3}</Badge>
                )}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" onClick={() => onViewDetails(role)}>
                <Eye className="w-4 h-4 mr-2" />
                Ver
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

