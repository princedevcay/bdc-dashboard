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
     <Box p={4} borderWidth="1px" borderRadius="lg">
     <Heading size="md">TOTAL ACTIVITY LOGS</Heading>
     <Heading size="xl">{totalActivities}</Heading>
   </Box>
  );
};

export default TotalActivitiesWidget;
