'use client'

import { useState } from 'react'
import { Employee } from '@/app/types/employee'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface EmployeeDetailsModalProps {
  employee: Employee | null
  isOpen: boolean
  onClose: () => void
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
}

export function EmployeeDetailsModal({
  employee,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: EmployeeDetailsModalProps) {
  if (!employee) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalles del Empleado</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.photoUrl} alt={employee.name} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-medium text-lg">{employee.name}</h3>
              <Badge variant="secondary">{employee.position}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sucursal:</span>
              <span className="font-medium">{employee.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Área:</span>
              <span className="font-medium">{employee.area}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fecha de Inicio:</span>
              <span className="font-medium">
                {format(new Date(employee.startDate), 'PP', { locale: es })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado:</span>
              <Badge variant={employee.isActive ? "success" : "destructive"}>
                {employee.isActive ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(employee)}
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onDelete(employee.id)
                onClose()
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Eliminar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

