// ProductContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext(); // Create the context

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Initialize state with an empty array or actual data

  // Log products to the console whenever products change
  useEffect(() => {
    
  }, [products]);

  // Value to be passed to the provider
  const value = { products, setProducts };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider; // Export the provider as the default export
