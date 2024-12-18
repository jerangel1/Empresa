'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const accountsReceivable = [
  { client: 'Cliente A', amount: 5000, dueDate: '2023-06-15' },
  { client: 'Cliente B', amount: 3500, dueDate: '2023-06-20' },
  { client: 'Cliente C', amount: 2800, dueDate: '2023-06-25' },
]

const accountsPayable = [
  { supplier: 'Proveedor X', amount: 4000, dueDate: '2023-06-18' },
  { supplier: 'Proveedor Y', amount: 3200, dueDate: '2023-06-22' },
  { supplier: 'Proveedor Z', amount: 2500, dueDate: '2023-06-28' },
]

export function AccountsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Cuentas por Cobrar</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha de Vencimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountsReceivable.map((account) => (
              <TableRow key={account.client}>
                <TableCell>{account.client}</TableCell>
                <TableCell>{account.amount}</TableCell>
                <TableCell>{account.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Cuentas por Pagar</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proveedor</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha de Vencimiento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountsPayable.map((account) => (
              <TableRow key={account.supplier}>
                <TableCell>{account.supplier}</TableCell>
                <TableCell>{account.amount}</TableCell>
                <TableCell>{account.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

