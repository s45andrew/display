import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import LoadApp from '../../loader.js'; // Adjust the path as needed

const LineChart = () => {
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const [stName, setStName] = useState('FTSE');
  const [dataPoints, setDataPoints] = useState([]);
  const [tempPoints, setTempPoints] = useState([]);
  const [tempX, setTempX] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  const [currentDataset, setCurrentDataset] = useState(0); // Track the current dataset
  const [lineColor, setLineColor] = useState('rgba(75,192,192,1)'); // Default color
  const defaultSpread = 20; // Default duration for a month

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

      // Initialize with default range
      setTempX(newLabels.slice(-defaultSpread));
      setTempPoints(newData.slice(-defaultSpread));
    }
  }, [loadedData, currentDataset]);

  // Calculate the difference between the first two data points
  const price = dataPoints.length > 1 ? (dataPoints[dataPoints.length - 1]).toFixed(2) : "0.00";
  const difference = dataPoints.length > 1 ? (dataPoints[dataPoints.length - 1] - dataPoints[dataPoints.length - 2]).toFixed(2) : "0.00";
  // Define the style based on the difference
  const titleStyle = {
    color: parseFloat(difference) > 0 ? 'green' : 'red',
  };

  const duration = (spread) => {
    if (spread === 1000) {
      spread = xAxisLabels.length - 1;
    }
    if (xAxisLabels.length < spread) {
      spread = xAxisLabels.length - 1;
    }
    setTempX(xAxisLabels.slice(-spread));
    setTempPoints(dataPoints.slice(-spread));
  };

  // Calculate the y-axis range based on the selected period
  const yMin = Math.min(...tempPoints) * 0.9;
  const yMax = Math.max(...tempPoints) * 1.1;

  // Use useMemo for optimized chart data
  const chartData = useMemo(
    () => ({
      labels: tempX,
      datasets: [
        {
          label: `${stName} Stock Prices`,
          data: tempPoints,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: lineColor, // Use the current line color
          tension: 0.1,
        },
      ],
    }),
    [tempX, tempPoints, lineColor]
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

  // Handle button click to switch datasets and update line color
  const handleClick = (index, label, color) => {
    setStName(label);
    setCurrentDataset(index);
    setLineColor(color); // Update the line color
  };

  return (
    <div>
      {/* LoadApp component to load data */}
      <LoadApp onDataLoaded={setLoadedData} />
      <div className="button-container">
        <button className="button-54 ftse" onClick={() => handleClick(0, 'FTSE', 'rgba(255,153,153,1)')}>FTSE</button>
        <button className="button-54 tesla" onClick={() => handleClick(1, 'Tesla', 'rgba(153,204,255,1)')}>Tesla</button>
        <button className="button-54 chipotle" onClick={() => handleClick(2, 'Chipotle', 'rgba(255,204,153,1)')}>Chipotle</button>
        <button className="button-54 bitcoin" onClick={() => handleClick(3, 'Bitcoin', 'rgba(255,204,255,1)')}>Bitcoin</button>
        <button className="button-54 apple" onClick={() => handleClick(4, 'Apple', 'rgba(204,255,153,1)')}>Apple</button>
        <button className="button-54 microsoft" onClick={() => handleClick(5, 'Microsoft', 'rgba(255,255,153,1)')}>Microsoft</button>
        <button className="button-54 nvidia" onClick={() => handleClick(6, 'Nvidia', 'rgba(204,204,204,1)')}>Nvidia</button>
      </div>
      <h2>{stName} {price} . . <span style={titleStyle}>${difference}</span></h2>
      <Line data={chartData} options={chartOptions} />
      <div className="button-container">
        <button onClick={() => duration(2)}>a day</button>
        <button onClick={() => duration(5)}>week</button>
        <button onClick={() => duration(20)}>month</button>
        <button onClick={() => duration(240)}>year</button>
        <button onClick={() => duration(1000)}>Max</button>
      </div>
    </div>
  );
};

export default LineChart;
