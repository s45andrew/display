import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://ofssrhemw1.execute-api.eu-west-2.amazonaws.com/dev/parse');
        setJobs(response.data.jobList);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div  className='stocks'>Loading job listings...</div>; // Display loading message while fetching data
  }

  return (
    <div className='jobs'>
      <h1>Job Listings<br />
      <button onClick={() => setSelectedJob(null)}>Back to Job Listings</button>
      </h1>
       
      {selectedJob ? (
        <div className='listings'>
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

export default JobList;
