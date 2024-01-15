/* eslint-disable no-useless-catch */
// activityService.js

import api from "../api"; // Import the axios instance with the base URL
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// Create a new activity
export const createActivity = async (newActivity) => {
  try {
    const response = await api.post('/activity', newActivity);
    return response.data;
  } catch (error) {
    throw error;
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
export const updateActivity = async (activityId, updatedActivity) => {
  try {
    const response = await api.put(`/activity/${activityId}`, updatedActivity);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete an activity by ID
export const deleteActivity = async (activityId) => {
  try {
    const token = cookies.get('isAuthenticated'); // Replace with your actual cookie name
    const response = await api.delete(`/activity/${activityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
