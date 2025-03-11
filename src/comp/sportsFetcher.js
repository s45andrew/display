import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './job.css';

const SportsFetcher = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = process.env.REACT_APP_FOOTBALL_DATA_URL; // URL from environment variable
        const response = await axios.get(URL);
        if (response.data && Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          throw new Error('Parsed data is not an array or is empty');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false); // Ensure loading state is updated even if fetch fails
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

  const toggleReadMore = (index) => {
    setExpandedIndexes((prevIndexes) => ({
      ...prevIndexes,
      [index]: !prevIndexes[index],
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="sports-fetcher">
      <div className="joiner">
        <h1>Special News</h1>
      </div>
      {articles.length > 0 ? (
        <div>
          <div className="articles-container">
            {articles.map((item, index) => (
              <div
                key={index}
                className="article"
                style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}
              >
                <h2>{item.title}</h2>
                <p>
                  {item.details
                    ? expandedIndexes[index]
                      ? item.details
                      : item.details.substring(0, 100) + '...'
                    : 'No details available'}{' '}
                  {/* Safeguard for undefined or null details */}
                  <button className="toggleReadMore" onClick={() => toggleReadMore(index)}>
                    {expandedIndexes[index] ? 'Read less' : 'Read more'}
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default SportsFetcher;
