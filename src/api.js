// api.js

import axios from 'axios';

const BASE_URL = 'https://africanloomtours.com/wp-json/wp/v2'; // Replace with your WordPress API base URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You can add any custom headers here if needed
  },
});

// Function to set the JWT token for authorization
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;