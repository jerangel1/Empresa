import { Administrator } from "@/app/types/admin"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'

interface AdministratorsTableProps {
  administrators: Administrator[]
  rolePermissions: (roleName: string) => string[]
  onViewDetails: (admin: Administrator) => void
}

export function AdministratorsTable({ administrators, rolePermissions, onViewDetails }: AdministratorsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>Permisos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {administrators.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={admin.photoUrl} alt={admin.name} />
                  <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{admin.name}</span>
              </div>
            </TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{admin.role}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {rolePermissions(admin.role).slice(0, 3).map((permission, index) => (
                  <Badge key={index} variant="secondary">
                    {permission}
                  </Badge>
                ))}
                {rolePermissions(admin.role).length > 3 && (
                  <Badge variant="secondary">+{rolePermissions(admin.role).length - 3}</Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm" onClick={() => onViewDetails(admin)}>
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

