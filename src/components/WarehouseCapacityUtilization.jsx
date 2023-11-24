import React from 'react';
import { Box, Text, Progress } from '@chakra-ui/react';

const WarehouseCapacityUtilization = () => {
  // Sample data, replace with actual data fetching logic
  const warehouseData = [
    { name: "Warehouse A", capacity: 1000, currentUsage: 750 },
    { name: "Warehouse B", capacity: 4000, currentUsage: 2400 },
    { name: "Warehouse C", capacity: 5000, currentUsage: 1600 },
    { name: "Warehouse D", capacity: 7000, currentUsage: 3200 },
    { name: "Warehouse E", capacity: 10000, currentUsage: 1200 },
    // Add more warehouses as needed
  ];

  const calculateUtilization = (warehouse) => {
    return (warehouse.currentUsage / warehouse.capacity) * 100;
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Warehouse Capacity Utilization</Text>
      {warehouseData.map((warehouse, index) => (
        <Box key={index} mt={4}>
          <Text fontWeight="bold">{warehouse.name}</Text>
          <Progress colorScheme="green" size="sm" value={calculateUtilization(warehouse)} />
          <Text mt={2}>{`${warehouse.currentUsage} / ${warehouse.capacity} MT`}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default WarehouseCapacityUtilization;
