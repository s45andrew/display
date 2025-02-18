import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_JOB_DATA_URL; // Using .env file for the URL
        if (!url) {
          throw new Error('URL is not defined. Check your .env file.');
        }
        const response = await axios.get(url);
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from S3:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <JobContext.Provider value={{ jobs, loading }}>
      {children}
    </JobContext.Provider>
  );
};
