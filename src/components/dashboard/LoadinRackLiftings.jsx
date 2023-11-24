import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const LoadingRackLiftings = () => {
  // Sample data structure based on the provided image
  const liftingsData = [
    { day: 1, product: "PREMIUM", litres: 67500, mtons: 47.886 },
    { day: 2, product: "PREMIUM", litres: 121500, mtons: 86.173 },
    // ... other day entries for PREMIUM
    { day: 31, product: "PREMIUM", litres: 72000, mtons: 50.999 },
    // Assuming this entry is for the total of PREMIUM
    { product: "PREMIUM", litres: 884000, mtons: 658.718, isTotal: true },
    // Add entries for other products like GASOIL etc.
  ];

  // Function to format numbers with commas for thousands
  const formatNumber = (num) => num.toLocaleString();

  // Function to format metric tons to three decimal places
  const formatMtons = (num) => num.toFixed(3);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading size="md" mb={4}>Loading Rack Liftings</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Day</Th>
            <Th>Product</Th>
            <Th isNumeric>Litres</Th>
            <Th isNumeric>MTONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {liftingsData.map((entry, index) => (
            <Tr key={index} bg={entry.isTotal ? 'teal.100' : undefined}>
              <Td>{entry.isTotal ? 'Total' : entry.day}</Td>
              <Td>{entry.product}</Td>
              <Td isNumeric>{formatNumber(entry.litres)}</Td>
              <Td isNumeric>{formatMtons(entry.mtons)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LoadingRackLiftings;
