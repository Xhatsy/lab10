import React from 'react';
import './ExpenseChart.css';

const ExpenseChart = ({ expenses, selectedYear }) => {
  // Створюємо масив для витрат за кожен місяць
  const months = Array(12).fill(0); // 12 місяців
  expenses
    .filter(expense => expense.date.getFullYear() === parseInt(selectedYear))
    .forEach(expense => {
      const month = expense.date.getMonth(); // Отримуємо місяць (0 - 11)
      months[month] += expense.amount; // Додаємо суму до відповідного місяця
    });

  return (
    <div className="expense-chart">
      <h2>Витрати за {selectedYear}</h2>
      <div className="chart-bar-container">
        {months.map((monthAmount, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{ height: `${(monthAmount / Math.max(...months)) * 100}%` }}
          >
            <span className="month-label">{new Date(0, index).toLocaleString('en', { month: 'short' })}</span>
            <span className="bar-value">${monthAmount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseChart;
