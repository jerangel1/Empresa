'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const kpis = [
  { name: 'Margen de Beneficio', value: '15%' },
  { name: 'ROI', value: '22%' },
  { name: 'Ratio de Liquidez', value: '1.5' },
  { name: 'Ratio de Endeudamiento', value: '0.4' },
]

export function FinancialKPIs() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {kpi.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

