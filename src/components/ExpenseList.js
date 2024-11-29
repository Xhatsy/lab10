import React, { useState } from 'react'; // Добавлен импорт useState
import './ExpenseList.css';
import Loader from './Loader';

const ExpenseList = ({ expenses, onDeleteExpense, onEditExpense, loading }) => {
  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');

  if (loading) {
    return <Loader />;
  }

  const startEditHandler = (expense) => {
    setEditMode(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
  };

  const cancelEditHandler = () => {
    setEditMode(null);
    setEditTitle('');
    setEditAmount('');
  };

  const saveEditHandler = () => {
    onEditExpense(editMode, { title: editTitle, amount: parseFloat(editAmount) });
    setEditMode(null);
  };

  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense.id}>
          {editMode === expense.id ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
              <button onClick={saveEditHandler}>Сохранить</button>
              <button onClick={cancelEditHandler}>Отмена</button>
            </div>
          ) : (
            <div>
              {expense.title}: ${expense.amount.toFixed(2)} on {expense.date.toDateString()}
              <button onClick={() => startEditHandler(expense)}>Редактировать</button>
              <button onClick={() => onDeleteExpense(expense.id)}>Удалить</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
