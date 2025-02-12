import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          Bucket: 'myfrantic', // Replace with your bucket name
          Key: 'job-data.json', // Replace with your object key
        });

        const url = `https://myfrantic.s3.eu-west-2.amazonaws.com/${params}`;

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
