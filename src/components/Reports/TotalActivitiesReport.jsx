import React, { useEffect, useState } from 'react';
import { fetchAllActivityLogs } from '../../services/activitylogsService';

const TotalActivitiesReport = () => {
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const logsData = await fetchAllActivityLogs();
        setActivityLogs(logsData);
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      }
    };

    fetchActivityLogs();
  }, []);

  return (
    <div>
      <h2>Total Activities Report</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            {/* Add more fields based on your activity log structure */}
            <th>Timestamp</th>
            <th>Author</th>
            {/* Add more fields based on your activity log structure */}
          </tr>
        </thead>
        <tbody>
          {activityLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.title}</td>
              {/* Add more fields based on your activity log structure */}
              <td>{log.timestamp}</td>
              <td>{log.author}</td>
              {/* Add more fields based on your activity log structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalActivitiesReport;
