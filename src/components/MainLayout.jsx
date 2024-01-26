import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import api from '../api';
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
  Icon,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image
} from '@chakra-ui/react';
import {
  FiMenu, FiHome, FiClipboard, FiFileText , FiSettings, FiUser, FiLogOut, FiDroplet, FiRepeat
} from 'react-icons/fi';
import { HiOutlineMenuAlt3, HiOutlineMenuAlt1 } from 'react-icons/hi';
import Dashboard from './Dashboard';
import ProductsPage from './DateEntries/ProductsPage';
import BDCCompanies from './DateEntries/BDCCompanies';
import AlertsWidget from './dashboard/AlertsWidget';
import LoadingRackLiftingsForm from '../components/LoadingRackLiftingsForm';
import ImportsPage from './ImportsPage';
import TransferPage from './TransferPage';
import LogsPage from './DateEntries/LogsPage';
import Activities from './DateEntries/Activities';
import DepotsPage from './DateEntries/DepotsPage';
import IndividualActivitiesReport from '../pages/ReportsPages/IndividualActivitiesReportPage'
import TotalActivitiesReport from '../pages/ReportsPages/TotalActivitiesReportPage'
import QueryActivityDetails from '../pages/ReportsPages/QueryActivityDetailsPage'


const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [isExpanded, setExpanded] = useState(true);
  const [user, setUser] = useState(null); // State to store user information
  const [cookies] = useCookies(['isAuthenticated']);
  

  const toggleDrawerSize = () => {
    setExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = cookies.isAuthenticated;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
       // console.log('Fetched user data:', response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (cookies.isAuthenticated) {
      fetchUserData();
    }
  }, [cookies.isAuthenticated]);


  // Sidebar content array for mapping, including submenus
  const sidebarContent = [
    { icon: FiHome, name: 'Dashboard', path: '/dashboard' },
    {
      icon: FiClipboard,
      name: 'Data Entries',
      children: [
        { name: 'Activities', path: '/data-entry/activities' },
        { name: 'BDC Companies', path: '/data-entry/bdc-companies' },
        { name: 'Depots', path: '/data-entry/depots' },
        { name: 'Products', path: '/data-entry/products' },
      ],
    },
    { icon: FiFileText, name: 'Activity Logs', path: '/logs' },
    { icon: FiClipboard, name: 'Reports', path: '/reports/total-activities' },
  ];

  // Function to render sidebar items
  const renderSidebarItems = (items) => {
    return items.map((item, index) => (
      item.children ? (
        <Menu key={index}>
          <MenuButton as={Button} color='white' w="100%" textAlign={"left"} variant="ghost"  leftIcon={<Icon as={item.icon} />} _hover={{ bg: 'gray.100', color: 'blue.500' }}>
            {item.name}
          </MenuButton>
          <MenuList>
            {item.children.map((child, childIndex) => (
              <MenuItem as={Link} to={child.path} key={childIndex} onClick={onClose}>
                {child.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Link as={Link} to={item.path} key={index}>
          <Button w="100%" color="white" variant="ghost" justifyContent="flex-start" leftIcon={<Icon as={item.icon} />} _hover={{ bg: 'gray.100', color: 'blue.500' }} onClick={onClose}>
            {item.name}
          </Button>
        </Link>
      )
    ));
  };

  return (
    <Flex minHeight="100vh">
      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full" >
        <DrawerOverlay />
        <DrawerContent maxWidth="55%" bg="#0c4da2">
          <DrawerCloseButton />
          <Flex width="full" justify="center"> {/* Center the image */}
            <Image src="/logo.png" alt="TOR Logo" boxSize="100px" objectFit="contain" />
          </Flex>
          <DrawerHeader borderBottomWidth="1px" size="xl" mb={6} pl={3} justify="center" color={"white"}>Monitoring & Control Dept.</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              {renderSidebarItems(sidebarContent)}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

       {/* Desktop Sidebar */}
       <Box
        display={{ base: 'none', md: 'block' }}
        width={isExpanded ? { md: '250px' } : { md: '80px' }}
        bg="#0c4da2"
        p={4}
        boxShadow="md"
        transition="width 0.3s"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <IconButton
            aria-label="Toggle Menu"
            icon={<FiMenu />}
            onClick={onOpen}
            size="lg"
            m={2}
            display={{ base: 'flex', md: 'none' }}
          />
          <Flex align="center">
          </Flex>
        </Flex>
        <Flex width="full" justify="center">
          <Image src="/logo.png" alt="TOR Logo" bgColor={"white"} borderRadius={"50%"} padding={2} boxSize="100px" objectFit="contain" />
        </Flex>
        <Heading size="lg" mb={6} pl={3} justify="center" color={"white"}>Monitoring & Control Dept.</Heading>
        <Box borderBottomWidth="1px"></Box>
        <VStack mt={6} align="stretch" spacing={4}>
          {renderSidebarItems(sidebarContent)}
        </VStack>
      </Box>

      {/* Main Content and Header */}
      <Box flex="1" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <IconButton
            aria-label="Open Menu"
            icon={<FiMenu />}
            onClick={onOpen}
            size="lg"
            m={2}
            display={{ base: 'flex', md: 'none' }} // Only show on mobile
          />
          <Box flex="1" />
          <AlertsWidget />
          <Menu>
          <MenuButton as={Button} colorScheme="teal" rounded="full" variant="link" cursor="pointer" minW={0} ml={5}>
              {user ? (
                <Avatar size="sm" name={user.name} src={user.avatar_urls[48]} />
              ) : (
                <Avatar size="sm" name="User" />
              )}
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>My Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Box as="main" p={4}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-entry/products" element={<ProductsPage user={user} />} />
            <Route path="/data-entry/bdc-companies" element={<BDCCompanies user={user} />} />
            <Route path="/data-entry/loading-rack-liftings" element={<LoadingRackLiftingsForm user={user} />} />
            <Route path="/data-entry/imports" element={<ImportsPage user={user} />} />
            <Route path="/data-entry/transfers" element={<TransferPage user={user} />} />
            <Route path="logs" element={<LogsPage user={user}/>}/>
            <Route path="/data-entry/activities" element={<Activities user={user}/>}/>
            <Route path="/data-entry/depots" element={<DepotsPage user={user}/>}/>
            <Route path="/reports/total-activities" element={<TotalActivitiesReport user={user}/>} />
            <Route path="/reports/individual-activities" element={<IndividualActivitiesReport user={user}/>} />
            <Route path="/reports/query-activity-details" element={<QueryActivityDetails user={user}/>} />
 
            {/* Add additional routes here */}
          </Routes>
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;
