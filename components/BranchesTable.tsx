'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface BranchesTableProps {
  onRowClick: (branchId: string) => void;
  data: { id: string; name: string; income: number; expenses: number; balance: number }[];
}

export function BranchesTable({ onRowClick, data }: BranchesTableProps) {
  const totals = data.reduce(
    (acc, curr) => ({
      income: acc.income + curr.income,
      expenses: acc.expenses + curr.expenses,
      balance: acc.balance + curr.balance,
    }),
    { income: 0, expenses: 0, balance: 0 }
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Sucursal</TableHead>
            <TableHead className="text-right">Ingresos</TableHead>
            <TableHead className="text-right">Egresos</TableHead>
            <TableHead className="text-right">Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((branch) => (
            <TableRow key={branch.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onRowClick(branch.id)} title="Click para ver detalles">
              <TableCell className="font-medium">{branch.id}</TableCell>
              <TableCell>{branch.name}</TableCell>
              <TableCell className="text-right">${branch.income.toLocaleString()}</TableCell>
              <TableCell className="text-right">${branch.expenses.toLocaleString()}</TableCell>
              <TableCell className="text-right">${branch.balance.toLocaleString()}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-muted/50 font-medium">
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right text-green-600">
              ${totals.income.toLocaleString()}
            </TableCell>
            <TableCell className="text-right text-red-600">
              ${totals.expenses.toLocaleString()}
            </TableCell>
            <TableCell className="text-right text-blue-600">
              ${totals.balance.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

