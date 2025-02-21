import React, { useState, useEffect } from 'react';

const LoadApp = ({ onDataLoaded }) => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [data5, setData5] = useState(null);
  const [data6, setData6] = useState(null);
  const [data7, setData7] = useState(null); // initialize data7

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch('/ftse.json');
        const data1 = await res1.json();
        setData1(data1);

        const res2 = await fetch('/apple.json');
        const data2 = await res2.json();
        setData2(data2);

        const res3 = await fetch('/msoft.json');
        const data3 = await res3.json();
        setData3(data3);

        const res4 = await fetch('/bitcoin.json');
        const data4 = await res4.json();
        setData4(data4);

        const res5 = await fetch('/cmg.json');
        const data5 = await res5.json();
        setData5(data5);

        const res6 = await fetch('/nvidia.json');
        const data6 = await res6.json();
        setData6(data6);

        const res7 = await fetch('/tesla.json');
        const data7 = await res7.json();
        setData7(data7);

        // Call the callback function to pass the reversed data to the parent component
        onDataLoaded([
          data1.reverse(),
          data2.reverse(),
          data3.reverse(),
          data4.reverse(),
          data5.reverse(),
          data6.reverse(),
          data7.reverse(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataLoaded]);

  return null; // No need to render anything in this component
};

export default LoadApp;
