import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://e9gttwg1yi.execute-api.eu-west-2.amazonaws.com/dev/articles');
        console.log('Fetched data:', response.data);
        if (response.data && response.data.body) {
          const parsedData = JSON.parse(response.data.body);
          if (Array.isArray(parsedData)) {
            setArticles(parsedData);
          } else {
            console.error('Parsed data is not an array:', parsedData);
            setError('Data format is incorrect.');
          }
        } else {
          console.error('Response data is invalid:', response.data);
          setError('Data format is incorrect.');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Error fetching articles.');
      }
    };
    fetchArticles();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='articles'>
        <h1>Articles</h1>
    
    <div className='joiner'>
      
      <div className='Left'>
      <ul>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))
        ) : (
          <li>No articles found.</li>
        )}
      </ul>
      </div>
      <div className='right'>
           <h3> more details</h3>
      </div>
    </div>
    </div>
  );
};

export default Articles;
