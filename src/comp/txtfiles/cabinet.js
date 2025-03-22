import React from "react";
import "./cabinet.css";
import Indices from "./indices";

const Cabinet = () => {
  return <div className="cabinet">
 <h2 className='indy'>indeces</h2>
 
 <div className='joinery'>
   <div width='230px'><Indices title='FTSE'/></div>
    <div width='230px'><Indices  title='FTSE 250'/></div>
  </div>;
  

  <div className='joinery'>
    
   <div width='230px'> <Indices title='Dow Jones'/></div>
    <div width='230px'><Indices  title='NasDaq'/></div>
  </div>;
  <div className='joinery'>
    
    <div width='230px'> <Indices title='BitCoin'/></div>
     <div width='230px'><Indices  title='Gold'/></div>
   </div>;
  
  </div>
   
};

export default Cabinet;
