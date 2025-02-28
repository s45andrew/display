import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './job.css';


const SportsFetcher = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = process.env.REACT_APP_FOOTBALL_DATA_URL;
        const response = await axios.get(URL);
        if (response.data && Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          throw new Error('Parsed data is not an array or is empty');
        }
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
    return <p>{error}</p>;
  }

  return (
    <div className="sports-fetcher">
      <div className='joiner'>
        <div><h1>Sports Articles</h1></div>
        
      </div>
      {articles.length > 0 && (
        <div>
          <div className="articles-container">
            {articles.map((item, index) => (
              <div key={index} className="article" style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
                <h2>{item.title}</h2>
                <p>
                  {expandedIndexes[index] ? item.details : item.details.substring(0, 100) + '...'}
                  <button clsssName='toggleReadMore'onClick={() => toggleReadMore(index)}>
                    {expandedIndexes[index] ? 'Read less' : 'Read more'}
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsFetcher;
