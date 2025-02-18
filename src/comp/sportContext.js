import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const [sport, setSport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchsport = async () => {
      try {
        const url = process.env.REACT_APP_FOOTBALL_DATA_URL;
        const response = await axios.get(url);

        setSport(response.data.SportList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setLoading(false);
      }
    };

    fetchsport();
  }, []);

  return (
    <SportContext.Provider value={{ sport, loading }}>
      {children}
    </SportContext.Provider>
  );
};
