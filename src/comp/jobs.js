import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { JobContext } from './jobContext';
import './job.css';

const CombinedComponent = () => {
  const { jobs, loading } = useContext(JobContext);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState('');
  const [loadingS3, setLoadingS3] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://myfrantic.s3.eu-west-2.amazonaws.com/job-data.json'; // Replace with your S3 object URL
        const response = await axios.get(url);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          throw new Error('Parsed data is not an array');
        }
        setLoadingS3(false);
      } catch (err) {
        setError(err.message);
        setLoadingS3(false);
        console.error('Error fetching data from S3:', err);
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data.length - 1 ? prevIndex + 1 : 0));
  };

  if (loading) {
    return <div>Loading job listings...</div>;
  }

  if (loadingS3) {
    return <div>Loading news articles...</div>;
  }

  return (
    <div className='combined-container'>
      <div className='joiner'>
        <div><h1>Job Listings</h1></div>
        <div className="navigation-buttons" >
          <div className='buttons'>
            <button onClick={handlePrevious}>⬆️</button>
            <button onClick={handleNext}>⬇️</button>
          </div>
        </div>
      </div>
      
      <div className="news-listings" style={{ padding: '20px' }}>
        <div className="article-container" style={{ position: 'relative' }}>
          <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px', position: 'relative' }}>
         
            <h2>{data[currentIndex].article}</h2>
            <p>{data[currentIndex].details}</p>
          </div>
        </div>
      </div>

      {selectedJob ? (
        <div>
          <h2>{selectedJob.job}</h2>
          <p>{selectedJob.details}</p>
          <button onClick={() => setSelectedJob(null)}>Back to Job Listings</button>
        </div>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index} onClick={() => setSelectedJob(job)}>
              <h2>{job.job}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CombinedComponent;
