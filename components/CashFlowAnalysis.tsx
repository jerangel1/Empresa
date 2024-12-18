'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Ene', ingresos: 4000, egresos: 2400, flujoNeto: 1600 },
  { name: 'Feb', ingresos: 3000, egresos: 1398, flujoNeto: 1602 },
  { name: 'Mar', ingresos: 2000, egresos: 9800, flujoNeto: -7800 },
  { name: 'Abr', ingresos: 2780, egresos: 3908, flujoNeto: -1128 },
  { name: 'May', ingresos: 1890, egresos: 4800, flujoNeto: -2910 },
  { name: 'Jun', ingresos: 2390, egresos: 3800, flujoNeto: -1410 },
]

export function CashFlowAnalysis() {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line type="monotone" dataKey="ingresos" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="egresos" stroke="#82ca9d" />
          <Line type="monotone" dataKey="flujoNeto" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

