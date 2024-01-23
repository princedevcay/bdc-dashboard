/* eslint-disable no-useless-catch */
import api from "../api";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// Utility function to get the authentication token
export const getToken = () => {
  const token = cookies.get('isAuthenticated') || '';
  if (!token) {
    throw new Error('Authentication token is missing.');
  }
  return token;
};

// Create a new product
export const createProduct = async (newProduct) => {
  try {
    const response = await api.post('/torproduct', newProduct);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await api.get('/torproduct');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`/torproduct/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (productId, updatedProduct) => {
  try {
    const title = updatedProduct.title.rendered; // Extract title from the updated product
    const response = await api.put(`/torproduct/${productId}`, { ...updatedProduct, title }, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const token = getToken();
    const response = await api.delete(`/torproduct/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Save a log entry with product information in the title
export const saveLog = async (logData) => {
  try {
    const token = getToken();
    const title = `${logData.activity}`;
    const response = await api.post('/activitylog', { ...logData, title }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLogEntries = async () => {
  try {
    const response = await api.get('/activitylog');
    const logEntries = response.data;
    const logEntriesWithoutAuthor = logEntries.map(entry => {
      const { authorDetails, ...entryWithoutAuthor } = entry;
      return entryWithoutAuthor;
    });
    return logEntriesWithoutAuthor;
  } catch (error) {
    throw error;
  }
};
