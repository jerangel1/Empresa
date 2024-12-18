'use client'

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

interface TransactionFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (transaction: any) => void
  defaultType: 'income' | 'expense'
}

const branches = [
  { id: 'sucursal-norte', name: 'Sucursal Norte' },
  { id: 'sucursal-sur', name: 'Sucursal Sur' },
  { id: 'sucursal-centro', name: 'Sucursal Centro' },
]

const areasByBranch: { [key: string]: { id: string; name: string; }[] } = {
  'sucursal-norte': [
    { id: 'area-panaderia-norte', name: 'Panadería' },
    { id: 'area-carniceria-norte', name: 'Carnicería' },
  ],
  'sucursal-sur': [
    { id: 'area-fruteria-sur', name: 'Frutería' },
    { id: 'area-lacteos-sur', name: 'Lácteos' },
  ],
  'sucursal-centro': [
    { id: 'area-abarrotes-centro', name: 'Abarrotes' },
    { id: 'area-electronica-centro', name: 'Electrónica' },
  ],
}

const registersByArea: { [key: string]: { id: string; name: string; }[] } = {
  'area-panaderia-norte': [
    { id: 'caja-1-panaderia-norte', name: 'Caja 1' },
    { id: 'caja-2-panaderia-norte', name: 'Caja 2' },
  ],
  'area-carniceria-norte': [
    { id: 'caja-1-carniceria-norte', name: 'Caja 1' },
  ],
  'area-fruteria-sur': [
    { id: 'caja-1-fruteria-sur', name: 'Caja 1' },
    { id: 'caja-2-fruteria-sur', name: 'Caja 2' },
  ],
  'area-lacteos-sur': [
    { id: 'caja-1-lacteos-sur', name: 'Caja 1' },
  ],
  'area-abarrotes-centro': [
    { id: 'caja-1-abarrotes-centro', name: 'Caja 1' },
    { id: 'caja-2-abarrotes-centro', name: 'Caja 2' },
  ],
  'area-electronica-centro': [
    { id: 'caja-1-electronica-centro', name: 'Caja 1' },
  ],
}

// Mock tags for transactions
const incomeTags = [
  { id: 'venta_productos', name: 'Venta de productos' },
  { id: 'ingreso_servicios', name: 'Ingreso por servicios' },
  { id: 'venta_activos', name: 'Venta de activos' },
  { id: 'ingresos_inversiones', name: 'Ingresos por inversiones' },
  { id: 'otros_ingresos', name: 'Otros ingresos' },
]

const expenseTags = [
  { id: 'pago_nomina', name: 'Pago de nómina' },
  { id: 'compra_suministros', name: 'Compra de suministros' },
  { id: 'pago_alquiler', name: 'Pago de alquiler' },
  { id: 'gastos_marketing', name: 'Gastos de marketing' },
  { id: 'pago_impuestos', name: 'Pago de impuestos' },
  { id: 'otros_gastos', name: 'Otros gastos' },
]

export function TransactionFormModal({ isOpen, onClose, onSubmit, defaultType }: TransactionFormModalProps) {
  const [type, setType] = useState<'income' | 'expense'>(defaultType)
  const [paymentType, setPaymentType] = useState<string>("")
  const [expenseType, setExpenseType] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [branch, setBranch] = useState<string>("")
  const [area, setArea] = useState<string>("")
  const [register, setRegister] = useState<string>("")

  useEffect(() => {
    setType(defaultType)
  }, [defaultType])

  useEffect(() => {
    setArea("")
    setRegister("")
  }, [branch])

  useEffect(() => {
    setRegister("")
  }, [area])

  useEffect(() => {
    setTitle("")
  }, [type])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const transaction = {
      type,
      paymentType: type === 'income' ? paymentType : undefined,
      expenseType: type === 'expense' ? expenseType : undefined,
      amount: parseFloat(amount),
      title,
      description,
      user: "John Doe", // Use the default user
      branch,
      area,
      register,
    }
    onSubmit(transaction)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Transacción</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Transacción</Label>
              <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Ingreso</SelectItem>
                  <SelectItem value="expense">Egreso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {type === 'income' ? (
              <div className="space-y-2">
                <Label htmlFor="paymentType">Tipo de Pago</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Efectivo">Efectivo</SelectItem>
                    <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                    <SelectItem value="Transferencia">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="expenseType">Tipo de Gasto</Label>
                <Select value={expenseType} onValueChange={setExpenseType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de gasto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Servicios">Servicios</SelectItem>
                    <SelectItem value="Salarios">Salarios</SelectItem>
                    <SelectItem value="Otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Transacción</Label>
            <Select value={title} onValueChange={setTitle}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar título" />
              </SelectTrigger>
              <SelectContent>
                {(type === 'income' ? incomeTags : expenseTags).map((tag: { id: string; name: string; }) => (
                  <SelectItem key={tag.id} value={tag.name}>{tag.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="branch">Sucursal</Label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar sucursal" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b: { id: string; name: string; }) => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Área</Label>
              <Select value={area} onValueChange={setArea} disabled={!branch}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar área" />
                </SelectTrigger>
                <SelectContent>
                  {branch && areasByBranch[branch].map((a: { id: string; name: string; }) => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="register">Caja</Label>
              <Select value={register} onValueChange={setRegister} disabled={!area}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar caja" />
                </SelectTrigger>
                <SelectContent>
                  {area && registersByArea[area].map((r: { id: string; name: string; }) => (
                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Fecha y Hora</Label>
            <Input
              id="date"
              value={format(new Date(), "yyyy-MM-dd HH:mm:ss")}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">Usuario</Label>
            <Input
              id="user"
              value="John Doe"
              disabled
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Transacción</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
