import React from 'react';
import { Trash2 } from 'lucide-react';
import { ExpenseType } from '../types';

type Props = {
  expenses: ExpenseType[];
  onDelete: (id: number) => void;
};

const ExpenseList: React.FC<Props> = ({ expenses, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="flex-1">
            <h3 className="text-gray-800 font-medium">{expense.category}</h3>
            <p className="text-gray-500 text-sm">{formatDate(expense.date)}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-900 font-medium">${expense.amount}</span>
            <button
              onClick={() => onDelete(expense.id)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      
      {expenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No expenses yet</p>
          <p className="text-gray-400 text-sm">Add some expenses to see them here</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;