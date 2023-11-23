import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  IconButton,
  Heading,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  useColorMode,
  Collapse,
  ColorModeScript,
  HStack
} from '@chakra-ui/react';
import { FiMenu, FiHome, FiSettings, FiChevronDown, FiChevronUp, FiMoon, FiSun, FiFileText } from 'react-icons/fi';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductsPage from './components/DateEntries/ProductsPage';
import BDCCompanies from './components/DateEntries/BDCCompanies';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState('left');
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen: isSubMenuOpen, onToggle: onSubMenuToggle } = useDisclosure();

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <Router>
        <Box fontSize="xl">
          <Flex minHeight="100vh" direction="column">
            <IconButton
              aria-label="Open Menu"
              icon={<FiMenu />}
              onClick={onOpen}
              size="lg"
              m={2}
              display={{ base: 'flex', md: 'none' }}
            />

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">BDC Inventory Management</DrawerHeader>
                <DrawerBody>
                  <VStack align="flex-start">
                    <Link to="/"><Button variant="ghost">Dashboard</Button></Link>
                    <Button variant="ghost" rightIcon={isSubMenuOpen ? <FiChevronUp /> : <FiChevronDown />} onClick={onSubMenuToggle}>
                      Data Entries
                    </Button>
                    <Collapse in={isSubMenuOpen} animateOpacity>
                      <VStack align="flex-start" pl={4}>
                        <Link to="/data-entry/products"><Button variant="ghost">Products</Button></Link>
                        <Link to="/data-entry/bdc-companies"><Button variant="ghost">BDC Companies</Button></Link>
                      </VStack>
                    </Collapse>
                    <Link to="/reports"><Button leftIcon={<FiFileText />} variant="ghost">Reports</Button> </Link>
                    <Link to="/settings"><Button leftIcon={<FiSettings />} variant="ghost">Settings</Button> </Link>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            <Flex justifyContent="space-between" alignItems="center" p={3} display={{ base: 'none', md: 'flex' }}>
              <Heading as="h1">BDC Inventory Management</Heading>
              <HStack>
                <IconButton
                  aria-label="Toggle Dark Mode"
                  icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                  onClick={toggleColorMode}
                  size="lg"
                  m={2}
                />
              </HStack>
            </Flex>

            <Flex direction="row" flex="1">
              <VStack align="flex-start" spacing={4} p={4} display={{ base: 'none', md: 'flex' }}>
                <Link to="/"><Button variant="ghost">Dashboard</Button></Link>
                <Button variant="ghost" rightIcon={isSubMenuOpen ? <FiChevronUp /> : <FiChevronDown />} onClick={onSubMenuToggle}>
                  Data Entries
                </Button>
                <Collapse in={isSubMenuOpen} animateOpacity>
                  <VStack align="flex-start" pl={4}>
                    <Link to="/data-entry/products"><Button variant="ghost">Products</Button></Link>
                    <Link to="/data-entry/bdc-companies"><Button variant="ghost">BDC Companies</Button></Link>
                  </VStack>
                </Collapse>
                <Link to="/reports"><Button leftIcon={<FiFileText />} variant="ghost">Reports</Button> </Link>
                <Link to="/settings"><Button leftIcon={<FiSettings />} variant="ghost">Settings</Button> </Link>
              </VStack>

              <Box flex="1" p={4}>
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/data-entry/products" element={<ProductsPage />} />
                  <Route path="/data-entry/bdc-companies" element={<BDCCompanies />} />
                </Routes>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
