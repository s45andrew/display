import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './nfl.css';
const TodoButton = () => {
  const navigate = useNavigate();

  const handleClicks = () => {
    navigate('/todoList');
  };

  return (
    <button onClick={handleClicks} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      <img 
        src="/helmet/saint.png" 
        alt="Saints" 
        style={{ width: '150px', height: '150px' }} 
      />
    </button>
  );
};

const ImageButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/adding'); // Navigate to the desired route
  };

  return (
    <button onClick={handleClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      <img 
        src="/helmet/raven.png" 
        alt="Ravens" 
        style={{ width: '150px', height: '150px' }} 
      />
    </button>
  );
};

const NFL = () => {
  const s3Url = process.env.REACT_APP_NFL_DATA_URL;
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    <div className='sportjoiner'>
      <div className="image-containernfl"><br />
        <img className='imgnfl' src="helmet\nfl.png" alt="NFL"     />
        <br />
        <br />
      
        <a href="https://www.ninersnation.com" target="_blank" rel="noreferrer">
          <img src='/helmet/49er.png' alt='49ers'></img>
        </a>
        <a href="https://www.yardbarker.com" target="_blank" rel="noreferrer">
          <img src='/helmet/bear.png' alt='bears'></img>
        </a>
      <a href="https://www.ninersnation.com" target="_blank" rel="noreferrer">
       <img src='/helmet/49er.png' alt='49ers'></img>  </a>
       <a href="https://www.yardbarker.com" target="_blank" rel="noreferrer">
       <img src='/helmet/bear.png' alt='bears'></img> </a>
       <a href="https://www.clevelandbrowns.com" target="_blank" rel="noreferrer">
       <img src='/helmet/brown.png' alt='browns'></img></a>
       <a href="https://www.arivonacardinals.com" target="_blank" rel="noreferrer">
       <img src='/helmet/cardinal.png' alt='arizona'></img></a>
       <a href="https://www.kansascitychiefs.com" target="_blank" rel="noreferrer">
         <img src='/helmet/chief.png' alt='chiefs'></img></a>
        <a href="https://www.dallascowboys.com" target="_blank" rel="noreferrer">
        <img src='/helmet/cowboy.png' alt='cowboys'></img></a>
        <a href="https://www.philadelphiaeagles.com" target="_blank" rel="noreferrer">
       <img src='/helmet/eagle.png' alt='eagles'></img></a>
       <a href="https://www.giants.com" target="_blank" rel="noreferrer">
       <img src='/helmet/giant.png' alt='giants'></img></a>
       <a href="https://www.miamidolphins.com" target="_blank" rel="noreferrer">
       
        <img src='/helmet/dolphin.png' alt='miami dolphins'></img></a>
        <img src='/helmet/jaaguar.png' alt='jaguars'></img>
        <a href="https://www.detroitlions.com" target="_blank" rel="noreferrer">
       <img src='/helmet/lion.png' alt='lions'></img></a>
        <img src='/helmet/packer.png' alt='packer'></img>
        
        
        <img src='/helmet/panther.png' alt='panthers'></img>
        <img src='/helmet/patriot.png' alt='patriots'></img>
        <img src='/helmet/raider.png' alt='raiders'></img>
        <img src='/helmet/ram.png' alt='LA Rams'></img>
        
     

     
        <img src='/helmet/wasington.png' alt='commanders'></img>
                <TodoButton /> 
                <ImageButton />
        <img src='/helmet/seahawk.png' alt='seahawks'></img> 
               <img src='/helmet/viking.png' alt='vikings'></img>  
         <img src='/helmet/titan.png' alt='titans'></img>
                <img src='/helmet/texan.png' alt='texans'></img>
               <img src='/helmet/stealer.png' alt='pitsburgh'></img>
      
      </div>
      
    <div className='football'>
    
      {error ? (
        <h3>{error}</h3>
      ) : (
        articles.map((article, index) => (
          <div key={index} className='white'>
            <h3>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h3>
          </div>
          
        ))
      )}
      </div>
      
    </div>
    </div>
  );
};

export default NFL;
