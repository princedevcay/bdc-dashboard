import React from 'react';
import { Box, Text, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

const AverageInventoryComponent = () => {
  // Sample data, replace with actual data fetching logic
  const inventoryData = [
    { productName: "Diesel", stock: [1200, 1150, 1100] },
    { productName: "Petrol", stock: [1500, 1450, 1400] },
    // Add more products as needed
  ];

  const calculateAverage = (stocks) => {
    const total = stocks.reduce((acc, stock) => acc + stock, 0);
    return total / stocks.length;
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Average Inventory</Text>
      {inventoryData.map((product, index) => (
        <Stat key={index} mt={3}>
          <StatLabel>{product.productName}</StatLabel>
          <StatNumber>{calculateAverage(product.stock).toFixed(2)} Litres</StatNumber>
        </Stat>
      ))}
    </Box>
  );
};

export default AverageInventoryComponent;
