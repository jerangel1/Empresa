'use client'

import { useState, useEffect } from "react"
import { Employee, Position } from '@/app/types/employee'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

interface EmployeeFormModalProps {
  employee?: Employee
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Employee>) => void
}

const POSITIONS: Position[] = ['cajero', 'asistente', 'seguridad']
const BRANCHES = ['Sucursal Norte', 'Sucursal Sur', 'Sucursal Central']
const AREAS_BY_BRANCH: Record<string, string[]> = {
  'Sucursal Norte': ['Panadería', 'Frutería'],
  'Sucursal Sur': ['Cremería', 'Carnicería', 'Administración'],
  'Sucursal Central': ['Carnicería', 'Cremería', 'Panadería'],
}

export function EmployeeFormModal({
  employee,
  isOpen,
  onClose,
  onSubmit,
}: EmployeeFormModalProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>(employee?.branch || '')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    employee ? new Date(employee.startDate) : undefined
  )
  const [photoPreview, setPhotoPreview] = useState<string>(employee?.photoUrl || '')

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get('name') as string,
      position: formData.get('position') as Position,
      branch: formData.get('branch') as string,
      area: formData.get('area') as string,
      startDate: selectedDate?.toISOString() || new Date().toISOString(),
      photoUrl: photoPreview || '',
      isActive: true,
    }
    onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Editar Empleado" : "Agregar Empleado"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Foto</Label>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              defaultValue={employee?.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Cargo</Label>
            <Select name="position" defaultValue={employee?.position || POSITIONS[0]}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cargo" />
              </SelectTrigger>
              <SelectContent>
                {POSITIONS.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Sucursal</Label>
            <Select
              name="branch"
              defaultValue={employee?.branch}
              onValueChange={setSelectedBranch}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar sucursal" />
              </SelectTrigger>
              <SelectContent>
                {BRANCHES.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Área</Label>
            <Select name="area" defaultValue={employee?.area}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar área" />
              </SelectTrigger>
              <SelectContent>
                {selectedBranch &&
                  AREAS_BY_BRANCH[selectedBranch].map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fecha de Inicio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PP", { locale: es })
                  ) : (
                    <span>Seleccionar fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {employee ? "Guardar Cambios" : "Agregar Empleado"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

