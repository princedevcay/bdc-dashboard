import { Box, Heading, Text, VStack, Progress } from '@chakra-ui/react';

const StockLevelWidget = () => {
  const stockData = [
    { product: "Diesel", quantity: 7000, maxQuantity: 10000 },
    { product: "Petrol", quantity: 6500, maxQuantity: 10000 },
    // Add more mock data as needed
  ];

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Heading size="md">Current Stock Levels</Heading>
      <VStack align="stretch">
        {stockData.map((item, index) => (
          <Box key={index} mb={3}>
            <Text fontWeight="bold">{item.product}</Text>
            <Progress value={(item.quantity / item.maxQuantity) * 100} />
            <Text>{`${item.quantity} / ${item.maxQuantity}`}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default StockLevelWidget;
