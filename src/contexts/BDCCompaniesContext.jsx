// BDCCompaniesContext.js
import { createContext, useState, useContext } from 'react';

export const BDCCompaniesContext = createContext(null);

const BDCCompaniesProvider = ({ children }) => {
  const [BDCCompanies, setBDCCompanies] = useState([]); // Initialize with an empty array or fetch from an API

  const value = { BDCCompanies, setBDCCompanies };

  return (
    <BDCCompaniesContext.Provider value={value}>
      {children}
    </BDCCompaniesContext.Provider>
  );
};

export const useBDCCompaniesContext = () => {
  const context = useContext(BDCCompaniesContext);
  if (!context) {
    throw new Error('useBDCCompaniesContext must be used within a BDCCompaniesProvider');
  }
  return context;
};

export default BDCCompaniesProvider;
