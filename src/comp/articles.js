import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './articles.css';


const S3DataFetcher = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_LOCAL_NEWS_DATA_URL;
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
    <div className="news-listings" style={{ padding: '20px' }}>
      <div className='joiner'> 
        <div><h1>Local News</h1></div>
       
      </div>
      {data.length > 0 && (
        <div className="articles-container">
          {data.map((item, index) => (
            <div key={index} className="article" style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
              <h2>{item.article}</h2>
              <p>
                {expandedIndexes[index] ? item.details : item.details.substring(0, 100) + '...'}
                <button clsssName='toggleReadMore'onClick={() => toggleReadMore(index)}>
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
