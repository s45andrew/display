import React, { useState, useEffect } from 'react';
import './styles/weather1.css'; // Import your CSS for styling

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  // Mapping descriptions to images
  const weatherIcons = {
    "Sunny": "sunny.png",
    "Drizzle":"lcloud.png",
    "Light Drizzle":"lcloud.png",
    "Sunny Intervals": "sunC.png",
    "Light Cloud": "lightcloud.png",
    "Light Rain": "sunRain.png",
    "Heavy Rain": "torrential.png",
    "Clear Night": "clearN.png",
    "Partlu Cloudy": "CCC.png",
    "Light Rain Showers": "l_rain_showers.png"
    // Add more mappings as needed
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/2636790');
        const text = await response.text(); // Fetch the RSS feed as text

        // Parse the RSS feed
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');

        // Extract weather items
        const items = Array.from(xmlDoc.getElementsByTagName('item')).map((item) => ({
          title: item.getElementsByTagName('title')[0].textContent,
          description: item.getElementsByTagName('description')[0].textContent,
          link: item.getElementsByTagName('link')[0].textContent
        }));

        console.log('Parsed Weather Data:', items); // Log the parsed data for debugging
        setWeatherData(items); // Set the weather data
      } catch (err) {
        console.error('Error fetching weather data:', err.message);
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="weather-app">
      <br />
     {/* <h1 className="page-title">3-Day Weather Forecast</h1> */}
      {error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="weather-cards-container">
          {weatherData.map((item, index) => {
            const titleParts = item.title.split(':'); // Split the title into parts
            const weatherDescription = titleParts[1]?.split(',')[0].trim(); // Extract weather description
            const weatherIcon = weatherIcons[weatherDescription] || "default.png"; // Match image or fallback to default

            return (
              <div key={index} className="weather-card">
                <h2>{titleParts[0] || 'No Day Found'}</h2> {/* Extract and display the day */}
                <div className="weatherImg">
                  <img src={`/${weatherIcon}`} alt={weatherDescription} /> {/* Dynamically set the image */}
                </div>
                <h3>{weatherDescription || 'No Description Found'}</h3> {/* Extract and display weather description */}
                <h4 className='h4B'>
                  {titleParts[2]?.split(' ')[1] || 'No Min Temp Found'} - {titleParts[3]?.split(' ')[1] || ''}
                </h4> {/* Display temperature range */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

