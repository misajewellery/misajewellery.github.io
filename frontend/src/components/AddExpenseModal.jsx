import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import classes from './AddExpenseModal.module.css';

const AddExpenseModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        note: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            amount: parseFloat(formData.amount)
        });
        // Reset form after save (optional, depends on UX preference)
        setFormData({
            title: '',
            amount: '',
            category: 'Food',
            date: new Date().toISOString().split('T')[0],
            note: ''
        });
    };

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.modalContent}>
                <div className={classes.modalHeader}>
                    <h2>Add New Expense</h2>
                    <button className={classes.closeBtn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className={classes.formGroup}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Grocery Shopping"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={classes.row}>
                        <div className={classes.formGroup}>
                            <label>Amount ($)</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="0.00"
                                step="0.01"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <label>Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={classes.formGroup}>
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Rent">Rent</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Health">Health</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    </div>

                    <div className={classes.formGroup}>
                        <label>Note (Optional)</label>
                        <textarea
                            name="note"
                            rows="3"
                            placeholder="Add details..."
                            value={formData.note}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className={classes.modalActions}>
                        <button type="button" className={classes.cancelBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={classes.saveBtn}>Save Expense</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;
