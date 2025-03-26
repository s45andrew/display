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

const Indices = ({ title, data, customText }) => {
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
          top: 1,
          bottom: 0,
        },
        font: {
          size: 18,
        },
        color: 'green', // Set the title color properly
      },
    },
    layout: {
      padding: {
        left: 1,
        right: 1,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
      },
    },
  };

  const chartPlugins = [
    {
      id: 'customTextPlugin',
      beforeDraw: (chart) => {
        const { ctx } = chart;
        ctx.save();
  
        if (customText) {
          const numericValue = parseFloat(customText); // Ensure it's a number
          const isPositive = numericValue > 0; // Check if the value is positive
          const arrowSymbol = isPositive ? '↑' : '↓'; // Arrow based on positivity
          const arrowColor = isPositive ? 'green' : 'red'; // Color based on positivity
  
          // Styling
          ctx.font = '16px Arial';
          ctx.fillStyle = arrowColor; // Use the arrow color
          ctx.textAlign = 'center';
  
          // Prepare text with arrow
          const displayText = `${arrowSymbol} ${Math.abs(numericValue)}`; // Display value with absolute for clarity
  
          // Positioning
          const centerX = chart.width / 4;
          const centerY = chart.height / 2 + 50; // Below the chart center
          ctx.fillText(displayText, centerX, centerY); // Render the text with arrow
        }
  
        ctx.restore();
      },
    },
  ];
  
  
  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      borderColor: dataset.borderColor || '#09a2ee',
      borderWidth: 1,
    })),
  };

  return <Line data={chartData} options={options} plugins={chartPlugins} />;
};

export default Indices;
