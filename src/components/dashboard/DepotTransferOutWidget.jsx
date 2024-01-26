// DepotTransferOutWidget.js

import { useState, useEffect } from 'react';
import { Box, Heading, Flex, Icon } from '@chakra-ui/react';
import * as activityService from '../../services/activityService';
import { FiClipboard } from 'react-icons/fi';

const DepotTransferOutWidget = () => {
  const [depotTransferOutCount, setDepotTransferOutCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const count = await activityService.fetchDepotTransferOutCount();
        setDepotTransferOutCount(count);
      } catch (error) {
        console.error('Error fetching DEPOT TRANSFER OUT count:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md" w={"100%"} h={"94px"} bgColor={"#0C4DA2"}>
    <Flex justifyContent="space-between" alignItems="center">
    <Box>
      <Heading size="sm" color={"white"} >TOTAL DEPOT OUT TRANSFER</Heading>
      <Heading size="lg" color={"white"}>{depotTransferOutCount}</Heading>
    </Box>
    <Icon as={FiClipboard} bgColor={"white"} color={"#0C4DA2"} p={2} boxSize={16} borderRadius={"2xl"}  />
  </Flex>
</Box>
  );
};

export default DepotTransferOutWidget;
