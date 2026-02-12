import React, { useState } from 'react';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import AddExpenseModal from '../components/AddExpenseModal';
import classes from './Expenses.module.css';

const Expenses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dummy Expenses Data
    const [expenses, setExpenses] = useState([
        { id: 1, title: 'Grocery Shopping', category: 'Food', amount: 85.50, date: '2024-03-10' },
        { id: 2, title: 'Uber Ride', category: 'Transport', amount: 24.00, date: '2024-03-09' },
        { id: 3, title: 'Netflix Subscription', category: 'Bills', amount: 15.99, date: '2024-03-08' },
        { id: 4, title: 'New Sneakers', category: 'Shopping', amount: 120.00, date: '2024-03-05' },
        { id: 5, title: 'Rent Payment', category: 'Rent', amount: 1200.00, date: '2024-03-01' },
        { id: 6, title: 'Coffee Run', category: 'Food', amount: 5.50, date: '2024-03-11' },
    ]);

    const handleAddExpense = (newExpense) => {
        // Determine the next ID (simple logic for now)
        const nextId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
        const expenseWithId = { ...newExpense, id: nextId };
        setExpenses([expenseWithId, ...expenses]);
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    }

    // Category Badge Colors
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Food': return { bg: '#dcfce7', text: '#15803d' };     // Green
            case 'Transport': return { bg: '#e0f2fe', text: '#0369a1' }; // Blue
            case 'Bills': return { bg: '#fef9c3', text: '#a16207' };     // Yellow
            case 'Shopping': return { bg: '#fce7f3', text: '#db2777' };  // Pink
            case 'Rent': return { bg: '#ffedd5', text: '#c2410c' };      // Orange
            default: return { bg: '#f1f5f9', text: '#475569' };         // Grey
        }
    };

    return (
        <div className={classes.expensesContainer}>
            {/* Header Actions */}
            <div className={classes.actionsBar}>
                <div className={classes.searchWrapper}>
                    <FaSearch className={classes.searchIcon} />
                    <input type="text" placeholder="Search expenses..." className={classes.searchInput} />
                </div>

                <div className={classes.rightActions}>
                    <button className={classes.filterBtn}>
                        <FaFilter /> Filter
                    </button>
                    <button className={classes.addBtn} onClick={() => setIsModalOpen(true)}>
                        <FaPlus /> Add Expense
                    </button>
                </div>
            </div>

            {/* Expenses Table */}
            <div className={classes.tableCard}>
                <table className={classes.expensesTable}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th className={classes.textRight}>Amount</th>
                            <th className={classes.textCenter}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => {
                            const badgeStyle = getCategoryColor(expense.category);
                            return (
                                <tr key={expense.id}>
                                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                                    <td className={classes.fw500}>{expense.title}</td>
                                    <td>
                                        <span
                                            className={classes.categoryBadge}
                                            style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.text }}
                                        >
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className={`${classes.textRight} ${classes.amount}`}>
                                        ${expense.amount.toFixed(2)}
                                    </td>
                                    <td className={classes.textCenter}>
                                        <div className={classes.actionButtons}>
                                            <button className={classes.iconBtn} title="Edit"><FaEdit /></button>
                                            <button
                                                className={`${classes.iconBtn} ${classes.deleteBtn}`}
                                                title="Delete"
                                                onClick={() => handleDelete(expense.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <AddExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddExpense}
            />
        </div>
    );
};

export default Expenses;
