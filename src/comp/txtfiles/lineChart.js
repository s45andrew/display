import React, { useState, useContext, useEffect, useMemo, use } from 'react';
import { Line } from 'react-chartjs-2';

import LoadApp from '../../loader.js'; // Adjust the path as needed
import './buttons.css';
import { GlobalStateContext } from './GlobalStateContext';

const LineChart = () => {
  const { selectedCompany, setSelectedCompany } = useContext(GlobalStateContext);
    
  const [activeButton, setActiveButton] = useState(20);
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const [stName, setStName] = useState('Tesla');
  const [dataPoints, setDataPoints] = useState([]);
  const [tempPoints, setTempPoints] = useState([]);
  const [tempX, setTempX] = useState([]);
  const [loadedData, setLoadedData] = useState([]);
  const [currentDataset, setCurrentDataset] = useState(1); // Track the current dataset
  const [lineColor, setLineColor] = useState('rgba(75,192,192,1)'); // Default color
  const defaultSpread = 20; // Default duration for a month
  const [currencySymbol, setCurrencySymbol] = useState('$'); // Default to US currency
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const [average,setAverage]=useState(0); const [above,setAbove]=useState(0);const [below,setBelow]=useState(0);
  const [month,setMonth]=useState('month')
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
        // Check for "price" first (new datasets)
        if (item.price && typeof item.price === 'number') {
          return item.price;
        }
        // Choose the currency symbol based on location
      
        // Fallback to "value" (old datasets)
        if (item.value && typeof item.value === 'string') {
          const parsedValue = parseFloat(item.value.replace(/[\$,]/g, '')); // Parse the value
          if (!isNaN(parsedValue)) {
            return parsedValue; // Ensure the parsed value is valid
          }
        }
        // Default to 0 if neither field exists or is valid
        return 0;
      });
      
     
     /* const newData = data1.map((item) => {
        if (item.value && typeof item.value === 'string') {
          const parsedValue = parseFloat(item.value.replace(/[\$,]/g, '')); // Parse value correctly
          return parsedValue * 1; // Fix the scale issue
        }
        return 0; // Default value or handle appropriately
      });
      */

      setXAxisLabels(newLabels);
      setDataPoints(newData);

      // Initialize with default range
      setTempX(newLabels.slice(-defaultSpread));
      setTempPoints(newData.slice(-defaultSpread));
      setActiveButton(20);analysis(1);
    }
  }, [loadedData, currentDataset]);

  // Calculate the difference between the first two data points
  const price = dataPoints.length > 1 ? (dataPoints[dataPoints.length - 1]).toFixed(2) : "0.00";
  const difference = dataPoints.length > 1 ? (dataPoints[dataPoints.length - 1] - dataPoints[dataPoints.length - 2]).toFixed(2) : "0.00";
  const dayDifference = dataPoints.length > 1 
  ? (dataPoints[dataPoints.length - 1] - dataPoints[dataPoints.length - 2]).toFixed(2) 
  : "0.00";

const weekDifference = dataPoints.length > 5 
  ? (dataPoints[dataPoints.length - 1] - dataPoints[dataPoints.length - 6]).toFixed(2) 
  : "0.00";

