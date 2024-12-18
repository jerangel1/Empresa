import { Transaction } from "@/app/types/finance"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Calendar, User, DollarSign, Tag, FileText, MapPin } from 'lucide-react'

interface TransactionDetailsModalProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
}

export function TransactionDetailsModal({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailsModalProps) {
  if (!transaction) return null

  const isIncome = transaction.type === 'income'

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {isIncome ? (
              <ArrowUpRight className="w-6 h-6 text-green-500" />
            ) : (
              <ArrowDownRight className="w-6 h-6 text-red-500" />
            )}
            Detalles de la Transacción
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <Card>
            <CardContent className="grid gap-4 pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={isIncome ? "default" : "destructive"} className="text-sm px-2 py-1">
                    {isIncome ? 'Ingreso' : 'Egreso'}
                  </Badge>
                  <span className="text-2xl font-bold">${transaction.amount.toLocaleString()}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ID: {transaction.id}
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha y Hora</p>
                    <p className="font-semibold">
                      {format(new Date(transaction.date), "PPpp", { locale: es })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Usuario</p>
                    <p className="font-semibold">{transaction.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {isIncome ? 'Tipo de Pago' : 'Tipo de Gasto'}
                    </p>
                    <p className="font-semibold">{transaction.paymentType || transaction.expenseType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Título</p>
                    <p className="font-semibold">{transaction.title}</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Descripción</p>
                  <p className="font-semibold">{transaction.description}</p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sucursal</p>
                    <p className="font-semibold">{transaction.branch}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Área</p>
                  <p className="font-semibold">{transaction.area}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Caja</p>
                  <p className="font-semibold">{transaction.register}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

