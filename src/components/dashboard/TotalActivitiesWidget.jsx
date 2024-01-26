import  { useEffect, useState } from 'react';
import { Box, Heading, Flex, Icon } from '@chakra-ui/react';
import { fetchAllActivityLogs } from '../../services/activitylogsService';
import { FiFileText } from 'react-icons/fi';

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
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md" w={"100%"} h={"94px"} bgColor={"#0C4DA2"}>
    <Flex justifyContent="space-between" alignItems="center">
    <Box>
      <Heading size="sm" color={"white"}>TOTAL ACTIVITIES</Heading>
      <Heading size="lg" color={"white"}>{totalActivities}</Heading>
    </Box>
    <Icon  bgColor={"white"} color={"#0C4DA2"} as={FiFileText} boxSize={16} p={2} borderRadius={"2xl"} />
  </Flex>
</Box>
  );
};

export default TotalActivitiesWidget;
