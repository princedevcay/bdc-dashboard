import React from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/react';

const StockPositionComponent = () => {
  // Mock data based on the image provided
  const stockPositionData = {
    "PREMIUM": {
      "Opening Balance": "6,495,768",
      "Stock Position": "5,611,768",
    },
    "GASOIL": {
      "Opening Balance": "4,646,577",
      "Stock Position": "3,987,859",
    },
    // Assuming similar structure for other products
    "KERO": {
      "Opening Balance": "860,033",
      "Stock Position": "8,755",
    },
    "ATK": {
      "Opening Balance": "-", // Placeholder for non-provided data
      "Stock Position": "7,072",
    },
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl" fontWeight="bold" mb={4}>NENSER PETRO - Stock Position</Text>
      <HStack wrap="wrap" spacing={4} justify="space-between">
        {Object.entries(stockPositionData).map(([product, values], idx) => (
          <VStack key={idx} bg="blue.50" p={4} borderRadius="md" minWidth="220px" spacing={3}>
            <Text fontSize="lg" fontWeight="bold">{product}</Text>
            <Box p={2} bg="green.100" borderRadius="md">
              <Text fontSize="sm">Opening Balance: {values["Opening Balance"]}</Text>
            </Box>
            <Box p={2} bg="green.50" borderRadius="md">
              <Text fontSize="sm">Stock Position: {values["Stock Position"]}</Text>
            </Box>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default StockPositionComponent;
