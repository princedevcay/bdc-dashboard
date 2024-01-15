/* eslint-disable no-useless-catch */
// depotService.js

import api from "../api"; // Import the axios instance with the base URL

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

// Other functions related to depots can be added as needed
