import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import LoadApp from '../../loader.js'; // Adjust the path as needed

const LineChart = () => {
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [tempPoints, setTempPoints] = useState([]);
  const [tempX, setTempX] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  const [currentDataset, setCurrentDataset] = useState(0); // Track the current dataset

  useEffect(() => {
    if (loadedData.length > 0) {
      const data1 = loadedData[currentDataset]; // Ensure the correct dataset is fetched

      const newLabels = data1.map((item) => item.date);
      const newData = data1.map((item) => {
        if (item.value && typeof item.value === 'string') {
          const parsedValue = parseFloat(item.value.replace(/[\$,]/g, '')); // Parse value correctly
          return parsedValue * 1; // Fix the scale issue
        }
        return 0; // Default value or handle appropriately
      });

      setXAxisLabels(newLabels);
      setDataPoints(newData);
      setTempX(newLabels);
      setTempPoints(newData);
    }
  }, [loadedData, currentDataset]);

  // Calculate the difference between the first two data points
  const difference = dataPoints.length > 1 ? (dataPoints[0] - dataPoints[1]).toFixed(2) : "0.00";
  // Define the style based on the difference
  const titleStyle = {
    color: difference > 0 ? 'green' : 'red',
  };

  const duration = (spread) => {
    if (xAxisLabels.length < spread) {
      spread = xAxisLabels.length;
    }
    setTempX(xAxisLabels.slice(0, spread));
    setTempPoints(dataPoints.slice(0, spread));
  };

  // Calculate the y-axis range
  const yMin = Math.min(...dataPoints) * 0.9;
  const yMax = Math.max(...dataPoints) * 1.1;

  // Use useMemo for optimized chart data
  const chartData = useMemo(
    () => ({
      labels: tempX,
      datasets: [
        {
          label: 'Stock Prices',
          data: tempPoints,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    }),
    [tempX, tempPoints]
  );

  // Define the chart options
  const chartOptions = {
    scales: {
      y: {
        min: yMin,
        max: yMax,
        ticks: {
          callback: function (value) {
            return '$' + value.toFixed(0); // Format the y-axis labels with a dollar sign and two decimal places
          },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 10, // Limit the number of x-axis ticks for better readability
        },
      },
    },
  };

  // Handle button click to switch datasets
  const handleClick = (index, label, color) => {
    setCurrentDataset(index);
  };

  return (
    <div>
      {/* LoadApp component to load data */}
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
       <h2 style={titleStyle}>Basic Line Chart $ {difference}</h2>
      <Line data={chartData} options={chartOptions} />
      <div className="button-container">
        <button onClick={() => duration(2)}>a day</button>
        <button onClick={() => duration(5)}>week</button>
        <button onClick={() => duration(20)}>month</button>
        <button onClick={() => duration(240)}>year</button>
      </div>
    </div>
  );
};

export default LineChart;
