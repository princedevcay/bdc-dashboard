import { createContext, useState, useContext } from 'react';

export const DepotsContext = createContext(null);

const DepotsProvider = ({ children }) => {
  const [depots, setDepots] = useState([]); // Initialize with empty array or fetch from an API

  const updateDepots = (newDepots) => {
    setDepots(newDepots);
  };

  const value = { depots, updateDepots };

  return (
    <DepotsContext.Provider value={value}>
      {children}
    </DepotsContext.Provider>
  );
};

export const useDepotsContext = () => {
  const context = useContext(DepotsContext);
  if (!context) {
    throw new Error('useDepotsContext must be used within a DepotsProvider');
  }
  return context;
};

export default DepotsProvider;
