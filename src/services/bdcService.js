/* eslint-disable no-useless-catch */
// bdcService.js

import api from "../api"; // Import the axios instance with the base URL
import { getToken } from './productService';

// Create a new BDC company
export const createBDCCompany = async (companyData) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    // Include 'status' and 'title' in the request payload
    const payload = {
      status: 'publish',
      title: companyData.name, // Assuming 'name' is the field you want to use as the title
      // ... (other fields if needed)
    };

    const response = await api.post('/bdc', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract the name from the API response
    const createdCompany = response.data;
    const createdName = createdCompany.name;

    // Update the name in the BDC company object
    return {
      ...createdCompany,
      name: createdName,
    };
  } catch (error) {
    console.error('Error creating BDC company:', error.message);
    throw error; // Re-throw the error for further handling in the calling code
  }
};

// Fetch all BDC companies
export const fetchBDCCompanies = async () => {
  try {
    const response = await api.get('/bdc');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing BDC company
export const updateBDCCompany = async (companyId, companyData) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    // Include 'status' and 'name' in the request payload
    const payload = {
      status: 'publish',
      title: companyData.name, // Assuming 'name' is the field you want to use as the title
      // ... (other fields if needed)
    };

    const response = await api.post(`/bdc/${companyId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract the name from the API response
    const updatedCompany = response.data;
    const updatedName = updatedCompany.title.rendered;

    // Update the name in the BDC company object
    return {
      ...updatedCompany,
      title: updatedName,
    };
  } catch (error) {
    console.error('Error updating BDC company:', error.message);
    throw error; // Re-throw the error for further handling in the calling code
  }
};

// Delete a BDC company by ID
export const deleteBDCCompany = async (companyId) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    await api.delete(`/bdc/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return companyId; // Return the deleted BDC company ID
  } catch (error) {
    console.error('Error deleting BDC company:', error.message);
    throw error; // Re-throw the error for further handling in the calling code
  }
};
