import React, { useEffect, useState } from 'react';
import axios from 'axios';

const S3DataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://myfrantic.s3.eu-west-2.amazonaws.com/local-news-data.json'; // Replace with your S3 object URL

        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data from S3:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Local News</h1>
      {data ? (
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
