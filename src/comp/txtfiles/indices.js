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
const Indices = ({ title, data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,color:'green',
        text: title, // Dynamic title
        padding: {
          top: 1, // Adjusts spacing above the title
          bottom: 0, // Optional: Adjust spacing below the title
        },
        font: {
          size: 18, // Adjust the font size of the title
          color: '#09a2ee',// Set the color of the title properly
        },
      }
    },
    layout: {
      padding: {
        left: 1, // Reduced left padding
        right: 1, // Reduced right padding
        top: 0, // Keep top padding as is
        bottom: 0, // Keep bottom padding as is
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

  // Ensure borderColor is included in the dataset
  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      borderColor: dataset.borderColor || '#09a2ee', // Default to blue if not set
      borderWidth: 1, // Default thickness
    })),
  };

  return <Line data={chartData} options={options} />;
};
export default Indices;
