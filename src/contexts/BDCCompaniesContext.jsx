import { createContext, useState } from 'react';

export const BDCCompaniesContext = createContext(null);

const BDCCompaniesProvider = ({ children }) => {
  const [BDCCompanies, setBDCCompanies] = useState([]);  // Initialize with empty array or fetch from an API
  
  const value = { BDCCompanies, setBDCCompanies };

  return (
    <BDCCompaniesContext.Provider value={ value }>
      { children }
    </BDCCompaniesContext.Provider>
  );
};

export default BDCCompaniesProvider;
