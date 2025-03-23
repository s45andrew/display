import React, { useState, useEffect } from "react";
import "./cabinet.css";
import Indices from "./indices";
import RoundButton from './roundButton';
const Cabinet = () => {
  const [loadedData, setLoadedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Environment Variables:", process.env);
    
        const fetchS3Data = async (url) => {
          if (!url) {
            throw new Error("URL is undefined. Check your environment variables.");
          }
    
          const response = await fetch(url);
          const text = await response.text();
          return JSON.parse(text);
        };
    
        // Fetch and process data correctly
        const data1 = (await fetchS3Data(process.env.REACT_APP_FTSE_DATA_URL)).slice(0,100).reverse(); // Reverse to bring the most recent data to the front
        const data2 = (await fetchS3Data(process.env.REACT_APP_FT250_DATA_URL)).slice(0,100).reverse();
        const data3 = (await fetchS3Data(process.env.REACT_APP_DOWJONES_DATA_URL)).slice(0,100).reverse();
        const data4 = (await fetchS3Data(process.env.REACT_APP_NASDAQ_DATA_URL)).slice(0,100).reverse();
        const data5 = (await fetchS3Data(process.env.REACT_APP_BITS2024_DATA_URL)).slice(0,100).reverse();
        const data6 = (await fetchS3Data(process.env.REACT_APP_GOLD_DATA_URL)).slice(-100);
        const data7 = (await fetchS3Data(process.env.REACT_APP_DOLLAR_DATA_URL)).slice(-100);
        const data8 = (await fetchS3Data(process.env.REACT_APP_EURO_DATA_URL)).slice(-100);
    
        // Transform data into Chart.js format
        setLoadedData([
          { labels: data1.map(item => item.date), datasets: [{ data: data1.map(item => item.value) }] },
          { labels: data2.map(item => item.date), datasets: [{ data: data2.map(item => item.value) }] },
          { labels: data3.map(item => item.date), datasets: [{ data: data3.map(item => item.value) }] },
          { labels: data4.map(item => item.date), datasets: [{ data: data4.map(item => item.value) }] },
          { labels: data5.map(item => item.date), datasets: [{ data: data5.map(item => item.value) }] },
          { labels: data6.map(item => item.date), datasets: [{ data: data6.map(item => item.value) }] },
          { labels: data7.map(item => item.date), datasets: [{ data: data7.map(item => item.value) }] },
          { labels: data8.map(item => item.date), datasets: [{ data: data8.map(item => item.value) }] },
        
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="cabinet">
      <div className='containerCabinet'><h2 className="indy">Indices</h2><RoundButton text='3'/><RoundButton text='6'/> <RoundButton text='12'/>
</div>
      {loadedData ? (
        <>
          <div className="joinery">
            <div width="230px">
            {loadedData && loadedData[0] && loadedData[0].datasets && loadedData[0].datasets[0] && loadedData[0].datasets[0].data ? (
  <Indices
    title={`FTSE £ ${Math.round(loadedData[0].datasets[0].data.slice(-1)[0])}`}
    data={loadedData[0]}
  />
) : (
  <p>Data not available</p>
)}
</div>
            <div width="230px">
              <Indices title={`FTSE 250 £ ${Math.round(loadedData[1].datasets[0].data.slice(-1)[0])}`}
                                   data={loadedData[1]}  /> </div>
          </div>

          <div className="joinery">
            <div width="230px">
              <Indices title={`DJ ind  $ ${Math.round(loadedData[2].datasets[0].data.slice(-1)[0])}`}
                                   data={loadedData[2]}  /> </div>
            <div width="230px">
              <Indices title={`NassDaq  $ ${Math.round(loadedData[3].datasets[0].data.slice(-1)[0])}`}
                                   data={loadedData[3]}  /> </div>
          </div>

          <div className="joinery">
            <div width="230px">
              <Indices  title={`₿itcoin  $ ${Math.round(loadedData[4].datasets[0].data.slice(-1)[0])}`}
                                   data={loadedData[5]}  /> </div>
            <div width="230px">₿,
            <Indices
                   title={`Gold $ ${Math.round(loadedData[5].datasets[0].data.slice(-1)[0])}`}
                    data={loadedData[5]}  /> </div>
          </div>
          <div className="joinery">
          <div width="230px">
              <Indices
                   title={`£ vs $ ${parseFloat(loadedData[6].datasets[0].data.slice(-1)[0]).toFixed(2)}`}
                   data={loadedData[6]}  />
           </div>
           
<div width= "220px" >
  <Indices
    title={`£ vs €  ${parseFloat(loadedData[7].datasets[0].data.slice(-1)[0]).toFixed(2)}`}
    data={loadedData[7]}
  />
</div>


          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Cabinet;
