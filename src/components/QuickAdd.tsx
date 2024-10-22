import React from 'react';
import { LucideIcon } from 'lucide-react';

type QuickExpenseType = {
  icon: LucideIcon;
  label: string;
  amount: number;
};

type Props = {
  quickExpenses: QuickExpenseType[];
  onQuickAdd: (category: string, amount: number) => void;
};

const QuickAdd: React.FC<Props> = ({ quickExpenses, onQuickAdd }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {quickExpenses.map((expense) => {
        const Icon = expense.icon;
        return (
          <button
            key={expense.label}
            onClick={() => onQuickAdd(expense.label, expense.amount)}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Icon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-gray-700 font-medium">{expense.label}</span>
            <span className="text-gray-500 text-sm">${expense.amount}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickAdd;