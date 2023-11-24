import { useState } from 'react';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
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
      // Replace with your login logic
      console.log('Email:', email, 'Password:', password);
      navigate('/dashboard'); // Redirect to dashboard or another route
    } catch (error) {
      // Handle errors
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
      <Box as="form" onSubmit={handleLogin} p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg" bg={useColorModeValue('white', 'gray.700')}>
        <VStack spacing={4} align="flex-start" w="full">
          <Heading as="h2" size="lg">Login</Heading>
          <FormControl id="email" isInvalid={errors.email} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
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
          <Button width="full" mt={4} colorScheme="teal" type="submit">
            Login
          </Button>
          <Link color="teal.500" href="/forgot-password" fontSize="sm">Forgot password?</Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
