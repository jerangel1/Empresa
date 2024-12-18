'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface MetricCardProps {
  title: string
  amount: number
  percentage: number
  type: 'positive' | 'negative'
  icon: React.ReactNode
}

function MetricCard({ title, amount, percentage, type, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount.toLocaleString()}</div>
        <p className={`flex items-center text-xs ${
          type === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {type === 'positive' ? (
            <ArrowUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1" />
          )}
          {percentage}%
          <span className="text-muted-foreground ml-1">vs. periodo anterior</span>
        </p>
      </CardContent>
    </Card>
  )
}

interface FinancialMetricsProps {
  data: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
  }
}

export function FinancialMetrics({ data }: FinancialMetricsProps) {
  // These percentages would typically be calculated based on previous period data
  const incomePct = 12.5
  const expensesPct = 2.3
  const profitPct = 8.2

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Ingresos Totales"
        amount={data.totalIncome}
        percentage={incomePct}
        type="positive"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Gastos Totales"
        amount={data.totalExpenses}
        percentage={expensesPct}
        type="negative"
        icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Ganancias Netas"
        amount={data.netProfit}
        percentage={profitPct}
        type="positive"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}

