import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './articles.css';

const S3DataFetcher = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://myfrantic.s3.eu-west-2.amazonaws.com/local-news-data.json'; // Replace with your S3 object URL
        const response = await axios.get(url);
        if (Array.isArray(response.data)) {
          setData(response.data);
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

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : 0));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="news-listings" style={{ padding: '20px' }}>
      <div className='joiner'> 
        <div><h1>Local News</h1></div>
        <div className="navigation-buttons" >
          <div className='joiner'>
              <button onClick={handlePrevious}>⬆️ </button>
              <button onClick={handleNext}>⬇️</button>
              </div>
            </div>
      </div>
      {data.length > 0 && (
        <div className="article-container" style={{ position: 'relative' }}>
          <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
          
            <h2>{data[currentIndex].article}</h2>
            <p>{data[currentIndex].details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default S3DataFetcher;
