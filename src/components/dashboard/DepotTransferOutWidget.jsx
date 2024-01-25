// DepotTransferOutWidget.js

import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import * as activityService from '../../services/activityService';

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
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading size="md">TOTAL DEPOT TRANSFER OUT</Heading>
      <Heading size="xl">{depotTransferOutCount}</Heading>
    </Box>
  );
};

export default DepotTransferOutWidget;
