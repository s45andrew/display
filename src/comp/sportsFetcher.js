import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './job.css';

const SportsFetcher = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL=process.env.REACT_APP_FOOTBALL_DATA_URL;
       
        const response = await axios.get(URL);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data from S3.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : articles.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < articles.length - 1 ? prevIndex + 1 : 0));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="sports-fetcher">
      <div className='joiner'>
        <div><h1>Sports Articles  </h1>  </div>
         <div className="navigation-buttons">
          <div className='joiner'>
            <button className='b1' onClick={handlePrevious}>⬆️ Previous</button>
            <button onClick={handleNext}>⬇️ Next</button>
          </div>
          </div>
    </div>
      {articles.length > 0 && (
        <div>
          <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{articles[currentIndex].title}</h2>
            <p>{articles[currentIndex].details}</p>
          </div>
         
        </div>
      )}
    </div>
  );
};

export default SportsFetcher;
