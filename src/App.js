import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseChart from './components/ExpenseChart';
import ExpenseList from './components/ExpenseList';
import { getExpenses, deleteExpense, updateExpense } from './firebase';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2023');
  const [loading, setLoading] = useState(true);

  // Загрузка данных из Firebase
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const fetchedExpenses = await getExpenses();
        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Добавление нового расхода
  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  // Удаление расхода
  const deleteExpenseHandler = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Редактирование расхода
  const editExpenseHandler = async (id, updatedExpense) => {
    try {
      await updateExpense(id, updatedExpense);
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      );
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const changeYearHandler = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="App">
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ExpenseFilter selectedYear={selectedYear} onChangeYear={changeYearHandler} />
      <ExpenseChart expenses={expenses} selectedYear={selectedYear} />
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpenseHandler}
        onEditExpense={editExpenseHandler}
        loading={loading}
      />
    </div>
  );
};

export default App;
