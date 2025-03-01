import React, { useEffect, useState, useContext } from 'react';

const StockNews =({ selectedCompany }) => {
  
  const [news, setNews] = useState({});
  const [error, setError] = useState(null);
  const s3Url = process.env.REACT_APP_NEWS_GOOGLE_NEWS;

  // Debugging: Log the value of selectedCompany and fetched data

  useEffect(() => {
    if (selectedCompany) {
      console.log('Fetching news for:', selectedCompany); // Debugging
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
  }, [selectedCompany]); // Keep the dependencies array consistent

  return (
    <div>
      <h3>{selectedCompany ? `News for ${selectedCompany}` : 'No company selected'}</h3>
      {error && <p>{error}</p>}
      {news[selectedCompany] ? (
        <div>
          <h2>News for {selectedCompany.charAt(0).toUpperCase() + selectedCompany.slice(1)}:</h2>
          {news[selectedCompany].map((item, index) => (
            <div key={index}>
              <h3>{item.title}</h3>
              <p><a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
            </div>
          ))}
        </div>
      ) : (
        <p>No news available for the selected company.</p>
      )}
    </div>
  );
};

export default StockNews;
