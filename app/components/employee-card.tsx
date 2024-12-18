import { Employee } from '@/app/types/employee'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'
import { format } from "date-fns"
import { es } from 'date-fns/locale'

interface EmployeeCardProps {
  employee: Employee
  onViewDetails: (employee: Employee) => void
}

export function EmployeeCard({ employee, onViewDetails }: EmployeeCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="h-24 relative bg-primary">
          <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 h-20 w-20 border-4 border-background">
            <AvatarImage src={employee.photoUrl} alt={employee.name} />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-14 pb-4">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.position}</p>
            </div>
            <Badge variant={employee.isActive ? "success" : "destructive"}>
              {employee.isActive ? "Activo" : "Inactivo"}
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
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
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-between hover:bg-secondary" 
            onClick={() => onViewDetails(employee)}
          >
            Ver detalles
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

