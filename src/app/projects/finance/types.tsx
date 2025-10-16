export type FinanceAccount = {
  id: string
  name: string
  type: string
  provider: string
  balance: number
}
export type Expense = {
  id: string
  date: Date
  item: string
  description?: string
  price: number
  category: string
}
export type Transaction = {
  id: string
  date: Date
  description: string
  amount: number
  category: string
  account: string
  type: 'Cash' | 'Card' | 'Transfer'
}
