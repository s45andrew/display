import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LineChart from './lineChart';
import LoadApp from '../../loader.js'; // Adjust the path as needed
import { Link } from 'react-router-dom';

function LoginPage() { 
   const [loadedData, setLoadedData] = useState([]);
   const [currentSource, setCurrentSource] = useState([]);
   const [price, setPrice] = useState('');
   const [graphtitle, setGrapthTitle] = useState('');
   const [tesla, setTesla] = useState([]);
   const [day, setDay] = useState('movement');
   const [isOpen, setIsOpen] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [color, setColor] = useState('grey');
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const [graph, setGraph] = useState(tesla);
   const [baractive, setBaractive] = useState('null');
   const [range, setRange] = useState(null);  // set the range option i will consider

   const handleBaractive = (name) => {
       setBaractive(name);
   };

   useEffect(() => {
       if (loadedData.length > 0) {
           setLoading(false);
           // You can set the initial data source here if needed
           setCurrentSource(loadedData);
       }
   }, [loadedData]);

   return (
       <div className="App" style={{ height: '100vh', overflowY: 'scroll' }}>
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
               <LoadApp onDataLoaded={setLoadedData} />
               <div className='gratit'>
              {/*   <h2 className='graname'>{graphtitle} {price}</h2><h3>{range}</h3>
                   <h2 className='graname' style={{ color }}>{day}</h2> */}
               </div>
               <div className="tesla">
                   <div className='theGraph'>
                   <div className='theGraph' style={{ width: '530px', height: '400px', overflow: 'hidden' }}>
  <LineChart data={graph} width={530} height={300} />
</div>
                   </div>
               </div>
           </div>
       </div>
   );
}

export default LoginPage;
