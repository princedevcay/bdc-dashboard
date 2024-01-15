/* eslint-disable no-useless-catch */
// bdcService.js

import api from "../api"; // Import the axios instance with the base URL

// Create a new BDC company
export const createBDCCompany = async (newCompany) => {
  try {
    const response = await api.post('/bdc', newCompany);
    return response.data;
  } catch (error) {
    throw error;
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

// Fetch a single BDC company by ID
export const fetchBDCCompanyById = async (companyId) => {
  try {
    const response = await api.get(`/bdc/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing BDC company
export const updateBDCCompany = async (companyId, updatedCompany) => {
  try {
    const response = await api.put(`/bdc/${companyId}`, updatedCompany);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a BDC company by ID
export const deleteBDCCompany = async (companyId) => {
  try {
    const response = await api.delete(`/bdc/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
