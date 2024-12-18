'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface FinancialChartsProps {
  data: { name: string; ingresos: number; egresos: number }[];
  period: 'day' | 'week' | 'month' | 'year' | 'custom';
}

export function FinancialCharts({ data, period }: FinancialChartsProps) {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area')

  const formatXAxis = (tickItem: string) => {
    if (period === 'day') {
      return tickItem; // Ya está formateado como HH:mm
    } else if (period === 'week' || period === 'month') {
      return tickItem.split(' ')[0]; // Mostrar solo el día para semanas y meses
    } else {
      return tickItem; // Para año y personalizado, mostrar como está
    }
  };

  const formatTooltip = (value: number, name: string) => {
    return [`$${value.toLocaleString()}`, name === 'ingresos' ? 'Ingresos' : 'Egresos'];
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Ingresos vs Egresos</CardTitle>
        <div className="flex space-x-2">
          <Select
            value={chartType}
            onValueChange={(value) => setChartType(value as 'area' | 'bar')}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tipo de gráfica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">Gráfica de Área</SelectItem>
              <SelectItem value="bar">Gráfica de Barras</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {chartType === 'area' ? (
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickFormatter={formatXAxis} />
              <YAxis />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              <Area type="monotone" dataKey="ingresos" name="Ingresos" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="egresos" name="Egresos" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickFormatter={formatXAxis} />
              <YAxis />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              <Bar dataKey="ingresos" name="Ingresos" fill="#8884d8" />
              <Bar dataKey="egresos" name="Egresos" fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

