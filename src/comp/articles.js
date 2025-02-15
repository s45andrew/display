import React, { useEffect, useState } from 'react';
import axios from 'axios';

const S3DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data from S3:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Local News</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : data ? (
        <div>
          {data.map((article, index) => (
            <div key={index} style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
              <h2>{article.article}</h2>
              <p>{article.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default S3DataFetcher;
