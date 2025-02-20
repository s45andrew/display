// src/components/About.js
import React from 'react';
import '../comp/stocks.css';
import LineGraph from './txtfiles/lineChart'

const Stock = () => {
  return  (
    <div className='stocks'>
      <h1>stock details Page</h1><br />
      <div className="flex-container">
        
        <div className="flex-child magenta">
        
          
          <LineGraph />
        </div>
        
        <div className="flex-child green">
          twitter news<br />
          <div className='myTwitter'><br />br twitter<br /></div>
        </div>
        
      </div>
      <div className='jooiner'>
        <div className='other'><br /><br /><br ></br></div>
        <div className='right'>
          twitter news<br />
          <div className='myTwitter'><br />br twitter<br /></div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
