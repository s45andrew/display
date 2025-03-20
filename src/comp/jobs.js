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
          // Process data to remove the email placeholder
          const sanitizedData = response.data.map((item) => ({
            ...item,
            details: item.details.replace(/This email address is being protected from spambots. You need JavaScript enabled to view it\./g, ""),
          }));
          setData(sanitizedData);
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
    <div className="news-listings">
      <div className="joiner">
        <div><h1>Job Listings</h1></div>
      
      </div>
      <div className="news-listingsjobs" style={{ padding: '20px' }}>
        <div className="articles-containerjobs">
          {data.map((item, index) => (
            <div key={index} className="articlejob" style={{ margin: '20px 0', border: '1px solid #ccc', borderRadius:'9px' ,padding: '10px' }}>
               <h2 className='job-title'>{item.job}</h2>
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

      
    </div>
  );
};

export default CombinedComponent;
