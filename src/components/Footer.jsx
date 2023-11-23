import React from 'react';
import { Box, Container, Text, Link, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const footerBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box
      as="footer"
      width="full"
      bg={footerBg}
      color={textColor}
      py={4}
    >
      <Container
        maxWidth="container.xl"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="sm" textAlign="center">
          © {new Date().getFullYear()} BDC - All rights reserved.
        </Text>
        <Text fontSize="sm">
          Designed by 
          <Link href="https://princecaleb.com" isExternal color="teal.500" ml={1}>
            PrinceCaleb.Com
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
