import { useState } from "react"
import { Branch, Area, Register, Cashier } from "@/types/branch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Phone, Mail, CreditCard, ChevronDown, ChevronUp, ChevronRight, Search } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BranchDetailsCardProps {
  branch: Branch
}

export function BranchDetailsCard({ branch }: BranchDetailsCardProps) {
  const allEmployees = branch.areas.flatMap(area => 
    area.registers.flatMap(register => register.cashiers)
  )

  const totalRegisters = branch.areas.reduce((sum, area) => sum + area.registers.length, 0)

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false)
  const [employeeSearch, setEmployeeSearch] = useState("")

  const filteredEmployees = allEmployees.filter(employee =>
    employee.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    (employee.role && employee.role.toLowerCase().includes(employeeSearch.toLowerCase()))
  )

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <CardHeader className="pb-4 bg-primary text-primary-foreground">
        <CardTitle className="text-2xl font-bold">{branch.name}</CardTitle>
        <div className="flex items-center text-sm opacity-80 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {branch.address}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${branch.manager.id}`} alt={branch.manager.name} />
            <AvatarFallback>{branch.manager.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{branch.manager.name}</p>
            <p className="text-sm text-muted-foreground">Gerente de Sucursal</p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{branch.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>{branch.name.toLowerCase().replace(/\s+/g, '')}@empresa.com</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full h-full p-6 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setIsEmployeeModalOpen(true)}
                  >
                    <Users className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold">{branch.employeeCount}</div>
                    <p className="text-sm text-muted-foreground">Total de Empleados</p>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Cajas
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRegisters}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">Áreas y Cajas</h3>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {branch.areas.map((area) => (
              <AccordionItem key={area.id} value={area.id} className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{area.name}</span>
                    <Badge variant="secondary">
                      {area.registers.length} {area.registers.length === 1 ? 'caja' : 'cajas'}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 bg-muted/30">
                  {area.registers.map((register) => (
                    <div key={register.id} className="mb-4 last:mb-0">
                      <h4 className="font-medium mb-2 flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        {register.name}
                        <Badge variant={register.isActive ? "default" : "destructive"} className="ml-2">
                          {register.isActive ? "Activa" : "Inactiva"}
                        </Badge>
                      </h4>
                      <div className="pl-6 space-y-2">
                        {register.cashiers.map((cashier) => (
                          <div key={cashier.id} className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`https://i.pravatar.cc/150?u=${cashier.id}`} alt={cashier.name} />
                              <AvatarFallback>{cashier.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{cashier.name}</span>
                            <Badge variant={cashier.isActive ? "outline" : "secondary"} className="text-xs">
                              {cashier.isActive ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-2">Rendimiento</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">$123,456</div>
                <p className="text-sm text-muted-foreground">Ventas Mensuales</p>
              </CardContent>
            </Card>
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">98%</div>
                <p className="text-sm text-muted-foreground">Satisfacción del Cliente</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
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
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${employee.id}`} alt={employee.name} />
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
    </Card>
  )
}

