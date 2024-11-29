import React, { useState } from 'react';
import { addExpense } from '../firebase'; // Импорт функции для добавления расходов
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && amount && date) {
      setIsSubmitting(true); // Устанавливаем индикатор загрузки
      const newExpense = {
        title,
        amount: parseFloat(amount),
        date: new Date(date),
      };

      try {
        // Сохраняем в Firestore
        const id = await addExpense(newExpense);

        // Передаём данные в родительский компонент
        onAddExpense({ ...newExpense, id });
      } catch (error) {
        console.error('Ошибка при добавлении записи:', error);
      } finally {
        setIsSubmitting(false);
      }

      setTitle('');
      setAmount('');
      setDate('');
    }
  };

  return (
    <div className="expense-form">
      <h2>Додати нову витрату</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Назва витрати:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Назва витрати"
          />
        </div>
        <div className="form-control">
          <label>Сума:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сума витрати"
          />
        </div>
        <div className="form-control">
          <label>Дата:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Додається...' : 'Додати'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
