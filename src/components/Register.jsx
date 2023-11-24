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
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Add your registration logic here
      console.log('Registration details:', { username, email, password, confirmPassword });
      // On successful registration
      navigate('/dashboard'); // Redirect after successful registration
    } else {
      toast({
        title: 'Invalid input',
        description: 'Please correct the errors in the form.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };


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

  const validatePasswordMatch = () => {
    const match = password === confirmPassword;
    updateErrorState('confirmPassword', match ? null : 'Passwords do not match');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      validatePasswordMatch();
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswordMatch();
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box as="form" onSubmit={handleRegister} p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={useColorModeValue('white', 'gray.700')}>
        <VStack spacing={4} align="flex-start" w="full">
          <Heading as="h2" size="lg">Register</Heading>
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
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} />
              <InputRightElement>
                <Button size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
          </FormControl>
          <FormControl id="confirmPassword" isInvalid={errors.confirmPassword} isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {errors.confirmPassword && <Text 
              color="red.500" 
              fontSize="sm"
            >
              {errors.confirmPassword}
            </Text>}
          </FormControl>
          <Button width="full" mt={4} colorScheme="teal" type="submit">
            Register
          </Button>
          <Link color="teal.500" href="/login" fontSize="sm">Already have an account? Login</Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;
