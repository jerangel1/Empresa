'use client'

import { useState } from "react"
import { Branch, Register, Cashier, Area } from "@/types/branch"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users, CreditCard, ChevronDown, ChevronUp, Edit, Trash2, Search } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { AreaDetailsModal } from "./area-details-modal"

interface BranchCardProps {
  branch: Branch
  onEdit: (branch: Branch) => void
  onDelete: (branchId: string) => void
}

export function BranchCard({ branch, onEdit, onDelete }: BranchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showEmployees, setShowEmployees] = useState(false)
  const [employeeSearch, setEmployeeSearch] = useState("")
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false)

  const totalRegisters = branch.areas.reduce(
    (sum, area) => sum + area.registers.length,
    0
  )

  const allEmployees = branch.areas.flatMap(area => 
    area.registers.flatMap(register => 
      register.cashiers.map(cashier => ({
        ...cashier,
        role: cashier.role || 'Cajero', // Asumimos 'Cajero' como rol por defecto si no está definido
      }))
    )
  )

  const filteredEmployees = allEmployees.filter(employee =>
    employee.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    (employee.role && employee.role.toLowerCase().includes(employeeSearch.toLowerCase()))
  )

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div className="bg-primary p-4 text-primary-foreground">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold mb-1">{branch.name}</h3>
                <div className="flex items-center text-sm opacity-80">
                  <MapPin className="w-4 h-4 mr-1" />
                  {branch.address}
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                {branch.areas.length} áreas
              </Badge>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={`https://i.pravatar.cc/100?u=${branch.manager.id}`} alt={branch.manager.name} />
                <AvatarFallback>{branch.manager.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{branch.manager.name}</h4>
                <p className="text-sm text-muted-foreground">Gerente</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <Button
                variant="outline"
                className="bg-muted hover:bg-muted/80 flex flex-col items-center justify-center h-auto py-2"
                onClick={() => setIsEmployeeModalOpen(true)}
              >
                <Users className="w-5 h-5 mb-1 text-primary" />
                <p className="text-sm text-muted-foreground">Empleados</p>
                <p className="text-lg font-bold">{branch.employeeCount}</p>
              </Button>
              <div className="bg-muted rounded-lg p-2">
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm text-muted-foreground">Cajas</p>
                <p className="text-lg font-bold">{totalRegisters}</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Ocultar áreas
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Ver áreas
                </>
              )}
            </Button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 overflow-hidden"
                >
                  {branch.areas.map((area) => (
                    <div 
                      key={area.id} 
                      className="bg-muted p-3 rounded-lg flex justify-between items-center hover:bg-muted/80 cursor-pointer transition-colors"
                      onClick={() => setSelectedArea(area)}
                    >
                      <h5 className="font-medium">{area.name}</h5>
                      <Badge variant="secondary">
                        {area.registers.length} {area.registers.length === 1 ? 'caja' : 'cajas'}
                      </Badge>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(branch)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(branch.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Eliminar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEmployeeModalOpen} onOpenChange={setIsEmployeeModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Empleados de {branch.name}</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o rol..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <ScrollArea className="h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/100?u=${employee.id}`} alt={employee.name} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{employee.name}</span>
                    </TableCell>
                    <TableCell>{employee.role || 'Cajero'}</TableCell>
                    <TableCell>{branch.areas.find(area => 
                      area.registers.some(register => 
                        register.cashiers.some(cashier => cashier.id === employee.id)
                      )
                    )?.name}</TableCell>
                    <TableCell>
                      <Badge variant={employee.isActive ? "default" : "destructive"}>
                        {employee.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <AreaDetailsModal
        area={selectedArea}
        //branchName={branch.name}
        isOpen={!!selectedArea}
        onClose={() => setSelectedArea(null)}
      />
    </>
  )
}

