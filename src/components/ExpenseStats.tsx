import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { ExpenseType } from '../types';

Chart.register(...registerables);

type Props = {
  expenses: ExpenseType[];
};

const ExpenseStats: React.FC<Props> = ({ expenses }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const calculateTotalSpent = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const prepareChartData = () => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(categoryTotals),
      data: Object.values(categoryTotals),
    };
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const { labels, data } = prepareChartData();

        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels,
            datasets: [{
              data,
              backgroundColor: [
                '#3B82F6',
                '#10B981',
                '#F59E0B',
                '#EF4444',
                '#8B5CF6',
                '#EC4899',
              ],
              borderWidth: 0,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20,
                  usePointStyle: true,
                },
              },
            },
            cutout: '70%',
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-gray-700 font-medium mb-2">Total Spent</h2>
        <p className="text-3xl font-bold text-blue-600">${calculateTotalSpent()}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-gray-700 font-medium mb-4">Spending by Category</h2>
        <div className="aspect-square">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStats;