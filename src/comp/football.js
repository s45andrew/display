// src/components/Football.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const Football = () => {
  const apiUrl = 'https://8sjips7i31.execute-api.eu-west-2.amazonaws.com/dev/hello';
  const [message, setMessage] = useState('');

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('HTTP error!');
      }
      const data = await response.json();
      const parsedMessage = JSON.parse(data.body);
      setMessage(parsedMessage);
      console.log(parsedMessage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='football'>
      <h1>Football Stuff Page</h1>
      <h3>{message}</h3>
    </div>
  );
};

export default Football;
