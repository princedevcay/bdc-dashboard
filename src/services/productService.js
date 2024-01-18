/* eslint-disable no-useless-catch */
// productService.js

import api from "../api"; // Import the axios instance with the base URL
import { Cookies } from 'react-cookie';


const cookies = new Cookies();

// Utility function to get the authentication token
const getToken = () => {
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
    const response = await api.put(`/torproduct/${productId}`, updatedProduct);
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

    console.log('Authentication token:', token);

    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    console.log('Sending log entry to API with token:', token);

    // Include product information in the post title
    const title = `${logData.product} - ${logData.activity}`;

    console.log('API URL:', '/activitylog');
    console.log('Request Headers:', {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    console.log('Request Payload:', { ...logData, title });

    const response = await api.post('/activitylog', { ...logData, title }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Log entry saved successfully:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error saving log entry:', error);
    throw error;
  }
};

// Fetch log entries
export const fetchLogEntries = async () => {
  try {
    const response = await api.get('/activitylog'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch current user
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/users/me'); // Update the endpoint to match your WordPress setup
    const currentUser = response.data;

    if (currentUser && currentUser.display_name) {
      return currentUser.display_name;
    } else {
      throw new Error('Display name not found in current user data.');
    }
  } catch (error) {
    throw new Error(`Error fetching current user: ${error.message}`);
  }
};