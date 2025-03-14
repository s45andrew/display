import React, { createContext, useState, useEffect } from 'react';
import { fetchButtonStates } from './fetching'; // Import the utility function

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState('netflix'); // Default to 'netflix'
  const [buttonStates, setButtonStates] = useState({
    buttonfootball: 0,
    buttonNFL: 0,
    buttonJobData: 0,
    buttonLocalNews: 0,
  }); // Default button states

  // Fetch button states on mount
  useEffect(() => {
    const loadButtonStates = async () => {
      const states = await fetchButtonStates();
      setButtonStates(states);
    };

    loadButtonStates();
  }, []); // Only run once on component mount

  // Add reset functionality
  const handleReset = (buttonName) => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [buttonName]: 0, // Reset the specific button to 0
    }));
  };

  return (
    <GlobalStateContext.Provider value={{ 
      selectedCompany, 
      setSelectedCompany, 
      buttonStates, 
      setButtonStates, 
      handleReset 
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
