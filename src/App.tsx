import React, { useState, useEffect } from 'react';
import { PlusCircle, Coffee, Bus, Pizza, ShoppingBag, PieChart, ArrowLeft } from 'lucide-react';
import { ExpenseType, ViewType } from './types';
import QuickAdd from './components/QuickAdd';
import ExpenseList from './components/ExpenseList';
import ExpenseStats from './components/ExpenseStats';
import CustomExpense from './components/CustomExpense';

function App() {
  const [expenses, setExpenses] = useState<ExpenseType[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [view, setView] = useState<ViewType>('quick');
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const quickExpenses = [
    { icon: Coffee, label: 'Coffee', amount: 3 },
    { icon: Bus, label: 'Transport', amount: 5 },
    { icon: Pizza, label: 'Lunch', amount: 12 },
    { icon: ShoppingBag, label: 'Groceries', amount: 25 },
  ];

  const addExpense = (category: string, amount: number) => {
    const newExpense = {
      id: Date.now(),
      category,
      amount,
      date: new Date().toISOString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          {view !== 'quick' && (
            <button 
              onClick={() => setView('quick')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">
            {view === 'quick' ? 'Ant Expense' : view === 'list' ? 'History' : 'Statistics'}
          </h1>
          <button 
            onClick={() => view === 'quick' ? setShowCustom(true) : setView('quick')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {view === 'quick' ? (
              <PlusCircle className="w-6 h-6 text-blue-600" />
            ) : (
              <PlusCircle className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {view === 'quick' && (
          <QuickAdd 
            quickExpenses={quickExpenses}
            onQuickAdd={addExpense}
          />
        )}
        
        {view === 'list' && (
          <ExpenseList 
            expenses={expenses}
            onDelete={deleteExpense}
          />
        )}
        
        {view === 'stats' && (
          <ExpenseStats expenses={expenses} />
        )}

        {/* Custom Expense Modal */}
        {showCustom && (
          <CustomExpense
            onAdd={(category, amount) => {
              addExpense(category, amount);
              setShowCustom(false);
            }}
            onClose={() => setShowCustom(false)}
          />
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2 flex justify-around">
          <button
            onClick={() => setView('quick')}
            className={`p-4 rounded-lg ${view === 'quick' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <PlusCircle className="w-6 h-6 mx-auto" />
            <span className="text-xs mt-1">Quick Add</span>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-4 rounded-lg ${view === 'list' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <ShoppingBag className="w-6 h-6 mx-auto" />
            <span className="text-xs mt-1">History</span>
          </button>
          <button
            onClick={() => setView('stats')}
            className={`p-4 rounded-lg ${view === 'stats' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <PieChart className="w-6 h-6 mx-auto" />
            <span className="text-xs mt-1">Stats</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;