import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const [sport, setSport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchsport = async () => {
      try {
        const response = await axios.get('https://ofssrhemw1.execute-api.eu-west-2.amazonaws.com/dev/parse');
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
