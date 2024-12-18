'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionRegister } from "../components/TransactionRegister"
import { CashFlowAnalysis } from "../components/CashFlowAnalysis"
import { BudgetComparison } from "../components/BudgetComparison"
import { AccountsOverview } from "../components/AccountsOverview"
import { FinancialKPIs } from "../components/FinancialKPIs"
import { BarChart } from 'lucide-react'

export default function Finanzas() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold flex items-center">
                <BarChart className="w-8 h-8 mr-2 text-primary" />
                Finanzas
              </h2>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions" className="space-y-4">
            <TabsList>
              <TabsTrigger value="transactions">Transacciones</TabsTrigger>
              <TabsTrigger value="cashflow">Flujo de Caja</TabsTrigger>
              <TabsTrigger value="budget">Presupuesto</TabsTrigger>
              <TabsTrigger value="accounts">Cuentas</TabsTrigger>
              <TabsTrigger value="kpis">KPIs Financieros</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Registro de Transacciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionRegister />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cashflow">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis de Flujo de Caja</CardTitle>
                </CardHeader>
                <CardContent>
                  <CashFlowAnalysis />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle>Comparación de Presupuesto</CardTitle>
                </CardHeader>
                <CardContent>
                  <BudgetComparison />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accounts">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de Cuentas</CardTitle>
                </CardHeader>
                <CardContent>
                  <AccountsOverview />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kpis">
              <Card>
                <CardHeader>
                  <CardTitle>KPIs Financieros</CardTitle>
                </CardHeader>
                <CardContent>
                  <FinancialKPIs />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

