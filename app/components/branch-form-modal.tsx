'use client'

import { useState } from "react"
import { Branch, Manager, Area } from "@/types/branch"
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
import { Plus, X, Edit2 } from 'lucide-react'

interface BranchFormModalProps {
  branch?: Branch
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Branch>) => void
}

// Mock data - replace with actual data from your backend
const MANAGERS: Manager[] = [
  { id: "1", name: "Ana Garcia", photoUrl: "/placeholder.svg" },
  { id: "2", name: "Carlos Rodriguez", photoUrl: "/placeholder.svg" },
  { id: "3", name: "Elena Martinez", photoUrl: "/placeholder.svg" },
]

const AVAILABLE_AREAS = ['Cremería', 'Carnicería', 'Panadería', 'Frutería', 'Abarrotes']

export function BranchFormModal({
  branch,
  isOpen,
  onClose,
  onSubmit,
}: BranchFormModalProps) {
  const [areas, setAreas] = useState<Area[]>(branch?.areas || [])
  const [newAreaName, setNewAreaName] = useState<string>('')
  const [editingArea, setEditingArea] = useState<string | null>(null)

  const handleAddArea = () => {
    if (newAreaName) {
      const newArea: Area = {
        id: `area-${Date.now()}`,
        name: newAreaName,
        registers: []
      }
      setAreas([...areas, newArea])
      setNewAreaName('')
    }
  }

  const handleAddRegister = (areaId: string) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        const newRegister = {
          id: `register-${Date.now()}`,
          name: `Caja ${area.registers.length + 1}`,
          isActive: true,
          cashiers: []
        }
        return { ...area, registers: [...area.registers, newRegister] }
      }
      return area
    }))
  }

  const handleEditRegister = (areaId: string, registerId: string, newName: string) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        return {
          ...area,
          registers: area.registers.map(register => 
            register.id === registerId ? { ...register, name: newName } : register
          )
        }
      }
      return area
    }))
  }

  const handleRemoveArea = (areaId: string) => {
    setAreas(areas.filter(area => area.id !== areaId))
  }

  const handleRemoveRegister = (areaId: string, registerId: string) => {
    setAreas(areas.map(area => {
      if (area.id === areaId) {
        return {
          ...area,
          registers: area.registers.filter(register => register.id !== registerId)
        }
      }
      return area
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      managerId: formData.get("managerId") as string,
      areas: areas,
    }
    onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {branch ? "Editar Sucursal" : "Agregar Sucursal"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Sucursal</Label>
            <Input
              id="name"
              name="name"
              defaultValue={branch?.name}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              name="address"
              defaultValue={branch?.address}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="managerId">Gerente</Label>
            <Select name="managerId" defaultValue={branch?.manager.id}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar gerente" />
              </SelectTrigger>
              <SelectContent>
                {MANAGERS.map((manager) => (
                  <SelectItem key={manager.id} value={manager.id}>
                    {manager.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Áreas y Cajas</Label>
            <div className="flex items-center space-x-2">
              <Select value={newAreaName} onValueChange={setNewAreaName}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar área" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_AREAS.map((area) => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={handleAddArea} disabled={!newAreaName}>
                <Plus className="w-4 h-4 mr-2" /> Añadir Área
              </Button>
            </div>
            <div className="space-y-4 mt-4">
              {areas.map((area) => (
                <div key={area.id} className="border p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{area.name}</h4>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveArea(area.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {area.registers.map((register) => (
                      <div key={register.id} className="flex items-center space-x-2">
                        {editingArea === register.id ? (
                          <Input
                            value={register.name}
                            onChange={(e) => handleEditRegister(area.id, register.id, e.target.value)}
                            onBlur={() => setEditingArea(null)}
                            autoFocus
                          />
                        ) : (
                          <span>{register.name}</span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingArea(register.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRegister(area.id, register.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleAddRegister(area.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Añadir Caja
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {branch ? "Guardar Cambios" : "Agregar Sucursal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

