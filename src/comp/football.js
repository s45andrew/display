import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './buttons.css';

const Football = () => {
  const s3Url = process.env.REACT_APP_FOOTBALL_DATA_URL;
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});
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

  const toggleReadMore = (index) => {
    setExpandedIndexes((prevIndexes) => ({
      ...prevIndexes,
      [index]: !prevIndexes[index],
    }));
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
           
            <div className="articles-container">
              {articles.map((item, index) => (
                <div key={index} className="article" style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
                  <h2>{item.title}</h2>
                  <p>
                    {expandedIndexes[index] ? item.content : item.content.substring(0, 100) + '...'}
                    <button className='toggleReadMore' onClick={() => toggleReadMore(index)}>
                      {expandedIndexes[index] ? 'Read less' : 'Read more'}
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Football;
