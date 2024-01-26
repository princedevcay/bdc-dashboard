import React, { useState } from 'react';
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
  Link,
  Text,
  useToast,
  Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const updateErrorState = (field, message) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (message) {
        newErrors[field] = message;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let success = false;

    try {
      // Simulate asynchronous registration process (replace with your actual registration logic)
      setLoading(true);
      setTimeout(() => {
        if (validate()) {
          console.log('Registration details:', { username, email, password });
          navigate('/dashboard'); // Redirect after successful registration
          toast({
            title: 'Registration Successful',
            description: 'Welcome aboard!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          success = true;
        }
      }, 2000); // Simulating a delay for demonstration purposes
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false);

      if (!success) {
        toast({
          title: 'Invalid input',
          description: 'Please correct the errors in the form.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="120vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box as="form" onSubmit={handleRegister} p={8} maxWidth="600px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={useColorModeValue('white', 'gray.700')}>
        <VStack spacing={4} align="flex-start" w="full">
          <Flex width="full" justify="center">
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
          <FormControl id="email" isInvalid={errors.email} isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
          </FormControl>
          <FormControl id="password" isInvalid={errors.password} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} />
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
          </FormControl>
          <Button width="full" mt={4} colorScheme="blue" type="submit" isLoading={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Link color="teal.500" href="/login" fontSize="sm">
            Already have an account? Login
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;
