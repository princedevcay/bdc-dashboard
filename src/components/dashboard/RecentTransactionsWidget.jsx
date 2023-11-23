import { Box, Heading, List, ListItem, Icon } from '@chakra-ui/react';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

const RecentTransactionsWidget = () => {
  const transactions = [
    { type: "Lifting", amount: "2,000L", icon: FiArrowUpRight },
    { type: "Transfer In", amount: "1,500L", icon: FiArrowDownRight },
    // Add more transactions as needed
  ];

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Heading size="md">Recent Transactions</Heading>
      <List spacing={3}>
        {transactions.map((transaction, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <Icon as={transaction.icon} mr={2} />
            {`${transaction.type}: ${transaction.amount}`}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentTransactionsWidget;
