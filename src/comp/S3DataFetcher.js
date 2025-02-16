import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const S3DataFetcher = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://myfrantic.s3.eu-west-2.amazonaws.com/job-data.json'; // Replace with your S3 object URL
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from S3:', error);
        setError('Failed to fetch data from S3.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="job-listings">
            
      {data.length > 0 && (
        <div>
          <div style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{data[currentIndex].job}</h2>
            <p>{data[currentIndex].details}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default S3DataFetcher;
