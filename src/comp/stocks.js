// src/components/About.js
import React from 'react';
import '../comp/stocks.css';
import LineGraph from './txtfiles/lineChart'

const Stock = () => {
  return  (
    <div className='stocks'>
      <h3 className='titles'> stock details Page</h3>
      <div className="flex-container">
        
        <div className="flex-child magenta">
        
          
          <LineGraph />
          <br /> <br /> <br /> <br />
        </div>
        
        <div className="flex-child green">
          twitter news<br />
          <div className='myTwitter'><br />br twitter<br /></div>
        </div>
        
      </div>
      <div className='jooiner'>
        <div className='other'><br /><br /></div>
        <div className='right'>
              share news<br />
          <div className='searchedResults'><br />..related stories<br />.</div>
          <br /><br /><br />
        </div>
      </div>
    </div>
  );
};

export default Stock;
