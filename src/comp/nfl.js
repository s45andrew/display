import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nfl.css';

const NFL = () => {
  const s3Url =  process.env.REACT_APP_NFL_DATA_URL;       
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  async function fetchData() {
    try {
      const response = await axios.get(s3Url);
      if (response.data && Array.isArray(response.data)) {
        setArticles(response.data); // Set the articles array
      } else {
        throw new Error('Parsed data is not an array or is empty');
      }
    } catch (error) {
      console.error('Error fetching data from S3:', error);
      setError('Failed to fetch data from S3.');
    }
  }

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='football'>
      <h1>NFL Latest</h1>
      {error ? (
        <h3>{error}</h3>
      ) : (
        articles.map((article, index) => (
          <div key={index} className='white'>
            <h3>
              <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
            </h3>
          </div>
        ))
      )}
    </div>
  );
};

export default NFL;
