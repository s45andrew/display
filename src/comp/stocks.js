// src/components/About.js
import React from 'react';
import '../comp/stocks.css';

const Stock = () => {
  return  (
    <div className='stocks'>
      <h1>stock details Page</h1><br />
      <div className="flex-container">
        
        <div className="flex-child magenta">
          <div className="button-container">
            <button className="button-54" role="button">b1</button>
            <button className="button-54" role="button">b2</button>
            <button className="button-54" role="button">b3</button>
            <button className="button-54" role="button">b4</button>
            <button className="button-54" role="button">b5</button>
          </div>
          the left side
        </div>
        
        <div className="flex-child green">
          twitter news<br />
          <div className='myTwitter'><br />br twitter<br /></div>
        </div>
        
      </div>
      <div className='jooiner'>
        <div className='other'>the left side</div>
        <div className='right'>
          twitter news<br />
          <div className='myTwitter'><br />br twitter<br /></div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
