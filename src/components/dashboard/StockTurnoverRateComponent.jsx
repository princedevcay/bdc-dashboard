import { Box, Heading, Text } from '@chakra-ui/react';

const StockTurnoverRateComponent = () => {
  const stockTurnoverRate = "5.3 times/year";

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Heading size="md">Stock Turnover Rate</Heading>
      <Text fontSize="xl">{stockTurnoverRate}</Text>
    </Box>
  );
};

export default StockTurnoverRateComponent;
