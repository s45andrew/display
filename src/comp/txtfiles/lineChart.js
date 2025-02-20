import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import LoadApp from '../../loader.js'; // Adjust the path as needed

const LineChart = () => {
  const [loadedData, setLoadedData] = useState([]);
  const [stockN, setStockN] = useState('Tesla');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Dataset 1',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  const calculateYAxisRange = (data) => {
    const values = data.map(item => {
      const value = typeof item.value === 'string' ? parseFloat(item.value.replace(/[^0-9.-]+/g, '')) : item.value;
      return value;
    });
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const lowerBound = minValue - 0.05 * minValue;
    const upperBound = maxValue + 0.05 * maxValue;
    return { min: lowerBound, max: upperBound };
  };

  const handleClick = (datasetIndex, stockName, color) => {
    if (loadedData[datasetIndex]) {
      const selectedData = loadedData[datasetIndex];
      const yAxisRange = calculateYAxisRange(selectedData);
      const newData = {
        labels: selectedData.map(item => item.date),
        datasets: [
          {
            label: `${stockName} Prices`,
            data: selectedData.map(item => {
              const value = typeof item.value === 'string' ? parseFloat(item.value.replace(/[^0-9.-]+/g, '')) : item.value;
              return value;
            }),
            fill: false,
            backgroundColor: color,
            borderColor: color,
          },
        ],
      };
      setData(newData);
      setStockN(stockName);

      // Update options with new y-axis range
      setOptions({
        scales: {
          y: {
            beginAtZero: false,
            min: yAxisRange.min,
            max: yAxisRange.max,
            ticks: {
              callback: function(value) {
                return '$' + value.toFixed(0); // Format the y-axis labels with a dollar sign and two decimal places
              }
            }
          },
          x: {
            ticks: {
              maxTicksLimit: 10 // Limit the number of x-axis ticks for better readability
            }
          }
        }
      });
    }
  };

  const [options, setOptions] = useState({
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2); // Format the y-axis labels with a dollar sign and two decimal places
          }
        }
      },
      x: {
        ticks: {
          maxTicksLimit: 10 // Limit the number of x-axis ticks for better readability
        }
      }
    }
  });

  return (
    <div>
      <LoadApp onDataLoaded={setLoadedData} />
      <div className="button-container">
        <button className="button-54 ftse" onClick={() => handleClick(0, 'FTSE', '#ff9999')}>FTSE</button>
        <button className="button-54 tesla" onClick={() => handleClick(6, 'Tesla', '#99ccff')}>Tesla</button>
        <button className="button-54 chipotle" onClick={() => handleClick(4, 'Chipotle', '#ffcc99')}>Chipotle</button>
        <button className="button-54 bitcoin" onClick={() => handleClick(3, 'Bitcoin', '#ffccff')}>Bitcoin</button>
        <button className="button-54 apple" onClick={() => handleClick(1, 'Apple', '#ccff99')}>Apple</button>
        <button className="button-54 microsoft" onClick={() => handleClick(2, 'Microsoft', '#ffff99')}>Microsoft</button>
        <button className="button-54 nvidia" onClick={() => handleClick(5, 'Nvidia', '#cccccc')}>Nvidia</button>
      </div>
      <h2>{stockN} Stock Details</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
