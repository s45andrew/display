import React, { useContext } from 'react';
import '../comp/stocks.css';
import LineGraph from './txtfiles/lineChart';
import StockNews from './txtfiles/readGoogle';
import { GlobalStateContext } from './txtfiles/GlobalStateContext';

const Stock = () => {
  const { selectedCompany, setSelectedCompany } = useContext(GlobalStateContext);
console.log(selectedCompany)
  return (
    <div className='stocks'>
      <div className="flex-container">
        <div className="flex-child magenta">
          <LineGraph />
          <br /><br /><br /><br />
        </div>
        
        <div className="flex-child green">
        <div className="img-container">
        <img src='fr2.png' alt='franticStats' />
        </div>
          
          <h3 className='titles'>Stock Details Page</h3>
          <div>twitter news</div>
          <div className='myTwitter'><br />br twitter<br />
          <h3>{selectedCompany}</h3></div>
        </div>
      </div>
      
      <div className='jooiner'>
      <br /> <div className='other'></div>
        <div className='right'>
         
        
        <div className='searchedResults'><br /> 
        <StockNews selectedCompany={selectedCompany} />


          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Stock;
