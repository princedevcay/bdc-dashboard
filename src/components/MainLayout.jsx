import React from 'react';
import { useLocation, Routes, Route, Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  VStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Heading,
  Text,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { FiMenu, FiHome, FiClipboard, FiUsers, FiSettings } from 'react-icons/fi';
import Dashboard from './Dashboard';
import ProductsPage from './DateEntries/ProductsPage';
import BDCCompanies from './DateEntries/BDCCompanies';

const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  // This will be true only if we're not on the landing page
  const showSidebar = location.pathname !== '/';

  // Sidebar content array for mapping
  const sidebarContent = [
    { icon: FiHome, name: 'Dashboard', path: '/dashboard' },
    { icon: FiClipboard, name: 'Products', path: '/data-entry/products' },
    { icon: FiUsers, name: 'BDC Companies', path: '/data-entry/bdc-companies' },
    // Add more sidebar items here
  ];

  return (
    <Flex minHeight="100vh" bg="gray.50">
      {showSidebar && (
        <>
          {/* Mobile Drawer */}
          <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
              <DrawerBody>
                <VStack align="stretch" spacing={4}>
                  {sidebarContent.map((item, index) => (
                    <Link key={index} to={item.path}>
                      <Button w="100%" variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={item.icon} />} onClick={onClose}>
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* Desktop Sidebar */}
          <Box width={{ md: '250px' }} bg="white" p={4} boxShadow="md">
            <Heading size="lg" mb={6} pl={3}>BDC Inventory Management</Heading>
            <Divider />
            <VStack mt={6} align="stretch" spacing={4}>
              {sidebarContent.map((item, index) => (
                <Link key={index} to={item.path}>
                  <Button variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={item.icon} />} pl={3}>
                    <Text>{item.name}</Text>
                  </Button>
                </Link>
              ))}
            </VStack>
          </Box>
        </>
      )}

      <Box flex="1" p={4}>
        {/* Hamburger icon for mobile */}
        {showSidebar && (
          <IconButton
            aria-label="Open Menu"
            icon={<FiMenu />}
            onClick={onOpen}
            size="lg"
            m={2}
            display={{ base: 'flex', md: 'none' }}
          />
        )}

        {/* Main Content */}
        <Box as="main" p={4}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-entry/products" element={<ProductsPage />} />
            <Route path="/data-entry/bdc-companies" element={<BDCCompanies />} />
            {/* Add additional routes here */}
          </Routes>
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;
