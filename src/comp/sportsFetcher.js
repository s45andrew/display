import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './articles.css';

const SportsFetcher = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedIndexes, setExpandedIndexes] = useState({});

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = process.env.REACT_APP_FOOTBALL_DATA_URL; // URL from environment variable
        const response = await axios.get(URL);

        // Log the fetched articles for debugging
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
        setLoading(false); // Ensure loading state is updated even if fetch fails
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

  // Fallback to local image if an image fails to load
  const handleImageError = (event) => {
    event.target.src = 'football.jpeg'; // Update this path accordingly
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="news-listings" style={{ padding: '20px' }}>
      <div className="joiner">
        <h1>Latest Stories</h1>
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
              {/* Title at 100% width */}
              <h2 style={{ width: '100%' }}>{item.title}</h2>
              {/* Image and article side by side */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                {item.imageUrl && (
                  <div style={{ flex: '1', maxWidth: '30%' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      onError={handleImageError} // Handle image loading error
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
    </div>
  );
};

export default SportsFetcher;
