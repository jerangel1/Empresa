'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { cn } from "@/lib/utils"

const expensesData = [
  { name: 'Nómina', value: 25, color: '#FF6B6B' },
  { name: 'Agua', value: 25, color: '#4ECDC4' },
  { name: 'Carne', value: 17, color: '#45B7D1' },
  { name: 'Luz', value: 13, color: '#96CEB4' },
  { name: 'Gasolina', value: 9, color: '#FFEEAD' },
  { name: 'Internet', value: 7, color: '#D4A5A5' },
]

interface ExpensesPieChartProps {
  onCategoryClick: (category: string) => void;
  data: { name: string; value: number; color: string; }[]; 
}

export function ExpensesPieChart({ onCategoryClick }: ExpensesPieChartProps) {
  const total = expensesData.reduce((sum, item) => sum + item.value, 0)

  const handleItemClick = (item: any) => {
    if (true) { //Always true since we only have expensesData
      onCategoryClick(item.name);
    }
  };

  // Split data into two columns
  const midPoint = Math.ceil(expensesData.length / 2);
  const leftColumnData = expensesData.slice(0, midPoint);
  const rightColumnData = expensesData.slice(midPoint);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Distribución de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expensesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onClick={handleItemClick}
              >
                {expensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-3xl font-bold">{total}%</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2">
          {/* Left Column */}
          <div className="space-y-2">
            {leftColumnData.map((item) => (
              <button
                key={item.name}
                className="w-full flex items-center space-x-2 hover:bg-muted/50 p-1 rounded transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div 
                  className="h-0.5 w-8 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-sm text-left">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </button>
            ))}
          </div>
          {/* Right Column */}
          <div className="space-y-2">
            {rightColumnData.map((item) => (
              <button
                key={item.name}
                className="w-full flex items-center space-x-2 hover:bg-muted/50 p-1 rounded transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div 
                  className="h-0.5 w-8 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-sm text-left">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

