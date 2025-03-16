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
        const url = process.env.REACT_APP_LOCAL_NEWS_DATA_URL;
        const response = await axios.get(url);
        if (Array.isArray(response.data)) {
          // Fix S3 URLs if needed
          const correctedData = response.data.map((item) => ({
            ...item,
            image: item.image
              ? item.image.replace(
                  'https://s3.amazonaws.com/myfrantic/',
                  'https://myfrantic.s3.eu-west-2.amazonaws.com/'
                )
              : null,
          }));
          setData(correctedData);
        } else {
          throw new Error('Parsed data is not an array');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data from S3:', err);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="news-listings">
      <div className="joiner">
        <h1>Local News</h1>
      </div>
      {data.length > 0 ? (
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
              {/* Full-width title */}
              <h2 style={{ width: '100%' }}>{item.article}</h2>
              {/* Image and article side by side */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                {/* Image block */}
                {item.image && (
                  <div style={{ flex: '1', maxWidth: '30%' }}>
                    <img
                      src={item.image}
                      alt={item.article}
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        maxHeight: '150px',
                      }}
                    />
                  </div>
                )}
                {/* Article details */}
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

export default S3DataFetcher;
