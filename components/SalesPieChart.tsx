'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const salesData = [
  { name: 'Productos A', value: 30, color: '#FF6B6B' },
  { name: 'Productos B', value: 25, color: '#4ECDC4' },
  { name: 'Productos C', value: 20, color: '#45B7D1' },
  { name: 'Productos D', value: 15, color: '#96CEB4' },
  { name: 'Productos E', value: 10, color: '#FFEEAD' },
]

export function SalesPieChart() {
  const total = salesData.reduce((sum, item) => sum + item.value, 0)

  // Split data into two columns
  const midPoint = Math.ceil(salesData.length / 2);
  const leftColumnData = salesData.slice(0, midPoint);
  const rightColumnData = salesData.slice(midPoint);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Distribución de Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {salesData.map((entry, index) => (
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
              <div
                key={item.name}
                className="w-full flex items-center space-x-2 p-1 rounded transition-colors"
              >
                <div 
                  className="h-0.5 w-8 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-sm text-left">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
          {/* Right Column */}
          <div className="space-y-2">
            {rightColumnData.map((item) => (
              <div
                key={item.name}
                className="w-full flex items-center space-x-2 p-1 rounded transition-colors"
              >
                <div 
                  className="h-0.5 w-8 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-sm text-left">{item.name}</span>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

