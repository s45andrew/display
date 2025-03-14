import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './articles.css';

const S3DataFetcher = () => {
  const [data, setData] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_LOCAL_NEWS_DATA_URL; // Fetch data from environment URL
        const response = await axios.get(url);
        if (Array.isArray(response.data)) {
          setData(response.data); // Populate state with the data
        } else {
          throw new Error('Parsed data is not an array');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching data from S3:', err);
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

  if (loading) {
    return <p>Loading...</p>; // Display loading text while data is being fetched
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>; // Handle any errors during data fetch
  }

  return (
    <div className="news-listings" style={{ padding: '20px' }}>
      <div className="joiner">
        <div>
          <h1>Local News</h1>
        </div>
      </div>
      {data.length > 0 && (
        <div className="articles-container">
          {data.map((item, index) => (
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
              <h2>{item.article}</h2>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.article}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                    marginBottom: '10px',
                  }}
                />
              )}
              <p>
                {expandedIndexes[index] ? item.details : `${item.details.substring(0, 100)}...`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default S3DataFetcher;
