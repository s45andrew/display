import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LineChart from './lineChart';


import { Link } from 'react-router-dom';



function LoginPage() { 
  const [currentSource, setCurrentSource] = useState([]);
  const [price, setPrice] = useState('');
  const [graphtitle, setGrapthTitle] = useState('');
  const [msoft, setMsoft] = useState([]);
  const [apple, setApple] = useState([]);
  const [tesla, setTesla] = useState([]);
  const [cmg, setCmg] = useState([]);
  const [amazon, setAmazon] = useState([]);
  const [nvidia, setNvidia] = useState([]);
  const [bitcoin, setBitcoin] = useState([]);
  const [day, setDay] = useState('movement');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [color, setColor] = useState('grey');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [graph, setGraph] = useState(tesla);
  const [baractive, setBaractive] = useState('null');
  const [range, setRange] = useState(10);

  const handleBaractive = (name) => {
    setBaractive(name);
  };

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      const data = text.split('\n').map(line => {
        const [date, price] = line.split(': ');
        return { date, price: parseFloat(price.replace('$', '')) };
      });
      setData(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData('/stocks.txt', setTesla),
        fetchData('/msoft.txt', setMsoft),
        fetchData('/cmg.txt', setCmg),
        fetchData('/amazon.txt', setAmazon),
        fetchData('/bitcoin.txt', setBitcoin),
        fetchData('/apple.txt', setApple),
        fetchData('/nvidia.txt', setNvidia),
      ]);
      setCurrentSource(tesla);
      setGraph(tesla);
      setLoading(false);
    };
    fetchAllData();
  }, []);


  const movement = (data = currentSource, tim = range, title = graphtitle) => {
    setRange(tim);
    setCurrentSource(data);
    const sample = [];
  
    for (let i = 0; i < tim; i++) {
      if (data[i] && data[i].price !== undefined) {
        sample.push(data[i]);
      }
    }
  
    setGraph(sample);
    setGrapthTitle(title);
    setPrice(sample[0].price);
  
    let priceDifference = 0;
  
    if (sample.length >= 1 && sample.length < 4) {
      priceDifference = sample[0].price - (sample[1]?.price || 0);
      setColor(priceDifference < 0 ? 'crimson' : priceDifference > 0 ? 'green' : 'grey');
    } else if (sample.length < 8) {
      priceDifference = sample[0].price - (sample[4]?.price || 0);
      setColor(priceDifference < 0 ? 'crimson' : priceDifference > 0 ? 'green' : 'grey');
    } else if (sample.length > 8 && sample.length < 30 && sample[9].price) {
      priceDifference = sample[0].price - (sample[9]?.price || 0);
      setColor(priceDifference < 0 ? 'crimson' : priceDifference > 0 ? 'green' : 'grey');
    }
  
    setDay(priceDifference.toFixed(2));
  };
  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='login'>
          
          <div className='navy'>
        
    
        <nav>       
              <Link to="/news">News</Link>
         </nav>
        
            
          </div>
        
        </div>
      </header>
      <div className="StockStuff">
        
        <div className='gratit'>
          <h2 className='graname'>{graphtitle} {price}</h2><h3>{range}</h3>
          <h2 className='graname' style={{ color }}>{day}</h2>
        </div>
        <div className="tesla">
          
          
          <div className='theGraph'>
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <LineChart data={graph} />
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
