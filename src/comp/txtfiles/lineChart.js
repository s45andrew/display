import React, { useState,useContext, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import LoadApp from '../../loader.js'; // Adjust the path as needed
import './buttons.css';
import { GlobalStateContext } from './GlobalStateContext';

const LineChart = () => {
  const { selectedCompany, setSelectedCompany } = useContext(GlobalStateContext);
    
  const [activeButton, setActiveButton] = useState(20);
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

      const newLabels = data1.map((item) => {
        const [month, day, year] = item.date.split(' ');
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;
        const formattedMonth = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
        return year ? `${formattedMonth}/${day.replace(',', '')}/${year}` : `${formattedMonth}/${day.replace(',', '')}`;
      });

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
      setActiveButton(20);
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
    setActiveButton(spread);
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
  const yMin = Math.min(...tempPoints) * 0.92;
  const yMax = Math.max(...tempPoints) * 1.08;

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
    
    setCurrentDataset(index);
    setSelectedCompany(label);
    setStName(label);
    setLineColor(color); // Update the line color
  };

  return (
    <div>
      {/* LoadApp component to load data */}
      <LoadApp onDataLoaded={setLoadedData} />
      <div className="row">
        <button className="button-54 amazon" onClick={() => handleClick(7, 'Amazon', 'rgb(153, 236, 255)')}>Amazon</button>
        <button className="button-54 AMD" onClick={() => handleClick(8, 'AMD', 'rgb(244, 68, 9)')}> AMD </button>
        <button className="button-54 netflix" onClick={() => handleClick(9, 'NetFlix', 'rgb(43, 29, 245)')}>NetFlix</button>
        <button className="button-54 xeonn" onClick={() => handleClick(10, 'Exxon', 'rgb(26, 20, 0)')}>Exxon</button>
        <button className="button-54 ftse" onClick={() => handleClick(0, 'FTSE', 'rgba(255,153,153,1)')}>FTSE</button>
        <button className="button-54 tesla" onClick={() => handleClick(1, 'Tesla', 'rgb(3, 25, 48)')}>Tesla</button>
      </div>
      <div className="row">
        <button className="button-54 chipotle" onClick={() => handleClick(2, 'Chipotle', 'rgb(245, 137, 29)')}>Chipotle</button>
        <button className="button-54 bitcoin" onClick={() => handleClick(3, 'Bitcoin', 'rgba(255,204,255,1)')}>Bitcoin</button>
        <button className="button-54 apple" onClick={() => handleClick(4, 'Apple', 'rgba(204,255,153,1)')}>Apple</button>
        <button className="button-54 microsoft" onClick={() => handleClick(5, 'Microsoft', 'rgb(117, 12, 68)')}>Microsoft</button>
        <button className="button-54 nvidia" onClick={() => handleClick(6, 'Nvidia', 'rgba(204,204,204,1)')}>Nvidia</button>
      </div>
      <h3>{stName} {price} . . </h3>
      <div className='chartspliter'>
    <div className='left-column'>
        <span style={titleStyle}>${difference}</span>
    </div>  
    <div className='right-column'>
        <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
        </div>
        <div className="button-container">Range : 
        <button className={`butt ${activeButton === 2 ? 'active' : ''}`} onClick={() => duration(2)}>a day</button>
        <button className={`butt ${activeButton === 5 ? 'active' : ''}`} onClick={() => duration(5)}>week</button>
        <button className={`butt ${activeButton === 20 ? 'active' : ''}`} onClick={() => duration(20)}>month</button>
        <button className={`butt ${activeButton === 240 ? 'active' : ''}`} onClick={() => duration(240)}>year</button>
        <button className={`butt ${activeButton === 1000 ? 'active' : ''}`} onClick={() => duration(1000)}>Max</button>
      </div>
    </div>
</div>

     
    </div>
  );
};

export default LineChart;
