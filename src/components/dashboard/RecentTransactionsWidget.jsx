import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const RecentTransactionsWidget = () => {
  // Sample data, replace with actual data fetching logic
  const transactionData = [
    { date: "2023-10-01", productName: "Diesel", type: "Lifting", quantity: 200 },
    { date: "2023-10-02", productName: "Petrol", type: "Transfer In", quantity: 300 },
    { date: "2023-10-03", productName: "Kerosene", type: "Transfer Out", quantity: 150 },
    // Add more transactions as needed
  ];

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Recent Transactions</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Product</Th>
            <Th>Type</Th>
            <Th isNumeric>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionData.map((transaction, index) => (
            <Tr key={index}>
              <Td>{transaction.date}</Td>
              <Td>{transaction.productName}</Td>
              <Td>{transaction.type}</Td>
              <Td isNumeric>{transaction.quantity} Litres</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RecentTransactionsWidget;
