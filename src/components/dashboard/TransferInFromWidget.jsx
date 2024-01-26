import React from 'react';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';

const TransferInFromWidget = () => {
  // Mock data based on the image provided
  const companies = [
    "VIHAMA ENERGY",
    "DOMINION",
    "FUELTRADE",
    "EBONY",
    "GLOBEX ENERGY",
    "PEACE PETRO.",
    "OIL CHANNEL",
    "ECO/SAGE",
    "WOODFIELDS",
    "CIRRUS",
    "BLUE OCEAN",
    // More companies...
  ];

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md">
      <Heading size="md" bg="yellow.100" p={2}>TRANSFER IN FROM</Heading>
      <List spacing={2}>
        {companies.map((company, index) => (
          <ListItem key={index} p={2} borderBottom="1px" borderColor="gray.100">
            {company}
          </ListItem>
        ))}
      </List>
      <Box p={2} bg="teal.100">
        <Heading size="sm">TOTAL</Heading>
        {/* Total value can be calculated or fetched from the data */}
      </Box>
    </Box>
  );
};

export default TransferInFromWidget;
