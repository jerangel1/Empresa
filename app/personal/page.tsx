'use client'

import { useState } from "react"
import { Employee, Position } from '@/app/types/employee'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Eye, Search, UserPlus, LayoutGrid, LayoutList } from 'lucide-react'
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import { EmployeeDetailsModal } from "../components/employee-details-modal"
import { EmployeeFormModal } from "../components/employee-form-modal"
import { EmployeeCard } from "../components/employee-card"

// Mock data - replace with actual data from your backend
const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Ana García",
    photoUrl: "https://i.pravatar.cc/150?img=1",
    position: "cajero",
    branch: "Sucursal Norte",
    area: "Panadería",
    startDate: "2022-07-26",
    isActive: true,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    photoUrl: "https://i.pravatar.cc/150?img=2",
    position: "gerente",
    branch: "Sucursal Sur",
    area: "Cremería",
    startDate: "2020-10-08",
    isActive: true,
  },
  {
    id: "3",
    name: "Laura Martínez",
    photoUrl: "https://i.pravatar.cc/150?img=3",
    position: "admin",
    branch: "Sucursal Central",
    area: "Administración",
    startDate: "2021-03-15",
    isActive: true,
  },
  {
    id: "4",
    name: "Miguel Ángel Pérez",
    photoUrl: "https://i.pravatar.cc/150?img=4",
    position: "asistente",
    branch: "Sucursal Norte",
    area: "Carnicería",
    startDate: "2023-01-10",
    isActive: true,
  },
  {
    id: "5",
    name: "Isabel Fernández",
    photoUrl: "https://i.pravatar.cc/150?img=5",
    position: "cajero",
    branch: "Sucursal Sur",
    area: "Frutería",
    startDate: "2022-11-03",
    isActive: false,
  },
]

const POSITIONS: Position[] = ['admin', 'cajero', 'gerente', 'asistente', 'seguridad']
const BRANCHES = ['Sucursal Norte', 'Sucursal Sur', 'Sucursal Central']

export default function Personal() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES)
  const [searchQuery, setSearchQuery] = useState("")
  const [branchFilter, setBranchFilter] = useState<string>("all")
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>()
  const [viewType, setViewType] = useState<'table' | 'card'>('card') // Update 1: Changed initial viewType to 'card'

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesBranch = branchFilter === "all" || employee.branch === branchFilter
    const matchesPosition = positionFilter === "all" || employee.position === positionFilter
    return matchesSearch && matchesBranch && matchesPosition
  })

  const handleAddEmployee = (data: Partial<Employee>) => {
    const newEmployee: Employee = {
      id: (employees.length + 1).toString(),
      name: data.name!,
      photoUrl: data.photoUrl!,
      position: data.position!,
      branch: data.branch!,
      area: data.area!,
      startDate: data.startDate!,
      isActive: true,
    }
    setEmployees([...employees, newEmployee])
    setIsFormOpen(false)
  }

  const handleEditEmployee = (data: Partial<Employee>) => {
    if (editingEmployee) {
        const updatedEmployee: Employee = {
            ...editingEmployee,
            ...data,
        };
        setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
        setIsFormOpen(false);
    }
};

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId))
  }

  const activeEmployees = employees.filter(emp => emp.isActive).length
  const inactiveEmployees = employees.length - activeEmployees

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold flex items-center">
                <Users className="w-8 h-8 mr-2 text-primary" />
                Personal
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewType(viewType === 'table' ? 'card' : 'table')}
                >
                  {viewType === 'card' ? ( // Update 2: Updated button text for switching views
                    <>
                      <LayoutList className="w-4 h-4 mr-2" />
                      Vista de Tabla
                    </>
                  ) : (
                    <>
                      <LayoutGrid className="w-4 h-4 mr-2" />
                      Vista de Tarjetas
                    </>
                  )}
                </Button>
                <Button onClick={() => setIsFormOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Agregar Personal
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{activeEmployees} Personal Activo</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{inactiveEmployees} Personal Inactivo</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar por nombre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-[200px]"
                  />
                </div>
                <Select value={branchFilter} onValueChange={setBranchFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas las sucursales" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las sucursales</SelectItem>
                    {BRANCHES.map((branch) => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos los cargos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los cargos</SelectItem>
                    {POSITIONS.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position.charAt(0).toUpperCase() + position.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === 'table' ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Posición</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Fecha de Inicio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={employee.photoUrl} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.branch}</TableCell>
                      <TableCell>{employee.area}</TableCell>
                      <TableCell>
                        {format(new Date(employee.startDate), "PP", { locale: es })}
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.isActive ? "default" : "destructive"}>
                          {employee.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setIsDetailsOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onViewDetails={(employee) => {
                    setSelectedEmployee(employee)
                    setIsDetailsOpen(true)
                  }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EmployeeDetailsModal
        employee={selectedEmployee}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setSelectedEmployee(null)
        }}
        onEdit={(employee) => {
          setIsDetailsOpen(false)
          handleEditEmployee(employee)
        }}
        onDelete={handleDeleteEmployee}
      />

      <EmployeeFormModal
        employee={editingEmployee}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingEmployee(undefined)
        }}
        onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
      />
    </div>
  )
}

