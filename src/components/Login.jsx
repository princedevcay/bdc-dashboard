import  { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion';

const AnimatedBox = motion(Box);
const AnimatedInput = motion(Input);
const AnimatedButton = motion(Button);

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
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    // Focus the first input box when the component mounts
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

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
      setLoading(true);

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
        setCookie('isAuthenticated', data.token, { path: '/' });
        navigate('/dashboard');

        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
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
      console.error('Login Error:', error);
      toast({
        title: 'Login Error',
        description: 'An error occurred during login.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <AnimatedBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        as="form"
        onSubmit={handleLogin}
        p={8}
        maxWidth="600px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.700')}
      >
        <VStack spacing={4} align="flex-start" w="full">
          <Flex width="full" justify="center">
            <Image src="/logo.png" alt="TOR Logo" boxSize="100px" objectFit="contain" />
          </Flex>
          <Heading as="h2" size="lg">
            Monitoring & Control Dept.
          </Heading>
          <FormControl id="username" isInvalid={errors.username} isRequired>
            <FormLabel>Username</FormLabel>
            <AnimatedInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              whileFocus={{ scale: 1.1, borderColor: 'blue.500' }}
              autoFocus
            />
            {errors.username && <Text color="red.500" fontSize="sm">{errors.username}</Text>}
          </FormControl>
          <FormControl id="password" isInvalid={errors.password} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <AnimatedInput
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                whileFocus={{ scale: 1.1, borderColor: 'blue.500' }}
              />
              <InputRightElement>
                <Button size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
          </FormControl>
          <AnimatedButton
            width="full"
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </AnimatedButton>
          <Flex justifyContent="space-between" width="full" mt={4}>
            <Link color="teal.500" href="/forgot-password" fontSize="sm">
              Forgot password?
            </Link>
            <Link color="teal.500" href="/register" fontSize="sm">
              Register
            </Link>
          </Flex>
        </VStack>
      </AnimatedBox>
    </Flex>
  );
};

export default Login;
