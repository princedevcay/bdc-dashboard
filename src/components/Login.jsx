import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  VStack,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Link,
  Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies(['isAuthenticated']);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!username) {
      errors.username = 'Username is required';
      valid = false;
    }
    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        title: 'Invalid Input',
        description: 'Please correct the errors before submitting.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    try {
      console.log('Sending POST request to /wp-json/jwt-auth/v1/token...');
  
      // Send a POST request to your authentication API
      const response = await fetch('https://africanloomtours.com/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('JWT Token received:', data.token);
        // Authentication successful, you can store the user token or session here
        // Redirect to the dashboard or another route
        setCookie('isAuthenticated', true, { path: '/' });
        navigate('/dashboard');
      } else {
        // Authentication failed, handle error and display an error message
        console.error('Login Error:', response.statusText);
        toast({
          title: 'Login Error',
          description: 'Invalid username or password.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle other errors
      console.error('Login Error:', error);
      toast({
        title: 'Login Error',
        description: 'An error occurred during login.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box as="form" onSubmit={handleLogin} p={8} maxWidth="600px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={useColorModeValue('white', 'gray.700')}>
        <VStack spacing={4} align="flex-start" w="full">
          <Flex width="full" justify="center">
            {/* Center the image */}
            <Image src="/logo.png" alt="TOR Logo" boxSize="100px" objectFit="contain" />
          </Flex>
          <Heading as="h2" size="lg">
            Monitoring & Control Dept.
          </Heading>
          <FormControl id="username" isInvalid={errors.username} isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            {errors.username && <Text color="red.500" fontSize="sm">{errors.username}</Text>}
          </FormControl>
          <FormControl id="password" isInvalid={errors.password} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement>
                <Button size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
          </FormControl>
          <Button width="full" mt={4} colorScheme="blue" type="submit">
            Login
          </Button>
          <Flex justifyContent="space-between" width="full" mt={4}>
            <Link color="teal.500" href="/forgot-password" fontSize="sm">
              Forgot password?
            </Link>
            <Link color="teal.500" href="/register" fontSize="sm">
              Register
            </Link>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
