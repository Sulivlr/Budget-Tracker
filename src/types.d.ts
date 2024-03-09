export interface transaction {
  name: string;
  id: string;
  type: 'income' | 'expense';
  amount: number;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense' | string;
  amount
}

