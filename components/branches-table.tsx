import { Branch, Area } from "@/types/branch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from 'lucide-react'

interface BranchesTableProps {
  branches: Branch[]
  onViewDetails: (branch: Branch) => void
  onViewEmployees: (branch: Branch) => void
}

export function BranchesTable({ branches, onViewDetails, onViewEmployees }: BranchesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Gerente</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Áreas</TableHead>
            <TableHead>Empleados</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.id}>
              <TableCell className="font-medium">{branch.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${branch.manager.id}`} alt={branch.manager.name} />
                    <AvatarFallback>{branch.manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{branch.manager.name}</span>
                </div>
              </TableCell>
              <TableCell>{branch.address}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {branch.areas.length} {branch.areas.length === 1 ? 'área' : 'áreas'}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="link" onClick={() => onViewEmployees(branch)}>
                  {branch.employeeCount} empleados
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewDetails(branch)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

