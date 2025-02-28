import { useEffect } from 'react';

const LoadApp = ({ onDataLoaded }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchS3Data = async (url) => {
          const response = await fetch(url);
          const text = await response.text(); // Fetch response as text
          try {
            return JSON.parse(text); // Try to parse it as JSON
          } catch (error) {
            console.error(`Failed to parse JSON for ${url}:`, text); // Log the response text if parsing fails
            throw new Error(`Failed to fetch ${url}`);
          }
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

        let data8 = await fetchS3Data(process.env.REACT_APP_amazon);
        console.log('Fetched data8:', data8);
        data8 = data8.reverse();

        let data9 = await fetchS3Data(process.env.REACT_APP_amd);
        console.log('Fetched data9:', data9);
        data9 = data9.reverse();

        let data10 = await fetchS3Data(process.env.REACT_APP_netflix);
        console.log('Fetched data10:', data10);
        data10 = data10.reverse();

        let data11= await fetchS3Data(process.env.REACT_APP_xeonn);
        console.log('Fetched data11:', data11);
        data11 = data11.reverse();

        // Update state with individually reversed data
        onDataLoaded([data1, data2, data3, data4, data5, data6, data7,data8,data9,data10,data11]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataLoaded]);

  return null;
};

export default LoadApp;