const monthDifference = dataPoints.length > 20 
  ? (dataPoints[dataPoints.length - 1] - dataPoints[dataPoints.length - 21]).toFixed(2) 
  : "0.00";

  const yearDifference = dataPoints.length > 0 
  ? (dataPoints[dataPoints.length - 1] - dataPoints[0]).toFixed(2) 
  : "0.00";

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
  console.log('Loaded Data:', loadedData);
  console.log('Current Dataset Data:', loadedData[currentDataset]);
  
  // Use useMemo for optimized chart data
  const chartData = useMemo(
    () => ({
      
      labels: tempX,
      datasets: [
        {
          label: `${stName} Stock Prices`,
          data: tempPoints,
          fill: false,
          backgroundColor: 'rgba(9, 29, 29, 0.2)',
          borderColor: lineColor, // Use the current line color
          tension: 0.1,
        },
      ],
    }),
    [tempX, tempPoints, lineColor]
  );

  // Define the chart options
  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
      title: {
        display: true, // Enable the title
        text: `${stName} Stock Prices`,
        padding: {
          top: 0, // Remove padding at the top of the title
          bottom: 0, // Optional: Adjust bottom padding
        },
      },
    },
    scales: {
      y: {
        min: yMin,
        max: yMax,
        ticks: {
          callback: function (value) {
            return currencySymbol + value.toFixed(0); // Format values dynamically
          },
        },
      },
      x: {
        ticks: {
          maxTicksLimit: 10,
          display: false, // Hide x-axis ticks
        },
      },
    },
  };
  

  // Handle button click to switch datasets and update line color
  const handleClick = (event, index, label, color) => {
    if (index === 0 || index === 11 || index === 12 || index === 13 || index === 14 || index === 15 || index === 16) {
      setCurrencySymbol('£'); // Use GBP for these indices
    } else {
      setCurrencySymbol('$'); // Use USD for other indices
    }
  
    setCurrentDataset(index); // Keep setting the dataset index
    setSelectedCompany(label); // Pass the company name instead of the index
    setStName(label); // Update the company name
    setLineColor(color); // Update the line color
    activateButton(event.target);
  };
  
  const  hidestock = () => {
    if(isVisible){  setIsVisible(false); }
    else {setIsVisible(true); }// Hide the stockpicker div
  };
  const analysis = (num) => {
    const aver = tempPoints.reduce((sum, value) => sum + value, 0) / tempPoints.length;
    setAverage(aver);
    const aboveAverageCount = tempPoints.filter((value) => value > aver).length;
    const belowAverageCount = tempPoints.filter((value) => value < aver).length;
    setBelow(belowAverageCount); setAbove(aboveAverageCount)
    if (num === 1) {      setMonth("month");
    } else if (num === 3) {      setMonth("last 3 months");     } else if (num === 6) {      setMonth("last 6 months");   } else if (num === 12){      setMonth("past year");     }
  };
  function activateButton(button) {
    // Remove 'active' class from all buttons
    var buttons = document.querySelectorAll('.button-54');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });

     // Add 'active' class to the clicked button
    button.classList.add('active');
  }
  const dayStyle = { color: parseFloat(dayDifference) > 0 ? 'green' : 'red' };
  const weekStyle = { color: parseFloat(weekDifference) > 0 ? 'green' : 'red' };
  const monthStyle = { color: parseFloat(monthDifference) > 0 ? 'green' : 'red' };
  const yearStyle = { color: parseFloat(yearDifference) > 0 ? 'green' : 'red' };
  
  return (
    <div className='bbody'>

      {/* LoadApp component to load data */}
      <LoadApp onDataLoaded={setLoadedData} />
 

      {isVisible ? ( 
    <div className="flex-containerC">
   
    <div className="rows-containerC">
    <div><h3 className='stockpickertitle'> {stName}  {currencySymbol} {price}     Analysis</h3></div>
    
     <div className="rowC">
      <div className="row">
      
      <button className="button-54 tesco" onClick={(event) => handleClick(event, 15, 'tesco', 'rgb(34, 43, 165)')}>Tesco</button>
      <button className="button-54 Shell" onClick={(event) => handleClick(event, 16, 'Shell', 'rgb(244, 255, 88)')}> Shell </button>
      <button className="button-54 GlenCore" onClick={(event) => handleClick(event, 13, 'GlenCore', 'rgb(43, 29, 245)')}>GlenCore</button>
      <button className="button-54 EasyJet" onClick={(event) => handleClick(event, 12, 'EasyJet', 'rgb(250, 203, 17)')}>EasyJet</button>
      <button className="button-54 AstrZenica" onClick={(event) => handleClick(event,11, 'AstraZeneca', 'rgba(255,153,153,1)')}>AstraZeneca</button>
</div>
   </div>
      <div className="rowC">
      <div className="row">
        <button className="button-54 amazon" onClick={(event) => handleClick(event, 7, 'Amazon', 'rgb(153, 236, 255)')}>Amazon</button>
        <button className="button-54 AMD" onClick={(event) => handleClick(event, 8, 'AMD', 'rgb(244, 68, 9)')}> AMD </button>
        <button className="button-54 netflix" onClick={(event) => handleClick(event, 9, 'NetFlix', 'rgb(43, 29, 245)')}>NetFlix</button>
        <button className="button-54 xeonn" onClick={(event) => handleClick(event, 10, 'Exxon', 'rgb(247, 192, 9)')}>Exxon</button>
        <button className="button-54 tesla" onClick={(event) => handleClick(event, 1, 'Tesla', 'rgb(253, 19, 222)')}>Tesla</button>
      </div>
</div>
      <div className="rowC">
      <div className="row">
      <button className="button-54 Rolls-Royce" onClick={(event) => handleClick(event, 14, 'rolls-royce','silver')}>Rolls Royce</button>
        <button className="button-54 chipotle" onClick={(event) => handleClick(event, 2, 'cmg', 'rgb(245, 137, 29)')}>Chipotle</button>
      <button className="button-54 apple" onClick={(event) => handleClick(event, 4, 'Apple', 'rgba(204,255,153,1)')}>Apple</button>
        <button className="button-54 microsoft" onClick={(event) => handleClick(event, 5, 'Microsoft', 'rgb(117, 12, 68)')}>Microsoft</button>
        <button className="button-54 nvidia" onClick={(event) => handleClick(event, 6, 'Nvidia', 'rgba(204,204,204,1)')}>Nvidia</button>
        </div>
   </div>
    </div>
    <div className="close-column"><button className="closebutton"onClick={hidestock}>
     <br />C<br />L<br />O<br />S<br />E </button>
    </div>
  </div>
   ) : ( // Display another div when stock picker is hidden
    <div className="another-div">
    
      <div className="button-container">   <h3>{stName}  {currencySymbol} {price} . . </h3>
    

        <button className={`sroun-button ${activeButton === 20 ? 'active' : ''}`} onClick={() => {duration(20);analysis(1);}}>1</button>
        <button className={`sroun-button ${activeButton === 63 ? 'active' : ''}`} onClick={() => {duration(63);analysis(3);}}>3</button>
        <button className={`sroun-button ${activeButton === 125 ? 'active' : ''}`} onClick={() => {duration(125);analysis(6);}}>6</button>
        <button className={`sroun-button ${activeButton === 250 ? 'active' : ''}`} onClick={() => {duration(250);analysis(12);}}>12</button>
      </div>  
      <p>   
      <h4>{stName}  {currencySymbol} {price} the average price {currencySymbol} {average.toFixed(2)} over {month}</h4>
       days below average {below} and over {above} days</p>
      <p>Welcome to the alternate view!<button className="returnbutton" onClick={hidestock}>
        RETURN
      </button></p> 
      
    </div>
  )}

     
     <div className='chartspliter'>
     <br />
      <div className='left-column'>
  <div>
  <br />
    <h4 className='shadow'>day:</h4>
    <span style={dayStyle}>{currencySymbol} {dayDifference}</span>
  </div>
  <div>
    <h4 className='shadow'>week:</h4>
    <span style={weekStyle}>{currencySymbol} {weekDifference}</span>
  </div>
  <div>
    <h4 className='shadow'>month:</h4>
    <span style={monthStyle}>{currencySymbol} {monthDifference}</span>
  </div>
  <div>
    <h4 className='shadow'>year:</h4>
    <span style={yearStyle}>{currencySymbol} {yearDifference}</span>
  </div>
</div>
  
    <div className='right-column'>
    <br />
        <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
        </div>
        <div className="button-container">
        <button className={`roun-button ${activeButton === 2 ? 'active' : ''}`} onClick={() => duration(2)}>day</button>
        <button className={`roun-button ${activeButton === 5 ? 'active' : ''}`} onClick={() => duration(5)}>week</button>
        <button className={`roun-button ${activeButton === 20 ? 'active' : ''}`} onClick={() => duration(20)}>month</button>
        <button className={`roun-button ${activeButton === 250 ? 'active' : ''}`} onClick={() => {duration(250);analysis(12)}}>year</button>
        <button className={`roun-button ${activeButton === 1000 ? 'active' : ''}`} onClick={() => duration(1000)}>Max</button>
      </div> 
      <br /> 
    </div>
</div>

     
    </div>
  );
};

export default LineChart;
