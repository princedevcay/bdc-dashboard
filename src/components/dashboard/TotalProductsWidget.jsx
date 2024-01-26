import  { useEffect, useState } from 'react';
import { Box, Heading, Icon, Flex} from '@chakra-ui/react';
import { fetchProducts } from '../../services/productService';
import { FiDroplet } from "react-icons/fi"

const TotalProductsWidget = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const productsData = await fetchProducts();
        const totalProductsCount = productsData.length;
        setTotalProducts(totalProductsCount);
      } catch (error) {
        console.error('Error fetching total products:', error);
      }
    };

    fetchTotalProducts();
  }, []);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" shadow="md" w={"100%"} h={"94px"} bgColor={"#0C4DA2"}>
      <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Heading size="sm" color={"white"}>TOTAL PRODUCTS</Heading>
        <Heading size="lg" color={"white"}>{totalProducts}</Heading>
      </Box>
      <Icon bgColor={"white"} color={"#0C4DA2"} as={FiDroplet} p={2} boxSize={16} borderRadius={"2xl"} />
    </Flex>
  </Box>
   
  );
};

export default TotalProductsWidget;
