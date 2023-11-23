import { Box, Heading, List, ListItem, Alert, AlertIcon } from '@chakra-ui/react';

const AlertsWidget = () => {
  const alerts = [
    "Stock level for Diesel below 20%",
    "Unusual transaction pattern detected in Petrol",
    // Add more alerts as needed
  ];

  return (
    <Box border="1px" borderColor="gray.200" p={4} borderRadius="md">
      <Heading size="md">Alerts</Heading>
      <List spacing={3}>
        {alerts.map((alert, index) => (
          <ListItem key={index}>
            <Alert status="warning">
              <AlertIcon />
              {alert}
            </Alert>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AlertsWidget;
