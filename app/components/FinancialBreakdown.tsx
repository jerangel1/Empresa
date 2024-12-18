'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface BreakdownItemProps {
  label: string
  amount: number
  total: number
}

function BreakdownItem({ label, amount, total }: BreakdownItemProps) {
  const percentage = (amount / total) * 100

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">${amount.toLocaleString()}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

interface FinancialBreakdownProps {
  ingresos: {
    efectivo: number;
    tarjeta: number;
    traspaso: number;
    total: number;
  };
  egresos: {
    fiscal: number;
    directo: number;
    prestamo: number;
    total: number;
  };
}

export function FinancialBreakdown({ ingresos, egresos }: FinancialBreakdownProps) {


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Desglose de Ingresos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BreakdownItem label="Efectivo" amount={ingresos.efectivo} total={ingresos.total} />
          <BreakdownItem label="Tarjeta" amount={ingresos.tarjeta} total={ingresos.total} />
          <BreakdownItem label="Traspaso" amount={ingresos.traspaso} total={ingresos.total} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desglose de Egresos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <BreakdownItem label="Fiscal" amount={egresos.fiscal} total={egresos.total} />
          <BreakdownItem label="Directo" amount={egresos.directo} total={egresos.total} />
          <BreakdownItem label="Préstamo" amount={egresos.prestamo} total={egresos.total} />
        </CardContent>
      </Card>
    </div>
  )
}

