import React, { useState, useEffect } from "react";
import "./cabinet.css";
import Indices from "./indices";
import RoundButton from "./roundButton";

const Cabinet = () => {
  const [loadedData, setLoadedData] = useState(null);
  const [durations, setDurations] = useState(20); // Default duration
  const titles = [
    "FTSE",    "FTSE 250",    "DJ Ind",    "NassDaq",
    "₿itcoin",    "Gold",    "£ vs $",    "£ vs €"
  ];
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
        const data1 = (await fetchS3Data(process.env.REACT_APP_FTSE_DATA_URL))
          .slice(0, durations)
          .reverse(); // Reverse to bring the most recent data to the front
        const data2 = (await fetchS3Data(process.env.REACT_APP_FT250_DATA_URL))
          .slice(0, durations)
          .reverse();
        const data3 = (await fetchS3Data(process.env.REACT_APP_DOWJONES_DATA_URL))
          .slice(0, durations)
          .reverse();
        const data4 = (await fetchS3Data(process.env.REACT_APP_NASDAQ_DATA_URL))
          .slice(0, durations)
          .reverse();
        const data5 = (await fetchS3Data(process.env.REACT_APP_BITS2024_DATA_URL))
          .slice(0, durations)
          .reverse();
        const data6 = (await fetchS3Data(process.env.REACT_APP_GOLD_DATA_URL))
        .slice(0, durations)
        .reverse();
        const data7 = (await fetchS3Data(process.env.REACT_APP_DOLLAR_DATA_URL))
        .slice(0, durations)
        .reverse();
        const data8 = (await fetchS3Data(process.env.REACT_APP_EURO_DATA_URL))
        .slice(0, durations)
          .reverse();

        // Transform data into Chart.js format
        setLoadedData([
          { labels: data1.map((item) => item.date), datasets: [{ data: data1.map((item) => item.value) }] },
          { labels: data2.map((item) => item.date), datasets: [{ data: data2.map((item) => item.value) }] },
          { labels: data3.map((item) => item.date), datasets: [{ data: data3.map((item) => item.value) }] },
          { labels: data4.map((item) => item.date), datasets: [{ data: data4.map((item) => item.value) }] },
          { labels: data5.map((item) => item.date), datasets: [{ data: data5.map((item) => item.value) }] },
          { labels: data6.map((item) => item.date), datasets: [{ data: data6.map((item) => item.value) }] },
          { labels: data7.map((item) => item.date), datasets: [{ data: data7.map((item) => item.value) }] },
          { labels: data8.map((item) => item.date), datasets: [{ data: data8.map((item) => item.value) }] },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [durations]);

  const handleDurationChange = (value) => {
    setDurations(value); // Update durations state when a button is clicked
  };

  return (
    <div className="cabinet">
      <div className="containerCabinet">
        <h2 className="indy">Indices</h2>
        <button
          className={`round-button ${durations === 20 ? "is-active" : ""}`}
          onClick={() => handleDurationChange(20)}
        >
          1
        </button>
        <button
          className={`round-button ${durations === 60 ? "is-active" : ""}`}
          onClick={() => handleDurationChange(60)}
        >
          3
        </button>
        <button
          className={`round-button ${durations === 120 ? "is-active" : ""}`}
          onClick={() => handleDurationChange(120)}
        >
          6
        </button>
        <button
          className={`round-button ${durations === 240 ? "is-active" : ""}`}
          onClick={() => handleDurationChange(240)}
        >
          12
        </button>
        </div>
      {loadedData ? (
        <>
          <div className="joinery">
            <div width="230px">
              {loadedData && loadedData[0] && loadedData[0].datasets && loadedData[0].datasets[0] && loadedData[0].datasets[0].data ? (
                <Indices
                  title={`${titles[0]} £ ${Math.round(loadedData[0].datasets[0].data.slice(-1)[0])}`}
                  data={loadedData[0]}
                />
              ) : (
                <p>Data not available</p>
              )}
            </div>
            <div width="230px">
              <Indices
                title={`${titles[1]} £ ${Math.round(loadedData[1].datasets[0].data.slice(-1)[0])}`}
                data={loadedData[1]}
              />
            </div>
          </div>
          <div className="joinery">
            <div width="230px">
              <Indices
                title={`${titles[2]} $ ${Math.round(loadedData[2].datasets[0].data.slice(-1)[0])}`}
                data={loadedData[2]}
              />
            </div>
            <div width="230px">
              <Indices
                title={`${titles[3]} $ ${Math.round(loadedData[3].datasets[0].data.slice(-1)[0])}`}
                data={loadedData[3]}
              />
            </div>
          </div>
          <div className="joinery">
            <div width="230px">
              <Indices
                title={`${titles[4]}  $ ${Math.round(loadedData[4].datasets[0].data.slice(-1)[0])}`}
                data={loadedData[4]}
              />
            </div>
            <div width="230px">
              <Indices
                title={`${titles[5]} $ ${Math.round(loadedData[5].datasets[0].data.slice(-1)[0])}`}
                data={loadedData[5]}
              />
            </div>
          </div>
          <div className="joinery">
            <div width="230px">
              <Indices
                title={`${titles[6]} ${parseFloat(loadedData[6].datasets[0].data.slice(-1)[0]).toFixed(2)}`}
                data={loadedData[6]}
              />
            </div>
            <div width="220px">
              <Indices
                title={`${titles[7]} ${parseFloat(loadedData[7].datasets[0].data.slice(-1)[0]).toFixed(2)}`}
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
