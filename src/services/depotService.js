/* eslint-disable no-useless-catch */
// depotService.js

import api from "../api"; // Import the axios instance with the base URL
import { getToken } from './productService';
import { Cookies } from 'react-cookie';

const cookies = new Cookies(); // Create a new instance of Cookies

// Function to create the payload for creating or updating a depot
const createDepotPayload = (depotData) => ({
  status: 'publish',
  title: depotData.name, // Assuming 'name' is the field you want to use as the title
  // ... (other fields if needed)
});

// Fetch all depots
export const fetchDepots = async () => {
  try {
    const response = await api.get('/depot');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single depot by ID
export const fetchDepotById = async (depotId) => {
  try {
    const response = await api.get(`/depot/${depotId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new depot
export const createDepot = async (depotData) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    const payload = createDepotPayload(depotData);

    const response = await api.post('/depot', payload, {
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

// Update an existing depot
export const updateDepot = async (depotId, depotData) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    const payload = createDepotPayload(depotData);

    const response = await api.put(`/depot/${depotId}`, payload, {
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

// Delete a depot by ID
export const deleteDepot = async (depotId) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    await api.delete(`/depot/${depotId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return depotId; // Return the deleted depot ID

  } catch (error) {
    throw error;
  }
};
