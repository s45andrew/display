import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './articles.css';
import './txtfiles/buttons.css';
import NFL from './nfl';

const SportsFetcher = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const nflRef = useRef(null); // Create a ref for the NFL component
  const nflfootball = useRef(null); // Create a ref for the NFL component

  const scrollToNFL = () => {
    nflRef.current?.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the NFL component
  };
  const scrollToFootball = () => {
    nflfootball.current?.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the NFL component
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = process.env.REACT_APP_FOOTBALL_DATA_URL; // URL from environment variable
        const response = await axios.get(URL);

        console.log('Fetched Articles:', response.data);

        if (response.data && Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          throw new Error('Parsed data is not an array or is empty');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleReadMore = (index) => {
    setExpandedIndexes((prevIndexes) => ({
      ...prevIndexes,
      [index]: !prevIndexes[index],
    }));
  };

  const handleImageError = (event) => {
    event.target.src = 'football.jpeg';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div ref={nflfootball} className="football-listings" style={{ padding: '20px' }}>
      <div className="joiner">
        <div>
          <span>
            <button className="img-button" onClick={scrollToNFL}>
              <img className="imgufl" src="helmet/nfl.png" alt="NFL" />
            </button>
            <h1>Latest Stories</h1>
          </span>
        </div>
      </div>

      {articles.length > 0 ? (
        <div className="articles-container">
          {articles.map((item, index) => (
            <div
              key={index}
              className="article"
              style={{
                margin: '20px 0',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2 style={{ width: '100%' }}>{item.title}</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                {item.imageUrl && (
                  <div style={{ flex: '1', maxWidth: '30%' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      onError={handleImageError}
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        maxHeight: '150px',
                      }}
                    />
                  </div>
                )}
                <div style={{ flex: '2' }}>
                  <p>
                    {expandedIndexes[index]
                      ? item.details
                      : `${item.details.substring(0, 150)}...`}
                    <button
                      className="toggleReadMore"
                      onClick={() => toggleReadMore(index)}
                      style={{
                        display: 'block',
                        margin: '10px 0',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      {expandedIndexes[index] ? 'Read less' : 'Read more'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles available.</p>
      )}
      <div ref={nflRef}>
      <button className="img-button" onClick={scrollToFootball}>
              <img className="imgufl" src="helmet/ball.png" alt="return to football" />
            </button><NFL />
      </div>
    </div>
  );
};

export default SportsFetcher;
