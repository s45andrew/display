import React, { useState, useEffect } from 'react';

const LoadApp = ({ onDataLoaded }) => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [data5, setData5] = useState(null);
  const [data6, setData6] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch('/ftse.json');
        const data1 = await res1.json();
        setData1(data1.reverse());

        const res2 = await fetch('/apple.json');
        const data2 = await res2.json();
        setData2(data2.reverse());

        const res3 = await fetch('/msoft.json');
        const data3 = await res3.json();
        setData3(data3.reverse());

        const res4 = await fetch('/bitcoin.json');
        const data4 = await res4.json();
        setData4(data4.reverse());

        const res5 = await fetch('/cmg.json');
        const data5 = await res5.json();
        setData5(data5.reverse());

        const res6 = await fetch('/nvidia.json');
        const data6 = await res6.json();
        setData6(data6.reverse());

        const res7 = await fetch('/tesla.json');
        const data7 = await res7.json();
        setData6(data7.reverse());

        // Call the callback function to pass the data to the parent component
        onDataLoaded([data1, data2, data3, data4, data5, data6, data7]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataLoaded]);

  return null; // No need to render anything in this component
};

export default LoadApp;
