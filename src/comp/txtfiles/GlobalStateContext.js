import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [selectedCompany, setSelectedCompany] = useState('netflix'); // Default to 'netflix'

  return (
    <GlobalStateContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
