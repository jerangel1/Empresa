'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Ventas', presupuestado: 4000, real: 2400 },
  { name: 'Marketing', presupuestado: 3000, real: 1398 },
  { name: 'Operaciones', presupuestado: 2000, real: 9800 },
  { name: 'Recursos Humanos', presupuestado: 2780, real: 3908 },
  { name: 'Tecnología', presupuestado: 1890, real: 4800 },
  { name: 'Administración', presupuestado: 2390, real: 3800 },
]

export function BudgetComparison() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="presupuestado" fill="#8884d8" />
          <Bar dataKey="real" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

