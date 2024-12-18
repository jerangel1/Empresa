export interface Transaction {
  id: string
  title: string
  date: string
  amount: number
  type: 'income' | 'expense'
  paymentMethod: string
  tag: string
}

export interface Tag {
  id: string
  name: string
  type: 'income' | 'expense'
}

