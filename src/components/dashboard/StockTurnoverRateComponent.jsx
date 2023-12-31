import { Box, Heading, Text } from '@chakra-ui/react';

const StockTurnoverRateComponent = () => {
  const stockTurnoverRate = "5.3 times/year";

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading size="md">Stock Turnover Rate</Heading>
      <Text fontSize="xl">{stockTurnoverRate}</Text>
    </Box>
  );
};

export default StockTurnoverRateComponent;
