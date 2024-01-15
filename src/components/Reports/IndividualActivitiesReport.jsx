import { useEffect, useState } from 'react';
import { fetchActivities } from '../../services/activityService';

const IndividualActivitiesReport = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const activitiesData = await fetchActivities();
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchAllActivities();
  }, []);

  return (
    <div>
      <h2>Individual Activities Report</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.title.rendered}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndividualActivitiesReport;
