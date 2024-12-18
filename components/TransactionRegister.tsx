'use client'

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import { Tag, Download, Plus, Eye } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TagFormModal } from "./tag-form-modal"
import { TransactionFormModal } from "./transaction-form-modal"
import { TransactionDetailsModal } from "./transaction-details-modal"
import { Transaction } from "@/app/types/finance"

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "000001", title: "Venta de productos", date: "2023-12-01", amount: 5000, type: "income", paymentMethod: "Efectivo", tag: "Ventas", paymentType: "Efectivo", user: "Ana García", description: "Venta de productos en la tienda principal" },
  { id: "000002", title: "Pago de nómina", date: "2023-12-02", amount: 3000, type: "expense", paymentMethod: "Transferencia", tag: "Nómina", expenseType: "Salarios", user: "Carlos Rodríguez", description: "Pago de salarios a empleados" },
  { id: "000003", title: "Ingreso por servicios", date: "2023-12-03", amount: 2500, type: "income", paymentMethod: "Tarjeta", tag: "Servicios", paymentType: "Tarjeta", user: "María López", description: "Ingresos por servicios de consultoría" },
  { id: "000004", title: "Compra de suministros", date: "2023-12-04", amount: 1000, type: "expense", paymentMethod: "Efectivo", tag: "Suministros", expenseType: "Otros", user: "Juan Pérez", description: "Compra de suministros de oficina" },
  { id: "000005", title: "Pago de alquiler", date: "2023-12-05", amount: 1500, type: "expense", paymentMethod: "Transferencia", tag: "Alquiler", expenseType: "Servicios", user: "Laura Martínez", description: "Pago mensual de alquiler de local" },
]

export function TransactionRegister() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income')
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = transactions.filter(t => t.type === activeTab)
  const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

  const handleAddTag = (tag: { name: string; description: string }) => {
    console.log("New tag:", tag)
    // Here you would typically update your tags list or send the data to your backend
  }

  const handleAddTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transaction,
      id: (transactions.length + 1).toString().padStart(6, '0'),
      date: format(new Date(), "yyyy-MM-dd"),
    }
    setTransactions([...transactions, newTransaction])
    setIsTransactionModalOpen(false)
  }

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'income' | 'expense')} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="income" className="flex-1">Ingresos</TabsTrigger>
            <TabsTrigger value="expense" className="flex-1">Egresos</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsTagModalOpen(true)}>
            <Tag className="w-4 h-4 mr-2" />
            Agregar Tag
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {format(selectedDate, "MMM yyyy", { locale: es })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" onClick={() => setIsTransactionModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>{activeTab === 'income' ? 'Tipo de Pago' : 'Tipo de Gasto'}</TableHead>
              <TableHead className="text-right">Monto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>{transaction.paymentType || transaction.expenseType}</TableCell>
                <TableCell className="text-right">
                  ${transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDetails(transaction)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6} className="font-medium">
                Total
              </TableCell>
              <TableCell className="text-right font-bold">
                ${totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <TagFormModal
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
        onSubmit={handleAddTag}
      />
      <TransactionFormModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSubmit={handleAddTransaction}
        defaultType={activeTab}
      />
      <TransactionDetailsModal
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  )
}
