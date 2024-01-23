/* eslint-disable no-useless-catch */
// activityService.js

import api from "../api"; // Import the axios instance with the base URL
import { getToken } from './productService';
import { Cookies } from 'react-cookie';

const cookies = new Cookies(); // Create a new instance of Cookies

// Create a new activity
export const createActivity = async (activityData) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    // Include 'status' and 'title' in the request payload
    const payload = {
      status: 'publish',
      title: activityData.name, // Assuming 'name' is the field you want to use as the title
      // ... (other fields if needed)
    };

    const response = await api.post('/activity', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract the title from the API response
    const createdActivity = response.data;
    const createdTitle = createdActivity.title.rendered;

    // Update the title in the activity object
    return {
      ...createdActivity,
      title: createdTitle,
    };
  } catch (error) {
    console.error('Error creating activity:', error.message);
    throw error; // Re-throw the error for further handling in the calling code
  }
};

// Fetch all activities
export const fetchActivities = async () => {
  try {
    const response = await api.get('/activity'); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single activity by ID
export const fetchActivityById = async (activityId) => {
  try {
    const response = await api.get(`/activity/${activityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing activity
export const updateActivity = async (activityId, activityData) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    // Include 'status' and 'title' in the request payload
    const payload = {
      status: 'publish',
      title: activityData.name, // Assuming 'name' is the field you want to use as the title
      // ... (other fields if needed)
    };

    const response = await api.post(`/activity/${activityId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract the title from the API response
    const updatedActivity = response.data;
    const updatedTitle = updatedActivity.title.rendered;

    // Update the title in the activity object
    return {
      ...updatedActivity,
      title: updatedTitle,
    };
  } catch (error) {
    console.error('Error updating activity:', error.message);
    throw error; // Re-throw the error for further handling in the calling code
  }
};

// Delete an activity by ID
export const deleteActivity = async (activityId) => {
  try {
    const token = getToken(); // Get the authentication token

    if (!token) {
      throw new Error('Authentication token is missing.'); // Throw an error if the token is missing
    }

    await api.delete(`/activity/${activityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return activityId; // Return the deleted activity ID

  } catch (error) {
    console.error('Error deleting activity:', error.message);
    throw error; // Re-throw the error for further handling in the calling code
  }
};
