'use client'

import { Register, Cashier } from "@/types/branch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface RegisterDetailsModalProps {
  register: Register | null
  isOpen: boolean
  onClose: () => void
}

export function RegisterDetailsModal({
  register,
  isOpen,
  onClose,
}: RegisterDetailsModalProps) {
  if (!register) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles de Caja - {register.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-medium">Estado:</span>
                <Badge variant={register.isActive ? "default" : "destructive"}>
                  {register.isActive ? "Activa" : "Inactiva"}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cajeros Asignados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cajero</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {register.cashiers.map((cashier: Cashier) => (
                    <TableRow key={cashier.id}>
                      <TableCell className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/100?u=${cashier.id}`} alt={cashier.name} />
                          <AvatarFallback>{cashier.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{cashier.name}</span>
                      </TableCell>
                      <TableCell>{cashier.role}</TableCell>
                      <TableCell>
                        <Badge variant={cashier.isActive ? "default" : "destructive"}>
                          {cashier.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

