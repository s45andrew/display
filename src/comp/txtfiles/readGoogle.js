import React, { useEffect, useState } from 'react';

const StockNews = ({ selectedCompany }) => {
  const [news, setNews] = useState({});
  const [error, setError] = useState(null);
  
  const s3Url = process.env.REACT_APP_NEWS_GOOGLE_NEWS;

  // Convert selectedCompany to lowercase
  const normalizedCompany = typeof selectedCompany === 'string' ? selectedCompany.toLowerCase() : '';

  useEffect(() => {
    if (normalizedCompany) {
      console.log('Fetching news for:', normalizedCompany); // Debugging
      fetch(s3Url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched Data:', data); // Debugging
          setNews(data);
        })
        .catch(error => {
          console.error('Error fetching the news:', error);
          setError('Error fetching the news');
        });
    }
  }, [normalizedCompany]); // Watch normalizedCompany instead of selectedCompany

  return (
    <div className='right'>
      <br />
      {error && <p>{error}</p>}
      {normalizedCompany ? (
        <>
          <h2>News for {normalizedCompany.charAt(0).toUpperCase() + normalizedCompany.slice(1)}:</h2>
          {news[normalizedCompany] ? (
            <div className='right'>
              {news[normalizedCompany].map((item, index) => (
                <div className='white' key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.snippet}</p>
                  <p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      Read more
                    </a>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No news available for the selected company.</p>
          )}
        </>
      ) : (
        <h3>No company selected</h3>
      )}
    </div>
  );
};

export default StockNews;
