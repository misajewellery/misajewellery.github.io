import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { FaWallet, FaArrowUp, FaArrowDown, FaPiggyBank, FaMoneyBillWave } from 'react-icons/fa';
import classes from './Dashboard.module.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    // Dummy Data for Widgets
    const stats = [
        {
            label: 'Total Monthly Spend',
            value: '$2,450',
            trend: '+12%',
            isPositive: false,
            icon: <FaWallet />,
            color: 'var(--primary)'
        },
        {
            label: 'This Week',
            value: '$540',
            trend: '-5%',
            isPositive: true,
            icon: <FaMoneyBillWave />,
            color: '#f59e0b'
        },
        {
            label: 'Highest Category',
            value: 'Rent ($1200)',
            trend: '45%',
            isPositive: false,
            icon: <FaArrowUp />,
            color: '#ef4444'
        },
        {
            label: 'Savings',
            value: '$850',
            trend: '+8%',
            isPositive: true,
            icon: <FaPiggyBank />,
            color: '#22c55e'
        },
    ];

    // Dummy Data for Charts
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Expenses',
                data: [1200, 1900, 1500, 2200, 1800, 2450],
                borderColor: '#2dd4bf',
                backgroundColor: 'rgba(45, 212, 191, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const pieChartData = {
        labels: ['Rent', 'Food', 'Transport', 'Shopping', 'Bills'],
        datasets: [
            {
                data: [1200, 450, 200, 350, 250],
                backgroundColor: [
                    '#2dd4bf', // Teal
                    '#0f766e', // Dark Teal
                    '#99f6e4', // Light Teal
                    '#f59e0b', // Amber
                    '#ef4444', // Red
                ],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#94a3b8' }
            },
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        }
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: { color: '#94a3b8' }
            },
        },
    };

    return (
        <div className={classes.dashboard}>
            {/* Stats Grid */}
            <div className={classes.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} className={classes.statCard}>
                        <div className={classes.statHeader}>
                            <div
                                className={classes.statIcon}
                                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                            >
                                {stat.icon}
                            </div>
                            <span className={`${classes.statTrend} ${stat.isPositive ? classes.trendUp : classes.trendDown}`}>
                                {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                                {stat.trend}
                            </span>
                        </div>
                        <div className={classes.statValue}>{stat.value}</div>
                        <div className={classes.statLabel}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className={classes.chartsContainer}>
                <div className={classes.chartCard}>
                    <h3>Expense Trend</h3>
                    <div className={classes.chartWrapper}>
                        <Line options={chartOptions} data={lineChartData} />
                    </div>
                </div>
                <div className={classes.chartCard}>
                    <h3>Category Breakdown</h3>
                    <div className={`${classes.chartWrapper} ${classes.pieWrapper}`}>
                        <Doughnut options={pieOptions} data={pieChartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
