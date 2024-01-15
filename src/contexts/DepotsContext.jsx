import { createContext, useState } from 'react';

export const DepotsContext = createContext(null);

const DepotsProvider = ({ children }) => {
  const [depots, setDepots] = useState([]);  // Initialize with empty array or fetch from an API
  
  const value = { depots, setDepots };

  return (
    <DepotsContext.Provider value={ value }>
      { children }
    </DepotsContext.Provider>
  );
};

export default DepotsProvider;
