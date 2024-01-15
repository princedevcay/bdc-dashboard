import { useState } from 'react';
import { fetchActivityById } from '../../services/activityService';

const QueryActivityDetails = () => {
  const [activityId, setActivityId] = useState('');
  const [activityDetails, setActivityDetails] = useState(null);

  const handleQuery = async () => {
    try {
      const activityData = await fetchActivityById(activityId);
      setActivityDetails(activityData);
    } catch (error) {
      console.error('Error fetching activity details:', error);
    }
  };

  return (
    <div>
      <h2>Query Activity Details</h2>
      <label>
        Activity ID:
        <input
          type="text"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
        />
      </label>
      <button onClick={handleQuery}>Query</button>
      {activityDetails && (
        <div>
          <p>Activity Title: {activityDetails.title.rendered}</p>
          {/* Include other details based on your activity structure */}
        </div>
      )}
    </div>
  );
};

export default QueryActivityDetails;
