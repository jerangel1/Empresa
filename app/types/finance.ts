export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  paymentMethod: string;
  tag: string;
  paymentType?: string;
  user?: string;
  expenseType?: string;
  description?: string;
  branch?: string;
  area?: string;
  register?: string;
}

export interface Tag {
  id: string
  name: string
  type: 'income' | 'expense'
}
