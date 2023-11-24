import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Alert,
  AlertIcon,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
} from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';

const AlertsWidget = () => {
  const alerts = [
    "Stock level for Diesel below 20%",
    "Unusual transaction pattern detected in Petrol",
    // Add more alerts as needed
  ];

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Notifications"
        icon={<FiBell />}
        variant="outline"
        size="md"
      />
      <MenuList p={2} maxH="300px" overflowY="auto">
        <Heading size="md" mx={4} my={2}>Alerts</Heading>
        <List spacing={2}>
          {alerts.map((alert, index) => (
            <ListItem key={index}>
              <Alert status="warning">
                <AlertIcon />
                {alert}
              </Alert>
            </ListItem>
          ))}
        </List>
      </MenuList>
    </Menu>
  );
};

export default AlertsWidget;
