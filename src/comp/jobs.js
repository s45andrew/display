import React, { useContext, useState } from 'react';
import { JobContext } from './jobContext';
import S3DataFetcher from './S3DataFetcher';

const JobList = () => {
  const { jobs, loading } = useContext(JobContext);
  const [selectedJob, setSelectedJob] = useState(null);

  if (loading) {
    return <div>Loading job listings...</div>; // Display loading message while fetching data
  }

  return (
    <div>
      <h1>Job Listings</h1>
      <S3DataFetcher />
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

export default JobList;
