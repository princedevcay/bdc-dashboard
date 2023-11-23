import Slider from 'react-slick';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';

const slideImages = [
  // URLs or paths to your background images
  '1.jpg',
  '2.jpg',
  // more images
];

const LandingPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear'
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Slider {...settings}>
        {slideImages.map((img, index) => (
          <Box key={index} height="100vh" bgImage={img} bgSize="cover" bgPosition="center">
            {/* Add any overlay or content here */}
          </Box>
        ))}
      </Slider>
      <VStack position="absolute" spacing={4}>
        <Heading color="black">Your Application Name</Heading>
        <Button colorScheme="blue">Login</Button>
        <Button colorScheme="green">Register</Button>
      </VStack>
    </Flex>
  );
};

export default LandingPage;
