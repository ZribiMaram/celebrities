// src/pages/ResultsDashboard.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ResultsDashboard = ({ ethics, privacy, safety }) => {
    // Data for the bar chart
    const barData = {
        labels: ['Ethics', 'Privacy', 'Safety'],
        datasets: [
            {
                label: 'Impact Score',
                data: [ethics, privacy, safety],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };

    // Data for the pie chart
    const pieData = {
        labels: ['Ethics', 'Privacy', 'Safety'],
        datasets: [
            {
                data: [ethics, privacy, safety],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <h1>Your AI Ethical Impact Summary</h1>

            <div className="chart-container">
                <h3>Impact Score by Category</h3>
                <Bar data={barData} />

                <h3>Impact Distribution</h3>
                <Pie data={pieData} />
            </div>

            <div className="summary">
                <h3>Summary of Your Decisions</h3>
                <p><strong>Ethics Score:</strong> {ethics} - Reflects your focus on fairness and transparency.</p>
                <p><strong>Privacy Score:</strong> {privacy} - Indicates your sensitivity to user data privacy.</p>
                <p><strong>Safety Score:</strong> {safety} - Shows your prioritization of safety and security.</p>
            </div>
        </div>
    );
};

export default ResultsDashboard;
