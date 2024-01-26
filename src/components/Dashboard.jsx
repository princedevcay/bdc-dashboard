/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { SimpleGrid, Heading } from '@chakra-ui/react';
import TotalActivitiesWidget from './dashboard/TotalActivitiesWidget';
import TotalProductsWidget from './dashboard/TotalProductsWidget';
import DepotTransferOutWidget from './dashboard/DepotTransferOutWidget';
import RemindersWidget from './dashboard/ReminderWidget';
import { useCookies } from 'react-cookie';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useDisclosure } from '@chakra-ui/react';
import api from '../api';

const Dashboard = () => {
  const [cookies] = useCookies(['isAuthenticated']);
  const [username, setUsername] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    try {
      const token = cookies.isAuthenticated;
      const response = await api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const user = response.data;
      setUsername(user.name || 'UserName');
    } catch (error) {
      console.error('Error fetching username:', error);
      setUsername('UserName'); // Default value or handle the error as needed
    }
  };

  const showPopupAlert = () => {
    // Open the popup alert
    onOpen();
  };

  useEffect(() => {
    fetchData();
  }, [cookies.isAuthenticated, fetchData]);

  useEffect(() => {
    // Set the document title when the component mounts
    document.title = 'Dashboard';

    // Optionally, you can return a cleanup function to update the title when the component unmounts
    return () => {
      document.title = 'Tor Monitoring & Control System'; // Reset the title when the component unmounts
    };
  }, []);

  useEffect(() => {
    // Show the popup alert on the first load
    showPopupAlert();
  }, []); // Empty dependency array means it runs only once when the component mounts

  return (
    <>
      <Heading size="lg" mb={4} pl={3} color={"blue.500"}>{`Welcome back, ${username || 'UserName'}!`}</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} p={5} mb={10}>
        <RemindersWidget />
        <TotalActivitiesWidget />
        <TotalProductsWidget />
        <DepotTransferOutWidget />
      </SimpleGrid>

      {/* Popup Alerts Widget */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Welcome to the Dashboard!
            </AlertDialogHeader>

            <AlertDialogBody>
              Thank you for logging in. Here's an important alert for you!
              {/* Add your alert content here */}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={onClose} ml={3}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Dashboard;
