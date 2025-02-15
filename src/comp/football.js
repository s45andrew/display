import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Football = () => {
  const s3Url = 'https://myfrantic.s3.eu-west-2.amazonaws.com/local-football-data.json'; // S3 object URL
  const [message, setMessage] = useState('');

  async function fetchData() {
    try {
      const response = await axios.get(s3Url);
      if (response.data && Array.isArray(response.data)) {
        // Assuming we want to display the first article's title as the message
        const firstArticle = response.data[0];
        setMessage(firstArticle.title); // Use the correct key for the article title
      } else {
        throw new Error('Parsed data is not an array or is empty');
      }
    } catch (error) {
      console.error('Error fetching data from S3:', error);
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
