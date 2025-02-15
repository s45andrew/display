import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SportsFetcher = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://myfrantic.s3.eu-west-2.amazonaws.com/local-football-data.json');
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Sports Articles</h1>
      {articles.map((article, index) => (
        <div key={index} style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{article.title}</h2>
          <p>{article.details}</p>
        </div>
      ))}
    </div>
  );
};

export default SportsFetcher;
