import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { JobContext } from './jobContext';
import './job.css';

const CombinedComponent = () => {
  const { jobs, loading } = useContext(JobContext);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [error, setError] = useState('');
  const [loadingS3, setLoadingS3] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_JOB_DATA_URL;
        if (!url) {
          throw new Error('URL is not defined. Check your .env file.');
        }
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

  const toggleReadMore = (index) => {
    setExpandedIndexes((prevIndexes) => ({
      ...prevIndexes,
      [index]: !prevIndexes[index],
    }));
  };

  if (loading) {
    return <div>Loading job listings...</div>;
  }

  if (loadingS3) {
    return <div>Loading news articles...</div>;
  }

  return (
    <div className="combined-container">
      <div className="joiner">
        <div><h1>Job Listings</h1></div>
      
      </div>
      <div className="news-listings" style={{ padding: '20px' }}>
        <div className="articles-container">
          {data.map((item, index) => (
            <div key={index} className="article" style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
              <h2>{item.article}</h2>
              <p>
                {expandedIndexes[index] ? item.details : item.details.substring(0, 100) + '...'}
                <button className='toggleReadMore' onClick={() => toggleReadMore(index)}>
                  {expandedIndexes[index] ? 'Read less' : 'Read more'}
                </button>
              </p>
            </div>
          ))}
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
