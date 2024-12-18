import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ExpenseCategoryModalProps {
  category: string | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for branch expenses
const branchExpenses = [
  { id: '1', name: 'Sucursal Norte', amount: 5000 },
  { id: '2', name: 'Sucursal Sur', amount: 4500 },
  { id: '3', name: 'Sucursal Este', amount: 3800 },
  { id: '4', name: 'Sucursal Oeste', amount: 4200 },
  { id: '5', name: 'Sucursal Centro', amount: 5500 },
];

export function ExpenseCategoryModal({ category, isOpen, onClose }: ExpenseCategoryModalProps) {
  if (!category) return null;

  const total = branchExpenses.reduce((sum, branch) => sum + branch.amount, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Desglose de Gastos: {category}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sucursal</TableHead>
              <TableHead className="text-right">Monto</TableHead>
              <TableHead className="text-right">Porcentaje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branchExpenses.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell className="text-right">${branch.amount.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {((branch.amount / total) * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right font-bold">${total.toLocaleString()}</TableCell>
              <TableCell className="text-right font-bold">100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

