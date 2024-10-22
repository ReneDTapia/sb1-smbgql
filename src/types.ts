export type ExpenseType = {
  id: number;
  category: string;
  amount: number;
  date: string;
};

export type ViewType = 'quick' | 'list' | 'stats';