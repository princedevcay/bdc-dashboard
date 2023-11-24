/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Link,
  useColorModeValue,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  Spinner
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);

    try {
      // Replace with your login logic
      console.log('Email:', email, 'Password:', password);
      // After successful login
      navigate('/dashboard'); // Redirect to dashboard or another route
    } catch (error) {
      // Handle errors (e.g., show toast notification)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" overflow="hidden" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box as="form" onSubmit={handleLogin} p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={useColorModeValue('white', 'gray.700')}>
        <VStack spacing={4} align="flex-start" w="full">
          <Heading as="h2" size="lg">Login</Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement>
                <Button size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Checkbox defaultIsChecked>Remember me</Checkbox>
          <Link color="teal.500" href="/dashbord" mr={4}><Button width="full" mt={4} colorScheme="teal" type="submit" isLoading={isLoading} loadingText="Logging in">
            Login
          </Button></Link>
          {isLoading && <Spinner />}
          <Flex justify="space-between" width="full" alignItems="center">
            <Text fontSize="sm">Don't have an account? 
              <Link color="teal.500" href="/register" mr={4}> Register</Link>
            </Text>
            <Link color="teal.500" href="/forgot-password" fontSize="sm">  Forgot password?</Link>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
