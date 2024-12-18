'use client'

import { useState } from 'react'
import { DateFilter } from './components/DateFilter'
import { FinancialMetrics } from './components/FinancialMetrics'
import { FinancialCharts } from './components/FinancialCharts'
import { FinancialBreakdown } from './components/FinancialBreakdown'
import { BranchesTable } from './components/BranchesTable'
import { ExpensesPieChart } from './components/ExpensesPieChart'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { BranchDetailModal } from './components/BranchDetailModal'
import { ExpenseCategoryModal } from './components/ExpenseCategoryModal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, LayoutDashboard } from 'lucide-react'
import { SalesPieChart } from './components/SalesPieChart'
import { getFinancialData } from '../utils/financialData';

interface BranchDetail {
  id: string;
  name: string;
  totalIncome: number;
  totalExpenses: number;
  transactions: {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
  }[];
}

export default function Home() {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year' | 'custom'>('day');
  const [financialData, setFinancialData] = useState(getFinancialData('day'));

  const handleFilterChange = (filter: { type: string; from?: Date; to?: Date }) => {
    const period = filter.type as 'day' | 'week' | 'month' | 'year' | 'custom';
    setSelectedPeriod(period);
    setDateRange({ from: filter.from, to: filter.to });
    setFinancialData(getFinancialData(period, filter.from, filter.to));
  }

  const handleBranchRowClick = (branchId: string) => {
    setSelectedBranch(branchId)
  }

  const handleExpenseCategoryClick = (category: string) => {
    setSelectedExpenseCategory(category)
  }

  const getBranchDetails = (branchId: string): BranchDetail => {
    // This is where you would typically fetch data from your API
    // For now, we'll return mock data
    return {
      id: branchId,
      name: `Sucursal ${branchId}`,
      totalIncome: 50000,
      totalExpenses: 30000,
      transactions: [
        { id: '1', date: '2023-05-01', description: 'Venta de productos', amount: 5000, type: 'income' },
        { id: '2', date: '2023-05-02', description: 'Pago de servicios', amount: 1000, type: 'expense' },
        { id: '3', date: '2023-05-03', description: 'Venta de servicios', amount: 3000, type: 'income' },
        { id: '4', date: '2023-05-04', description: 'Compra de suministros', amount: 2000, type: 'expense' },
        // Add more transactions as needed
      ],
    };
  }

  const calculateBreakdowns = (totalIncome: number, totalExpenses: number) => {
    return {
      ingresos: {
        efectivo: Math.round(totalIncome * 0.3),
        tarjeta: Math.round(totalIncome * 0.4),
        traspaso: Math.round(totalIncome * 0.3),
        total: totalIncome,
      },
      egresos: {
        fiscal: Math.round(totalExpenses * 0.4),
        directo: Math.round(totalExpenses * 0.35),
        prestamo: Math.round(totalExpenses * 0.25),
        total: totalExpenses,
      },
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
            <DateFilter onFilterChange={handleFilterChange} />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <FinancialMetrics data={financialData} />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg shadow-md">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="branches">Sucursales</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <FinancialCharts data={financialData.incomeData} period={selectedPeriod} />
            <FinancialBreakdown {...calculateBreakdowns(financialData.totalIncome, financialData.totalExpenses)} />
          </div>
        </TabsContent>

        <TabsContent value="branches">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento de Sucursales</CardTitle>
            </CardHeader>
            <CardContent>
              <BranchesTable onRowClick={handleBranchRowClick} data={financialData.branchesData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="grid grid-cols-2 gap-6">
            <ExpensesPieChart onCategoryClick={handleExpenseCategoryClick} data={financialData.expensesData} />
            <SalesPieChart data={financialData.salesData} />
          </div>
        </TabsContent>
      </Tabs>

      <BranchDetailModal
        branch={selectedBranch ? getBranchDetails(selectedBranch) : null}
        isOpen={!!selectedBranch}
        onClose={() => setSelectedBranch(null)}
      />
      <ExpenseCategoryModal
        category={selectedExpenseCategory}
        isOpen={!!selectedExpenseCategory}
        onClose={() => setSelectedExpenseCategory(null)}
      />
    </div>
  )
}

