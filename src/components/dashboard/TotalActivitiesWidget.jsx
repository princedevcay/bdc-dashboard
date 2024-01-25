import React, { useEffect, useState } from 'react';
import { Box, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { FaTasks } from 'react-icons/fa';
import { fetchAllActivityLogs } from '../../services/activitylogsService';

const TotalActivitiesWidget = () => {
  const [totalActivities, setTotalActivities] = useState(0);

  useEffect(() => {
    const fetchTotalActivities = async () => {
      try {
        const logsData = await fetchAllActivityLogs();
        const totalActivitiesCount = logsData.length;
        setTotalActivities(totalActivitiesCount);
      } catch (error) {
        console.error('Error fetching total activities:', error);
      }
    };

    fetchTotalActivities();
  }, []);

  return (
    <Box>
      <Heading size="md" my={2}>
        Total Activity Logs
      </Heading>
      <Box mx={4} my={2}>
        <Alert status="info">
          <AlertIcon />
          Total: {totalActivities}
        </Alert>
      </Box>
    </Box>
  );
};

export default TotalActivitiesWidget;
