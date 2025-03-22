import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Indices = ({ title }) => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [30, 50, 70, 40, 60, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title, // Dynamic title
        padding: {
          top: 1, // Adjusts spacing above the title
          bottom: 0, // Optional: Adjust spacing below the title
        },
        font: {
          size: 18, // Adjust the font size of the title (optional)
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
      y: {
        ticks: {
          display: false, // Hide y-axis labels
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Indices;
