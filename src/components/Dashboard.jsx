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

  return (
    <>
      <Heading size="lg" mb={4} pl={3} color={"blue.500"}>{`Welcome back, ${username || 'UserName'}!`}</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} p={5} mb={10}>
        <TotalActivitiesWidget />
        <TotalProductsWidget />
        <DepotTransferOutWidget />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} p={5} mb={10}>
        <RemindersWidget />
      </SimpleGrid>

    </>
  );
};

export default Dashboard;
