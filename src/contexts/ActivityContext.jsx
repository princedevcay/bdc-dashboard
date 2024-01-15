// ActivityContext.js
import { createContext, useState, useContext } from 'react';

export const ActivityContext = createContext(null);

const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const updateActivities = (newActivities) => {
    setActivities(newActivities);
  };

  const value = { activities, updateActivities };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext must be used within an ActivityProvider');
  }
  return context;
};

export default ActivityProvider;
