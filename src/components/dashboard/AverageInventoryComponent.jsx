import { Box, Heading, Text } from '@chakra-ui/react';

const AverageInventoryComponent = () => {
  const averageInventory = "3,500L";

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Heading size="md">Average Inventory</Heading>
      <Text fontSize="xl">{averageInventory}</Text>
    </Box>
  );
};

export default AverageInventoryComponent;
