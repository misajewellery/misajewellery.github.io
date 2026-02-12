import { useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FaDownload, FaChartArea } from "react-icons/fa";
import classes from "./Reports.module.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Reports = () => {
    // 📊 Yearly expenses
    const monthlyData = useMemo(() => ({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Expenses",
                data: [1200, 1900, 1500, 2200, 1800, 2450, 2100, 1950, 2300, 2800, 2600, 3100],
                borderColor: "#2dd4bf",
                backgroundColor: "rgba(45,212,191,0.25)",
                tension: 0.4,
                fill: true,
            },
        ],
    }), []);

    // 📦 Category comparison
    const categoryComparisonData = useMemo(() => ({
        labels: ["Food", "Transport", "Rent", "Shopping", "Bills"],
        datasets: [
            {
                label: "Last Month",
                data: [400, 180, 1200, 300, 200],
                backgroundColor: "rgba(148,163,184,0.5)",
            },
            {
                label: "This Month",
                data: [450, 220, 1200, 450, 250],
                backgroundColor: "#2dd4bf",
            },
        ],
    }), []);

    // ⚙️ Chart styling
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: { color: "#94a3b8" },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#94a3b8" },
            },
            y: {
                grid: { color: "rgba(255,255,255,0.05)" },
                ticks: { color: "#94a3b8" },
            },
        },
    };

    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
                <div>
                    <h2>Financial Reports</h2>
                    <p>Analyze your spending habits over time.</p>
                </div>
                <button className={classes.downloadBtn}>
                    <FaDownload /> Download PDF
                </button>
            </div>

            {/* Insight Banner */}
            <div className={classes.insightBanner}>
                <div className={classes.insightIcon}>
                    <FaChartArea />
                </div>
                <div>
                    <h4>Spending Alert</h4>
                    <p>
                        You spent <strong>18% more</strong> on Food this month compared to last month.
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className={classes.chartsGrid}>
                <div className={classes.chartCard}>
                    <h3>Yearly Expense Trend</h3>
                    <div className={classes.chartWrapper}>
                        <Line data={monthlyData} options={chartOptions} />
                    </div>
                </div>

                <div className={classes.chartCard}>
                    <h3>Monthly Category Comparison</h3>
                    <div className={classes.chartWrapper}>
                        <Bar data={categoryComparisonData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
