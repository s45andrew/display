import React, { useState, useEffect } from 'react';
import './styles/weather1.css';

const Forecaster = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/weather.json'); // Fetch the local JSON file
        const data = await response.json(); // Parse the JSON file
        console.log('Fetched Weather Data:', data); // Log fetched data for debugging
        setWeatherData(data.channel.items); // Extract and set the items array
      } catch (err) {
        console.error('Error fetching weather data:', err.message);
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="weather-app">
      <h1 className="page-title">3-Day Weather Forecast</h1>
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        
        <div className="weather-cards-container">
          {weatherData.map((item, index) => (
            <div key={index} className="weather-card">
                <h2>{item.title.split(':')[0]}</h2> {/* Extracting and displaying the day */}
               <div className='weatherImg'></div>
               <h3>{item.title.split(':')[1]}</h3>
              <p>{item.description}</p>
             
            </div>
          ))}
        </div>
        
      )}
    </div>
  );
};

export default Forecaster;
