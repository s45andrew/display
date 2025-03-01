import React, { useContext } from 'react';
import '../comp/stocks.css';
import LineGraph from './txtfiles/lineChart';
import StockNews from './txtfiles/readGoogle';
import { GlobalStateContext } from './txtfiles/GlobalStateContext';

const Stock = () => {
  const { selectedCompany, setSelectedCompany } = useContext(GlobalStateContext);

  return (
    <div className='stocks'>
      <div className="flex-container">
        <div className="flex-child magenta">
          <LineGraph />
          <br /><br /><br /><br />
        </div>
        
        <div className="flex-child green">
          <h3 className='titles'>Stock Details Page</h3>
          <div>twitter news</div>
          <div className='myTwitter'><br />br twitter<br />
          <h3>{selectedCompany}</h3></div>
        </div>
      </div>
      
      <div className='jooiner'>
        <div className='other'></div>
        <div className='right'>
          <h3 className='titles'>Latest News</h3>
          <div className='searchedResults'><br /> 
          <StockNews selectedCompany={selectedCompany.toLowerCase()} />

          </div>
          <br /><br />
        </div>
      </div>
    </div>
  );
};

export default Stock;
