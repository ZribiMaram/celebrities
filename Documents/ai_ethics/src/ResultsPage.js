// src/pages/ResultsPage.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useScore } from './ScoreContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import './ResultsPage.css'
import Header from './Header';

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ResultsPage = () => {
    const { scores } = useScore();

    // Data for the bar chart
    const barData = {
        labels: ['Openness to AI', 'Privacy Concern', 'Autonomy Preference'],
        datasets: [
            {
                label: 'Personality Traits',
                data: [scores.openness, scores.privacyConcern, scores.autonomy],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderWidth: 1,
            },
        ],
    };

    // Data for the pie chart
    const pieData = {
        labels: ['Openness to AI', 'Privacy Concern', 'Autonomy Preference'],
        datasets: [
            {
                label: 'Personality Traits Distribution',
                data: [scores.openness, scores.privacyConcern, scores.autonomy],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container">
            <Header/>
            <h2>Your AI Personality Profile</h2>

            <div className="chart-container">
                <h3>Bar Chart of Personality Traits</h3>
                <Bar data={barData} />

                <h3>Pie Chart of Personality Distribution</h3>
                <Pie data={pieData} />
            </div>

            <p>Here’s a breakdown of your personality traits based on your answers.</p>
        </div>
    );
};

export default ResultsPage;
