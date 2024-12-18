'use client'

import { Area, Register, Cashier } from "@/types/branch"
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

interface AreaDetailsModalProps {
  area: Area | null
  branchName: string,
  isOpen: boolean
  onClose: () => void
}

export function AreaDetailsModal({
  area,
  isOpen,
  onClose,
}: AreaDetailsModalProps) {
  if (!area) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalles del Área - {area.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Número de cajas: {area.registers.length}</p>
              <p>Total de cajeros: {area.registers.reduce((sum, register) => sum + register.cashiers.length, 0)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cajas Registradoras</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cajeros Asignados</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {area.registers.map((register: Register) => (
                    <TableRow key={register.id}>
                      <TableCell className="font-medium">{register.name}</TableCell>
                      <TableCell>
                        <Badge variant={register.isActive ? "default" : "destructive"}>
                          {register.isActive ? "Activa" : "Inactiva"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {register.cashiers.map((cashier: Cashier) => (
                          <div key={cashier.id} className="flex items-center space-x-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={cashier.photoUrl} alt={cashier.name} />
                              <AvatarFallback>{cashier.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{cashier.name}</span>
                            <Badge variant={cashier.isActive ? "default" : "destructive"}>
                              {cashier.isActive ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        ))}
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

