import { useState } from "react"
import { Area, Register, Cashier } from "@/types/branch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, ChevronDown, ChevronUp } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface AreaCardProps {
  area: Area
}

export function AreaCard({ area }: AreaCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{area.name}</span>
          <Badge variant="secondary">{area.registers.length} cajas</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full mb-4"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Ocultar detalles
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Ver detalles
            </>
          )}
        </Button>
        {expanded && (
          <Accordion type="single" collapsible className="w-full">
            {area.registers.map((register) => (
              <AccordionItem key={register.id} value={register.id}>
                <AccordionTrigger>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>{register.name}</span>
                    <Badge variant={register.isActive ? "success" : "destructive"}>
                      {register.isActive ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {register.cashiers.map((cashier) => (
                      <div key={cashier.id} className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={cashier.photoUrl} alt={cashier.name} />
                          <AvatarFallback>{cashier.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{cashier.name}</span>
                        <Badge variant={cashier.isActive ? "success" : "destructive"}>
                          {cashier.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}

