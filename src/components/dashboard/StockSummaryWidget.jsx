import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const StockSummaryWidget = () => {
  // Mock data extracted from the image
  const summaryData = [
    { product: "PREMIUM", litres: "5,611,768", mtons: "3,987.859" },
    { product: "GASOIL", litres: "5,449", mtons: "4.008" },
    { product: "ATK", litres: "2,077", mtons: "1.678" },
    { product: "KERO", litres: "-", mtons: "-" },
    { product: "RFO", litres: "-", mtons: "-" },
    { product: "LPG", litres: "-", mtons: "-" },
    // Additional products can be added here
  ];

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Heading size="md" mb={4}>Stock Summary</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th isNumeric>Litres</Th>
            <Th isNumeric>MTONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {summaryData.map((item, index) => (
            <Tr key={index}>
              <Td>{item.product}</Td>
              <Td isNumeric>{item.litres}</Td>
              <Td isNumeric>{item.mtons}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StockSummaryWidget;
