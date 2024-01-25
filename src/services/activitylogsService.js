/* eslint-disable no-useless-catch */
import api from "../api";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// Fetch all activity logs
export const fetchAllActivityLogs = async () => {
  try {
    const response = await api.get('/activitylog');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new activity log
export const createActivityLog = async (newActivityLog) => {
  try {
    const response = await api.post('/activitylog', newActivityLog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch individual activity log by ID
export const fetchActivityLogById = async (logId) => {
  try {
    const response = await api.get(`/activitylog/${logId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing activity log
export const updateActivityLog = async (logId, updatedActivityLog) => {
  try {
    const response = await api.put(`/activitylog/${logId}`, updatedActivityLog);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete an activity log by ID
export const deleteActivityLog = async (logId) => {
  try {
    const token = cookies.get('isAuthenticated');
    const response = await api.delete(`/activitylog/${logId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Search Activity Logs

export const searchActivityLogs = async (searchTerm) => {
  try {
    const response = await api.get('/activitylog', {
      params: {
        search: searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
