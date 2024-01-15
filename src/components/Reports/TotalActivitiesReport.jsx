import { useEffect, useState } from 'react';
import { fetchActivities } from '../../services/activityService';

const TotalActivitiesReport = () => {
  const [totalActivities, setTotalActivities] = useState(0);

  useEffect(() => {
    const fetchTotalActivities = async () => {
      try {
        const activitiesData = await fetchActivities();
        setTotalActivities(activitiesData.length);
      } catch (error) {
        console.error('Error fetching total activities:', error);
      }
    };

    fetchTotalActivities();
  }, []);

  return (
    <div>
      <h2>Total Activities Report</h2>
      <p>Total Activities: {totalActivities}</p>
    </div>
  );
};

export default TotalActivitiesReport;
