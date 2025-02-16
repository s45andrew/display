import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Football = () => {
  const s3Url = 'https://myfrantic.s3.eu-west-2.amazonaws.com/local-football-data.json'; // S3 object URL
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : articles.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < articles.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className='football'>
      <h1>Football Stuff Page</h1>
      {error ? (
        <h3>{error}</h3>
      ) : (
        articles.length > 0 && (
          <div>
            <h3>
              <a href={articles[currentIndex].link} target="_blank" rel="noopener noreferrer">
                {articles[currentIndex].title}
              </a>
            </h3>
            <div className="navigation-buttons">
              <button onClick={handlePrevious}>&uarr; Previous</button>
              <button onClick={handleNext}>&darr; Next</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Football;
