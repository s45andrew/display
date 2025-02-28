// src/components/About.js
import React from 'react';
import '../comp/stocks.css';
import LineGraph from './txtfiles/lineChart'

const Stock = () => {
  return  (
    <div className='stocks'>
     <div className="flex-container">
        
        <div className="flex-child magenta">
        
          
          <LineGraph />
          <br /> <br /> <br /> <br />
        </div>
        
        <div className="flex-child green">
        <h3 className='titles'> stock details Page</h3>
      
          twitter news<br />
          <div className='myTwitter'><br />br twitter<br /></div>
        </div>
        
      </div>
      <div className='jooiner'>
        <div className='other'></div>
        <div className='right'>
        <h3 className='titles'> latest news</h3>
      
            
          <div className='searchedResults'><br />..related stories<br />.</div>
          <br /><br /><br />
        </div>
      </div>
    </div>
  );
};

export default Stock;
