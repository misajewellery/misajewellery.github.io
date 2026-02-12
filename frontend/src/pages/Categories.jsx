import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import classes from './Categories.module.css';

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Food', color: '#15803d', bg: '#dcfce7' },
        { id: 2, name: 'Transport', color: '#0369a1', bg: '#e0f2fe' },
        { id: 3, name: 'Rent', color: '#c2410c', bg: '#ffedd5' },
        { id: 4, name: 'Shopping', color: '#db2777', bg: '#fce7f3' },
        { id: 5, name: 'Bills', color: '#a16207', bg: '#fef9c3' },
    ]);

    const [newCategory, setNewCategory] = useState({ name: '', color: '#000000' });

    const handleAdd = (e) => {
        e.preventDefault();
        if (newCategory.name) {
            setCategories([...categories, { ...newCategory, id: Date.now(), bg: '#f1f5f9' }]);
            setNewCategory({ name: '', color: '#000000' });
        }
    };

    const handleDelete = (id) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    return (
        <div className={classes.container}>
            <div className={classes.grid}>
                {/* List Card */}
                <div className={classes.card}>
                    <div className={classes.header}>
                        <h2>My Categories</h2>
                        <p>Manage your expense labels</p>
                    </div>
                    <div className={classes.list}>
                        {categories.map((cat) => (
                            <div key={cat.id} className={classes.item}>
                                <span
                                    className={classes.badge}
                                    style={{ backgroundColor: cat.bg, color: cat.color }}
                                >
                                    {cat.name}
                                </span>
                                <div className={classes.actions}>
                                    <button className={classes.iconBtn}><FaEdit /></button>
                                    <button
                                        className={`${classes.iconBtn} ${classes.deleteBtn}`}
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add New Card */}
                <div className={classes.card}>
                    <div className={classes.header}>
                        <h2>Add New</h2>
                        <p>Create a custom category</p>
                    </div>
                    <form onSubmit={handleAdd} className={classes.form}>
                        <div className={classes.formGroup}>
                            <label>Category Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Gym"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Color Code</label>
                            <div className={classes.colorInputWrapper}>
                                <input
                                    type="color"
                                    value={newCategory.color}
                                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                                />
                                <span>{newCategory.color}</span>
                            </div>
                        </div>
                        <button type="submit" className={classes.submitBtn}>
                            <FaPlus /> Create Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Categories;
