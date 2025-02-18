import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const URL=process.env.REACT_APP_LOCAL_NEWS_DATA_URL;
       
        const response = await axios.get(URL);
        setNews(response.data.newsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news stories:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading }}>
      {children}
    </NewsContext.Provider>
  );
};
