import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
    minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      p={5}
      bgGradient="linear(to-r, teal.300, green.200)"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="full"
        maxW="1200px"
        height={"500px"}
        bg={formBackground}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <VStack
          flex={1}
          spacing={4}
          alignItems="flex-start"
          justifyContent="center"
          p={5}
        >
          <Heading as="h1" size="xl">BDC Inventory Management</Heading>
          <Text fontSize="xl">Welcome to Our Inventory Management System</Text>
          <HStack spacing={4}>
          <Link to="/login">
          <Button colorScheme="blue">Login</Button>
        </Link>
        <Link to="/register">
          <Button colorScheme="green">Register</Button>
        </Link>
          </HStack>
        </VStack>
        <Box flex={1} p={5}>
          <Image 
            src="startimage.png" // Replace with your image path
            borderRadius="lg"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
