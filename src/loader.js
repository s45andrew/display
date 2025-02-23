import { useEffect } from 'react';

const LoadApp = ({ onDataLoaded }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchS3Data = async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch ${url}`);
          return await response.json();
        };

        let data1 = await fetchS3Data(process.env.REACT_APP_ftse);
        console.log('Fetched data1:', data1);
        data1 = data1.reverse();

        let data2 = await fetchS3Data(process.env.REACT_APP_tesla);
        console.log('Fetched data2:', data2);
        data2 = data2.reverse();

        let data3 = await fetchS3Data(process.env.REACT_APP_cmg);
        console.log('Fetched data3:', data3);
        data3 = data3.reverse();

        let data4 = await fetchS3Data(process.env.REACT_APP_bitcoin);
        console.log('Fetched data4:', data4);
        data4 = data4.reverse();

        let data5 = await fetchS3Data(process.env.REACT_APP_apple);
        console.log('Fetched data5:', data5);
        data5 = data5.reverse();

        let data6 = await fetchS3Data(process.env.REACT_APP_microsoft);
        console.log('Fetched data6:', data6);
        data6 = data6.reverse();

        let data7 = await fetchS3Data(process.env.REACT_APP_nvidia);
        console.log('Fetched data7:', data7);
        data7 = data7.reverse();

        // Update state with individually reversed data
        onDataLoaded([data1, data2, data3, data4, data5, data6, data7]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataLoaded]);

  return null;
};

export default LoadApp;
