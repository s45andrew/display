import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nfl.css';

const NFL = () => {
  const s3Url =  process.env.REACT_APP_NFL_DATA_URL;       
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  async function fetchData() {
    try {
      const response = await axios.get(s3Url);
      if (response.data && Array.isArray(response.data)) {
        setArticles(response.data); // Set the articles array
      } else {
        throw new Error('Parsed data is not an array or is empty');
      }
    } catch (error) {
      console.error('Error fetching data from S3:', error);
      setError('Failed to fetch data from S3.');
    }
  }

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='football'>
      <h1>NFL Latest</h1>
      {error ? (
        <h3>{error}</h3>
      ) : (
        articles.map((article, index) => (
          <div key={index} className='white'>
            <h3>
              <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
            </h3>
          </div>
        ))
      )}
      <div className='helmets'><br /><br /><br />
        <img src='/helmet/49er.png' alt='49ers'></img>
        <img src='/helmet/bear.png' alt='bears'></img>
        <img src='/helmet/brown.png' alt='browns'></img>
        <img src='/helmet/cardinal.png' alt='arizona'></img>

        <img src='/helmet/chief.png' alt='chiefss'></img>
        <img src='/helmet/cowboy.png' alt='cowboys'></img>
        <img src='/helmet/eagle.png' alt='eagles'></img>
        <img src='/helmet/giant.png' alt='giants'></img>
        
        <img src='/helmet/dolphin.png' alt='miami dolphins'></img>
        <img src='/helmet/jaaguar.png' alt='jaguars'></img>
        <img src='/helmet/lion.png' alt='lions'></img>
        <img src='/helmet/packer.png' alt='packer'></img>
        
        
        <img src='/helmet/panther.png' alt='panthers'></img>
        <img src='/helmet/patriot.png' alt='patriots'></img>
        <img src='/helmet/raider.png' alt='raiders'></img>
        <img src='/helmet/ram.png' alt='LA Rams'></img>
        
        <img src='/helmet/raven.png' alt='ravens'></img>
        <img src='/helmet/wasington.png' alt='commanders'></img>
                <img src='/helmet/saint.png' alt='saints'></img> 
        <img src='/helmet/seahawk.png' alt='seahawks'></img> 
               <img src='/helmet/viking.png' alt='vikings'></img>  
         <img src='/helmet/titan.png' alt='titans'></img>
                <img src='/helmet/texan.png' alt='texans'></img>
               <img src='/helmet/stealer.png' alt='pitsburgh'></img>
    </div>
    </div>
  );
};

export default NFL;
